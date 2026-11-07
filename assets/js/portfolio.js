/* Motion for the portfolio page.
 *
 * Ported from the DCLogic component the design shipped with. That version was a
 * React class whose componentDidMount reached out of React and drove the DOM
 * directly; with the page server-rendered there is no React to reach out of, so
 * this is the same behaviour written plainly.
 *
 * Two things from the original are deliberately not here. It set the reveal's
 * starting opacity and transform from JavaScript, which put styling in the
 * wrong file; that lives in portfolio.css now, behind a class this script adds,
 * so a page with JavaScript disabled is a page where nothing was ever hidden.
 * And it ran a MutationObserver to catch nodes React added later - nothing adds
 * nodes here, so watching the whole document body for changes buys nothing.
 *
 * Everything is off under prefers-reduced-motion, except the scroll progress
 * bar, which is an indicator rather than an animation.
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.querySelector("[data-nav]");
  var progress = document.querySelector("[data-progress]");
  var parallax = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    if (progress) {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (scrollable > 0 ? Math.min(100, (y / scrollable) * 100) : 0) + "%";
    }

    // Hide going down, show coming back. The 240px floor keeps it from
    // disappearing while you are still reading the header.
    if (nav && !reduced) {
      nav.classList.toggle("is-hidden", y > 240 && y > lastY);
    }
    lastY = y;

    if (!reduced && parallax.length && !ticking) {
      ticking = true;
      requestAnimationFrame(moveParallax);
    }
  }

  function moveParallax() {
    ticking = false;
    var viewport = window.innerHeight;
    parallax.forEach(function (node) {
      var box = node.getBoundingClientRect();
      if (box.bottom < -200 || box.top > viewport + 200) return;
      var amount = parseFloat(node.dataset.parallax) || 40;
      var offset = (box.top + box.height / 2 - viewport / 2) / viewport;
      node.style.transform = "translateY(" + (-offset * amount).toFixed(1) + "px)";
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- revealing, and counting --------------------------------------- */

  function countUp(node) {
    if (node.dataset.counted) return;
    node.dataset.counted = "1";

    var end = parseInt(node.dataset.count, 10);
    if (isNaN(end)) return;
    var comma = node.dataset.format === "comma";
    var show = function (value) {
      node.textContent = comma ? value.toLocaleString("en-US") : String(value);
    };

    if (reduced) { show(end); return; }

    var duration = 1100;
    var started = performance.now();
    var step = function (now) {
      var through = Math.min(1, (now - started) / duration);
      // Ease out cubic: fast at first, so the number is legible early and
      // settles rather than arriving.
      show(Math.round(end * (1 - Math.pow(1 - through, 3))));
      if (through < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  var targets = document.querySelectorAll("[data-reveal]");
  var counters = document.querySelectorAll("[data-count]");

  if (!("IntersectionObserver" in window)) {
    // No observer, so nothing can be revealed on cue. Leave everything visible
    // and just settle the numbers - a page that stays blank because an
    // animation could not run is worse than one that does not animate.
    counters.forEach(function (node) { node.dataset.counted = ""; countUp(node); });
    return;
  }

  document.body.classList.add("pf-reveal-armed");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll("[data-count]").forEach(countUp);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  targets.forEach(function (node, index) {
    // Stagger in fives, so a row of cards arrives as a row rather than all at
    // once, without the last item on a long page waiting seconds for its turn.
    node.style.transitionDelay = (index % 5) * 60 + "ms";
    observer.observe(node);
  });
})();
