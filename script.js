const $ = (s) => document.querySelector(s);
const walkVideo = $('#walkVideo');
const talkVideo = $('#talkVideo');
const soundButton = $('#soundButton');
const soundLabel = $('#soundLabel');
const soundNote = $('#soundNote');
const menuToggle = $('#menuToggle');
const nav = $('#nav');
$('#year').textContent = new Date().getFullYear();

// Keep the hero background moving across both clips; the sequence remains muted until a user explicitly enables sound.
let heroSequenceStarted = false;
let sequenceTimer = null;
function showClip(active, other) {
  active.classList.add('active');
  other.classList.remove('active');
}
function playMutedSequence() {
  heroSequenceStarted = true;
  walkVideo.muted = true;
  talkVideo.muted = true;
  showClip(walkVideo, talkVideo);
  const p = walkVideo.play();
  if (p && p.catch) p.catch(() => { soundNote.textContent = 'Press play to start the introduction video.'; });
  walkVideo.onended = () => {
    showClip(talkVideo, walkVideo);
    talkVideo.currentTime = 0;
    talkVideo.play().catch(() => {});
  };
  talkVideo.onended = () => {
    showClip(walkVideo, talkVideo);
    walkVideo.currentTime = 0;
    walkVideo.play().catch(() => {});
  };
}
if (walkVideo.querySelector('source')?.getAttribute('src') && talkVideo.querySelector('source')?.getAttribute('src')) {
  playMutedSequence();
}

soundButton.addEventListener('click', async () => {
  try {
    // Start the seated introduction with sound after an explicit user gesture.
    walkVideo.pause();
    talkVideo.pause();
    walkVideo.muted = true;
    talkVideo.muted = false;
    talkVideo.currentTime = 0;
    showClip(talkVideo, walkVideo);
    await talkVideo.play();
    soundLabel.textContent = 'Playing introduction with sound';
    soundNote.textContent = 'Sound is on. Use the video controls below to pause or replay.';
    talkVideo.controls = true;
    talkVideo.onended = () => {
      talkVideo.muted = true;
      talkVideo.controls = false;
      playMutedSequence();
      soundLabel.textContent = 'Replay introduction with sound';
    };
  } catch (e) {
    soundLabel.textContent = 'Tap to play introduction';
    soundNote.textContent = 'Your browser could not start playback. Try the video controls below.';
    talkVideo.controls = true;
    showClip(talkVideo, walkVideo);
  }
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// WhatsApp handoff. This prepares a message; the visitor still confirms sending in WhatsApp.
$('#leadForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const service = (data.get('service') || '').toString().trim();
  const budget = (data.get('budget') || 'Not decided').toString().trim();
  const message = (data.get('message') || '').toString().trim();
  const body = [
    'Hello Sathish Kumar, I would like to enquire about a project.',
    '',
    `Name: ${name}`,
    `Email: ${email || 'Not provided'}`,
    `Phone / WhatsApp: ${phone || 'Not provided'}`,
    `Service: ${service}`,
    `Budget: ${budget}`,
    `Project details: ${message || 'Not provided'}`,
    '',
    'Sent from the SK portfolio website.'
  ].join('\n');
  $('#formStatus').textContent = 'Opening WhatsApp with your enquiry. Review the message and press Send.';
  window.open(`https://wa.me/918778111099?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
});
