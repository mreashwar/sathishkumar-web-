const $ = (selector) => document.querySelector(selector);
const walkVideo = $('#walkVideo');
const talkVideo = $('#talkVideo');
const soundButton = $('#soundButton');
const soundLabel = $('#soundLabel');
const soundNote = $('#soundNote');
const menuToggle = $('#menuToggle');
const nav = $('#nav');

$('#year').textContent = new Date().getFullYear();

const narration = "Hi, I'm Sathish Kumar. I design modern websites and creative digital experiences that bring your ideas to life. If you have a creative idea, I can help turn it into a beautiful, user-friendly website that strengthens your brand and helps your business stand out. Have a project in mind? Let's create something amazing together.";
let currentUtterance = null;
let narrationActive = false;
let sequenceStarted = false;

function switchHero(active, inactive) {
  active.classList.add('active');
  inactive.classList.remove('active');
}
function safePlay(video) {
  const result = video.play();
  if (result && typeof result.catch === 'function') result.catch(() => {
    soundNote.textContent = 'If the background stays still, use the video player below or open the site through a local web server.';
  });
}
function startMutedSequence() {
  sequenceStarted = true;
  walkVideo.muted = true;
  talkVideo.muted = true;
  walkVideo.controls = false;
  talkVideo.controls = false;
  switchHero(walkVideo, talkVideo);
  safePlay(walkVideo);
  walkVideo.onended = () => {
    switchHero(talkVideo, walkVideo);
    talkVideo.currentTime = 0;
    safePlay(talkVideo);
  };
  talkVideo.onended = () => {
    switchHero(walkVideo, talkVideo);
    walkVideo.currentTime = 0;
    safePlay(walkVideo);
  };
}
if (walkVideo && talkVideo) {
  // Explicitly set muted before calling play; this is the most reliable autoplay configuration.
  walkVideo.muted = true;
  talkVideo.muted = true;
  walkVideo.loop = false;
  talkVideo.loop = false;
  startMutedSequence();
}

soundButton.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    soundNote.textContent = 'Voice playback is not supported in this browser. Use the video player below or add a voice-over track to the MP4.';
    talkVideo.controls = true;
    switchHero(talkVideo, walkVideo);
    talkVideo.muted = false;
    safePlay(talkVideo);
    return;
  }
  if (narrationActive) {
    window.speechSynthesis.cancel();
    narrationActive = false;
    soundLabel.textContent = 'Play introduction with voice';
    soundNote.textContent = 'Voice paused. Press again to replay.';
    return;
  }
  window.speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(narration);
  currentUtterance.lang = 'en-IN';
  currentUtterance.rate = 0.91;
  currentUtterance.pitch = 0.96;
  currentUtterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => /en-IN/i.test(v.lang)) ||
                    voices.find(v => /en-GB/i.test(v.lang)) ||
                    voices.find(v => /en-US/i.test(v.lang));
  if (preferred) currentUtterance.voice = preferred;
  currentUtterance.onstart = () => {
    narrationActive = true;
    soundLabel.textContent = 'Stop introduction voice';
    soundNote.textContent = 'Voice narration is playing. The background video stays muted.';
  };
  currentUtterance.onend = () => {
    narrationActive = false;
    soundLabel.textContent = 'Replay introduction with voice';
    soundNote.textContent = 'Introduction complete. Replay whenever you like.';
  };
  currentUtterance.onerror = () => {
    narrationActive = false;
    soundLabel.textContent = 'Try voice introduction again';
    soundNote.textContent = 'Your browser voice was unavailable. Try Chrome with sound enabled.';
  };
  window.speechSynthesis.speak(currentUtterance);
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

$('#leadForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const get = (key, fallback='Not provided') => (data.get(key) || fallback).toString().trim();
  const message = [
    'Hello Sathish Kumar, I would like to enquire about a project.',
    '',
    `Name: ${get('name')}`,
    `Email: ${get('email')}`,
    `Phone / WhatsApp: ${get('phone')}`,
    `Service: ${get('service')}`,
    `Budget: ${get('budget', 'Not decided')}`,
    `Project details: ${get('message')}`,
    '',
    'Sent from the SK portfolio website.'
  ].join('\n');
  $('#formStatus').textContent = 'WhatsApp is opening with your enquiry. Please review it and press Send.';
  window.open(`https://wa.me/918778111099?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
