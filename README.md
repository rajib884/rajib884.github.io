# Portfolio

A self-contained static portfolio for Md. Rajibul Hassen, adapted from the
Django portfolio in `D:\Projects\homeserver` and tailored to embedded systems
work: firmware, hardware and IoT.

No build step, no server, no external requests. Open `index.html` directly or
serve the folder:

```powershell
cd "D:\JobPrep\portfolio"
python -m http.server 8000
```

Then visit `http://127.0.0.1:8000/`.

## Publish on GitHub Pages

GitHub Pages is the simplest free option for this folder.

1. Create a new **public** repository, for example `portfolio`. Do not publish
   the parent `JobPrep` repository; it contains private and employer material.
2. Copy the **contents** of this folder to the root of that repository:
   `index.html`, `assets/`, `.nojekyll`, and this README.
3. Commit and push to `main`.
4. In the repository: **Settings → Pages → Build and deployment**.
5. Source: **Deploy from a branch**. Branch: `main`. Folder: `/ (root)`.
6. Save. The site will appear at:

   `https://<your-username>.github.io/portfolio/`

The page uses relative paths, so it works at that subpath without changes.

### Custom domain

Use a subdomain such as `portfolio.rajib.dedyn.io`, not the root
`rajib.dedyn.io` — the root already points at the homeserver. Add the subdomain
in **Settings → Pages → Custom domain** and create the DNS record GitHub shows.
GitHub writes a `CNAME` file into the branch; keep it.

## Free alternatives

- **Cloudflare Pages** — best alternative if the source repository must stay
  private. Connect a private repo containing only this folder, or use Direct
  Upload. Free TLS and custom domain.
- **Netlify** — drag-and-drop this folder at `app.netlify.com/drop`. Free TLS
  and custom domain.
- **Vercel** — works, but is aimed more at framework builds; no advantage for a
  static page this small.

GitHub Pages is fine here. Cloudflare Pages is the better choice only if you do
not want a public source repository.

## What is deliberately absent

- No phone number, referees, or CV PDF. The public page should not publish
  third-party contact details.
- Two photographs remain **credited Unsplash placeholders**, not project work:
  Kevin Ache (switch rack) and Robin Glauser (workbench). Replace each file in
  `assets/img/` with a real photo when available and keep the credit or remove
  it with the stock image.
- The weather-station case uses real project photos from the 2022 ETE 3200
  build, not stock: assembled main board, secondary sensor board, fabricated
  PCB, and the live Django dashboard.
- The RUET recognition photo is the official ETE Department event photograph
  from Robotronics 1.0, 2019; it is credited and linked on the page.
- Certificate scans are linked from the claims they support. Only personally
  named certificates are published; blank or unfilled templates are excluded.
- No claims of FreeRTOS, Modbus, MQTT, Yocto, BLE or LoRa. The page shows the
  verified evidence: VxWorks, bare-metal/embedded C, STM32/ESP32/AVR, PCB work,
  and the IoT sensor node.

## Editing

All content is in `index.html`. Styles are split into:

- `assets/css/modernist.css` — design tokens and shared components
- `assets/css/portfolio.css` — page layout, motion and responsive rules

The font is local: `assets/fonts/archivo-latin.woff2`, with its OFL licence
beside it. No Google Fonts request is made.

## Case studies

The first four projects are full case studies:

1. **Automatic railway gate control** - `#case-railway`
2. **IoT weather station** - `#case-weather`
3. **TFTP_VLAN** - `#case-tftp`
4. **Voltage protector** - `#case-voltage`

Each has an original SVG system diagram; the weather case adds a data path,
the TFTP case adds a topology and an 802.1Q frame layout, and the voltage case
adds two Proteus test captures. The railway and weather cases also use photos
of the real hardware. The two Mud Rover builds sit in a two-up "Robotics" row;
the remaining projects sit in the two-up "Other work" grid.

The diagrams are explanatory drawings, not photographs. Each caption links to
the full-size image, since diagram text is small in the column. To add a real
project photo later, put it in `assets/img/` and either replace a case-study
figure or add another `<figure class="pf-case-figure">` inside that case's
`.pf-case-gallery`. The gallery auto-fits; add `pf-case-gallery-two` to force a
two-column layout on wide screens (the four-item railway and weather galleries
use this to make a 2x2 grid).

## Images

- `assets/img/rajibul-hassen.jpg` — portrait supplied by Md. Rajibul Hassen.
- `assets/img/stock-lab-rack.jpg` — Kevin Ache, Unsplash placeholder.
- `assets/img/stock-bench.jpg` — Robin Glauser, Unsplash placeholder.
- `assets/img/case-railway-system.svg` — original system block diagram.
- `assets/img/railway-setup.jpg` — working railway crossing prototype.
- `assets/img/railway-detection-board.jpg` — assembled detector board.
- `assets/img/railway-gate-control.jpg` — assembled gate controller.
- `assets/img/railway-gate.jpg` — servo-driven gate model.
- `assets/img/case-weather-system.svg` — original architecture diagram.
- `assets/img/case-weather-dataflow.svg` — original data-path diagram.
- `assets/img/case-tftp-stack.svg` — original protocol-stack diagram.
- `assets/img/case-tftp-topology.svg` — original breakout/trunk topology diagram.
- `assets/img/case-tftp-frame.svg` — original 802.1Q frame-layout diagram.
- `assets/img/case-voltage-system.svg` - original protection-chain diagram.
- `assets/img/case-voltage-ovp.png` - Proteus over-voltage trip capture.
- `assets/img/case-voltage-ocp.png` - Proteus short-circuit trip capture.
- `assets/img/weather-main-board.jpg` — assembled weather-station main board.
- `assets/img/weather-secondary-board.jpg` — assembled sensor board.
- `assets/img/weather-pcb.jpg` — fabricated main board, EAGLE layout.
- `assets/img/weather-dashboard.jpg` — live Django dashboard.
- `assets/img/ruet-robotronics-2019.jpg` — official RUET ETE Department photo
  of the Mud Rover team receiving the 2019 2nd runner-up award.
- `assets/img/mud-rover-1-0-2019.jpg` — Mud Rover 1.0 at Robotronics 1.0.
- `assets/img/mud-rover-2-0-2022.jpg` — Mud Rover 2.0 indoor test drive.
- `assets/img/techfest-cozmo-clench-2020.jpg` — certificate of participation,
  Cozmo Clench, Techfest IIT Bombay, 3–5 January 2020.
- `assets/img/iccit-2023-presentation.jpg` — ICCIT 2023 presentation
  certificate.
- `assets/img/etechnovation-2022-organizer.jpg` — ETEchnovation 2K22
  organizer certificate.
- `assets/img/microcontroller-workshop-2020-first.jpg` — first-place
  Microcontroller and Embedded Systems workshop certificate.
- `assets/img/robotronics-2-mud-rover-2022.jpg` — Robotronics 2.0 Mud Rover
  participation certificate.

The railway photos come from the ETE 2200 report and presentation. The weather
photos and dashboard screenshot come from the 2022 ETE 3200 project report at
`D:\Class\Class\Project\Project Report\ETE 3200 Project 1704015`. The RUET award
photo comes from the ETE Department's Robotronics 2019 news item; the two Mud
Rover photos were supplied by the owner. The certificate scans come from the
owner's certificate archive; only scans naming Md. Rajibul Hassen are linked. The
two stock files remain placeholders and are credited in the page.
The voltage-protector diagram is original; the two scope captures come from
the FSMB_Project `test_evidence/` folder. The project is a Proteus
simulation, not a hardware prototype.
