# Yuheng Zhou — Personal Homepage

A static, bilingual academic portfolio. It can be opened directly or deployed to GitHub Pages without a build step.

## Local preview

Open `index.html` directly, or run a local server:

```powershell
python -m http.server 4173 --directory portfolio
```

## GitHub Pages

1. Create a repository named `Firmament8.github.io`.
2. Put the contents of this directory at the repository root.
3. In GitHub, open **Settings → Pages** and deploy from the `main` branch.

The résumé link currently points to a local file outside this directory. Before publishing, copy the public résumé PDF into `assets/resume.pdf` and update the link in `index.html`.
