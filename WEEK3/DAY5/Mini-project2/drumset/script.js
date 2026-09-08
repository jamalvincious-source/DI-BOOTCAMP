script.js - JavaScript
// ---- Audio engine ------------------------------------------------
// No external sound files, so each drum voice is synthesized with the
// Web Audio API. A single AudioContext is reused for every hit.

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function makeNoiseBuffer(duration) {
  const size = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, size, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function kick() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.35);
}

function snare() {
  const noise = audioCtx.createBufferSource();
  noise.buffer = makeNoiseBuffer(0.2);
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1000;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(1, audioCtx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
  noise.connect(noiseFilter).connect(noiseGain).connect(audioCtx.destination);

  const osc = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 180;
  oscGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  osc.connect(oscGain).connect(audioCtx.destination);

  noise.start(); osc.start();
  noise.stop(audioCtx.currentTime + 0.2);
  osc.stop(audioCtx.currentTime + 0.15);
}

function hihat(duration = 0.06) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = makeNoiseBuffer(duration);
  const filter = audioCtx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 7000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  noise.connect(filter).connect(gain).connect(audioCtx.destination);
  noise.start();
  noise.stop(audioCtx.currentTime + duration);
}

function tom(freq) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, audioCtx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.9, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function ride() { hihat(0.5); }
function crash() { hihat(1.1); }

// Map each data-key value to its sound-producing function.
const sounds = {
  KeyA: kick,
  KeyS: snare,
  KeyD: () => hihat(0.08),
  KeyF: () => tom(220),
  KeyG: () => tom(170),
  KeyH: () => tom(120),
  KeyJ: ride,
  KeyK: crash,
};

// ---- One shared function used by both input methods ---------------
function playSound(key) {
  const fn = sounds[key];
  if (!fn) return;              // guard: unmapped key does nothing

  if (audioCtx.state === "suspended") audioCtx.resume();
  fn();

  const drum = document.querySelector(`.drum[data-key="${key}"]`);
  if (drum) {
    drum.classList.add("playing");
    setTimeout(() => drum.classList.remove("playing"), 100);
  }
}

// ---- Mouse / touch events ------------------------------------------
const drums = document.querySelectorAll(".drum");
drums.forEach(function (drum) {
  drum.addEventListener("click", function () {
    playSound(this.dataset.key);
  });
});

// ---- Keyboard events ------------------------------------------------
document.addEventListener("keydown", function (event) {
  playSound(event.code);
});