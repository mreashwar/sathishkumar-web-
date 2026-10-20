# Sathish Kumar — Portfolio Website

Premium dark portfolio website with emerald-green accents, cinematic hero videos, About portrait, services, process, FAQ and WhatsApp enquiry form.

## Files
- `index.html` — page structure and content
- `style.css` — responsive visual design
- `script.js` — hero video sequence, sound button, mobile navigation and WhatsApp form
- `assets/intro-walk.mp4` — first hero video
- `assets/seated-introduction.mp4` — second/seated video
- `assets/sathish-about-portrait.png` — About section portrait

## Run locally
Open `index.html` in a modern browser. For best results, run a local server:
- VS Code: use the Live Server extension
- Python: `python -m http.server 8000` and visit `http://localhost:8000`

## Video behaviour
The hero uses the walking clip and then the seated clip as a muted background sequence. Browsers commonly block autoplay with sound, so the visitor must press **Play introduction with sound** to hear audio. The sound button plays the seated clip with audio; the second video file must contain an audio track for voice to be audible. If the video files have no audio, add a voice-over track to the MP4 before replacing the file.

The video is also included in a normal controls-enabled player under “Selected Introduction”.

## Leads
The form builds a prefilled WhatsApp message for `+91 87781 11099`. Visitors must press Send inside WhatsApp. This static site does **not** send emails or store lead data automatically.

To receive email leads automatically, connect the form to a backend or a form/email service and add your endpoint/API configuration. Never put private API keys in client-side JavaScript.

## Deploy with GitHub Pages
1. Create a GitHub repository.
2. Upload all files and the `assets/` folder preserving the structure.
3. In repository Settings → Pages, choose deployment from the `main` branch and root folder.
4. Save and wait for the published URL.

## Before publishing
- Confirm both MP4s have audio where expected.
- Test the video sequence on mobile and desktop.
- Test the WhatsApp form on a device with WhatsApp available.
- Replace any service copy that doesn't match your actual offering.
