Generating responsive profile images

This project uses responsive images for the hero/profile photo. The HTML expects the following files in `images/`:

- Vidumali-320.jpg
- Vidumali-720.jpg
- Vidumali-1200.jpg
- Vidumali-320.webp
- Vidumali-720.webp
- Vidumali-1200.webp

Two helper scripts are provided to generate these from your original `Vidumali.jpg`:

1) PowerShell (ImageMagick)
- Requires ImageMagick installed and `magick` available on PATH.
- Run in project root (PowerShell):

```powershell
# replace with the path to your original image
.
\scripts\resize-images.ps1 -Source images\Vidumali.jpg
```

2) Node.js (sharp)
- Requires Node.js and the `sharp` package installed.
- Install sharp: `npm install sharp` in the project root.
- Run:

```powershell
node scripts\resize-images-node.js images\Vidumali.jpg
```

After running one of the scripts, the generated files will match the `srcset` in `index.html` and the browser will load an appropriately sized image.
