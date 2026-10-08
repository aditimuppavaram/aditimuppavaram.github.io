# Aditi Anand Muppavaram — Portfolio

**Live site: https://aditimuppavaram.github.io**

The personal portfolio of Aditi Anand Muppavaram, a Business & Data Analyst on CMS federal health IT
programs. It is one scrolling page with eight sections, a case-study page for each project, and a web
version of her résumé.

## Sections

1. **Hero** — her name in large faded letters behind a full-length photo of her, a "Hi, I'm Aditi." chat
   bubble, the headline, a short intro that fades in word by word, a spinning "Open to…" badge, and
   Explore work / Let's talk / Resume buttons.
2. **About** — a lanyard ID card you can drag around and tap to flip, a short bio and quick facts.
3. **Skills** — "The periodic table of my stack": 40 skills in six groups. Point at a tile to see details.
4. **Work** — "Things I've built": seven projects in panels that open on hover, each with its own
   case-study page.
5. **Always learning** — her coursework.
6. **Education & experience** — a timeline of her jobs and degrees.
7. **Proud moments** — her achievement numbers on cards that slide sideways as you scroll.
8. **Contact** — email, LinkedIn and the résumé download.

Also included: a web résumé page (`/#/resume`), a downloadable PDF résumé, light and dark mode, a layout
that works on phones, and a calmer version for visitors who turn on "reduce motion".

**Built with** React 19, TypeScript, Vite 8, Tailwind CSS 4, Motion, Lenis and React Router 7.

## Install and run it locally

You need [Node.js](https://nodejs.org) 20.19 or newer, and Git.

```bash
git clone https://github.com/aditimuppavaram/aditimuppavaram.github.io.git
cd aditimuppavaram.github.io
npm install
npm run dev        # opens the site at http://localhost:5173
```

Other commands:

```bash
npm run build      # production build in dist/
npm run preview    # serve that build locally
```

## Making changes

Every commit to the `main` branch is published automatically. GitHub rebuilds the site and puts it live
in about 1–2 minutes. You can follow it in the **Actions** tab: a green tick means the new version is
live; a red cross means the build failed, and the live site stays on the last working version.

You can make all of the changes below right on GitHub, with nothing installed.

**Text.** Every word on the site lives in `src/data/site.ts`: name, headline, intro, the chat bubble,
About text and quick facts, the ID card, the skills, the projects and their case studies, coursework,
the timeline and the achievement numbers. Open the file, click the pencil icon (**Edit this file**),
change the words and click **Commit changes**.

- Text sits between quotes. Change only what's inside them and keep the quotes and commas.
- If the text has an apostrophe (I'm, Aditi's), the line must use double quotes `"…"`, like the
  `intro` and `bubble` lines. An apostrophe inside single quotes `'…'` breaks the build.

**Chat bubble.** `bubble` under `hero` in `src/data/site.ts`. Set it to `''` to hide the bubble.

**Résumé.** Open the `public` folder, click **Add file → Upload files**, drop in the new PDF named
exactly `Aditi_Anand_Muppavaram_Resume.pdf` and click **Commit changes**. It replaces the old one.

**Photos.** Upload the new picture to `public` with the same file name, the same way:

- `aditi-hero.webp` — the hero photo: full length, with a see-through background (about 640 × 1800).
- `aditi-portrait.webp` — the ID card photo: head and shoulders (480 × 600).

Or upload it under a new name and change `image` (under `hero`) or `photo` in `src/data/site.ts`.

**Tab title.** The `<title>` line in `index.html`.

**Going back.** `public/previous/` keeps copies of the first hero photo, ID card photo and the "AM"
tab icons. To use a photo again, point to it, for example `image: 'previous/aditi-hero.webp'` in
`src/data/site.ts`. To show the "AM" tab icon again, replace the `<link rel="icon" …>` line in
`index.html` with `<link rel="icon" href="./previous/favicon.ico" />`. Every earlier version of every
file is also in the commit history.

**On your computer.** Edit the files, check them with `npm run dev`, then commit and push to `main`.

## Project structure

```
src/
  data/site.ts        all the text, links and photo file names
  sections/           Hero, About, Skills, Work, Learning, Experience, Achievements, Contact
  pages/              Home, case studies (/work/:slug), résumé (/resume)
  components/         header and menu, ID card, hero photo and bubble, résumé link, icons, shared UI
  visuals/            the small drawings shown for each project
  lib/                light/dark theme, smooth scrolling
  index.css           colours, fonts and shared styles
public/               photos, résumé PDF, previous/ (earlier versions)
.github/workflows/    deploy.yml: builds and publishes the site on every push to main
```
