import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RomanticAudio {
  private audioCtx: AudioContext | null = null;
  private isPlayingAudio = signal<boolean>(false);
  private currentVolume = signal<number>(0.7);
  private isMuted = signal<boolean>(false);
  private masterGain: GainNode | null = null;
  private melodyTimeout: ReturnType<typeof setTimeout> | null = null;
  private isLooping = false;
  private currentNoteIndex = 0;

  // Romantic progression notes (frequencies in Hz)
  // Key: D Major / B Minor with warm romantic arpeggios
  private readonly melodyNotes: { freq: number; duration: number; type: 'chord' | 'melody' }[] = [
    // Bar 1: D Major (D4, F#4, A4, D5)
    { freq: 293.66, duration: 1.4, type: 'chord' },
    { freq: 369.99, duration: 1.2, type: 'chord' },
    { freq: 440.00, duration: 0.8, type: 'melody' },
    { freq: 587.33, duration: 1.0, type: 'melody' },
    { freq: 554.37, duration: 0.6, type: 'melody' },
    { freq: 440.00, duration: 0.8, type: 'melody' },

    // Bar 2: A / C#
    { freq: 220.00, duration: 1.4, type: 'chord' },
    { freq: 277.18, duration: 1.2, type: 'chord' },
    { freq: 329.63, duration: 0.8, type: 'melody' },
    { freq: 440.00, duration: 1.0, type: 'melody' },
    { freq: 493.88, duration: 0.6, type: 'melody' },
    { freq: 369.99, duration: 0.8, type: 'melody' },

    // Bar 3: B Minor
    { freq: 246.94, duration: 1.4, type: 'chord' },
    { freq: 293.66, duration: 1.2, type: 'chord' },
    { freq: 369.99, duration: 0.8, type: 'melody' },
    { freq: 493.88, duration: 1.0, type: 'melody' },
    { freq: 440.00, duration: 0.6, type: 'melody' },
    { freq: 369.99, duration: 0.8, type: 'melody' },

    // Bar 4: G Major
    { freq: 196.00, duration: 1.4, type: 'chord' },
    { freq: 246.94, duration: 1.2, type: 'chord' },
    { freq: 293.66, duration: 0.8, type: 'melody' },
    { freq: 392.00, duration: 1.0, type: 'melody' },
    { freq: 440.00, duration: 0.6, type: 'melody' },
    { freq: 587.33, duration: 1.2, type: 'melody' },

    // Bar 5: F# Minor
    { freq: 185.00, duration: 1.4, type: 'chord' },
    { freq: 220.00, duration: 1.2, type: 'chord' },
    { freq: 277.18, duration: 0.8, type: 'melody' },
    { freq: 369.99, duration: 1.0, type: 'melody' },
    { freq: 440.00, duration: 0.8, type: 'melody' },
    { freq: 329.63, duration: 0.6, type: 'melody' },

    // Bar 6: G Major 7
    { freq: 196.00, duration: 1.4, type: 'chord' },
    { freq: 246.94, duration: 1.2, type: 'chord' },
    { freq: 369.99, duration: 0.8, type: 'melody' },
    { freq: 440.00, duration: 0.8, type: 'melody' },
    { freq: 392.00, duration: 1.0, type: 'melody' },
    { freq: 293.66, duration: 0.8, type: 'melody' },

    // Bar 7: Em7 - A7
    { freq: 164.81, duration: 1.2, type: 'chord' },
    { freq: 196.00, duration: 1.0, type: 'chord' },
    { freq: 246.94, duration: 0.7, type: 'melody' },
    { freq: 293.66, duration: 0.7, type: 'melody' },
    { freq: 220.00, duration: 1.0, type: 'chord' },
    { freq: 277.18, duration: 0.8, type: 'chord' },
    { freq: 329.63, duration: 0.8, type: 'melody' },
    { freq: 440.00, duration: 1.2, type: 'melody' },

    // Bar 8: D Major resolution
    { freq: 146.83, duration: 2.0, type: 'chord' },
    { freq: 220.00, duration: 1.8, type: 'chord' },
    { freq: 293.66, duration: 1.8, type: 'chord' },
    { freq: 369.99, duration: 2.0, type: 'melody' },
    { freq: 587.33, duration: 2.5, type: 'melody' },
  ];

  readonly isPlaying = this.isPlayingAudio.asReadonly();
  readonly volume = this.currentVolume.asReadonly();
  readonly muted = this.isMuted.asReadonly();

  private initAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted() ? 0 : this.currentVolume(), this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    return this.audioCtx;
  }

  toggleMusic(): void {
    if (this.isPlayingAudio()) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  playMusic(): void {
    const ctx = this.initAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    this.isPlayingAudio.set(true);
    this.isLooping = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
  }

  pauseMusic(): void {
    this.isPlayingAudio.set(false);
    this.isLooping = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }

  setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.currentVolume.set(clamped);
    if (this.masterGain && this.audioCtx && !this.isMuted()) {
      this.masterGain.gain.setTargetAtTime(clamped, this.audioCtx.currentTime, 0.05);
    }
  }

  toggleMute(): void {
    const newMuted = !this.isMuted();
    this.isMuted.set(newMuted);
    if (this.masterGain && this.audioCtx) {
      const targetGain = newMuted ? 0 : this.currentVolume();
      this.masterGain.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.05);
    }
  }

  private scheduleNextNote(): void {
    if (!this.isLooping || !this.audioCtx || !this.masterGain) {
      return;
    }

    const note = this.melodyNotes[this.currentNoteIndex];
    this.playTone(note.freq, note.duration, note.type);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;

    const intervalMs = note.type === 'chord' ? 380 : 480;

    this.melodyTimeout = setTimeout(() => {
      this.scheduleNextNote();
    }, intervalMs);
  }

  private playTone(freq: number, duration: number, type: 'chord' | 'melody'): void {
    if (!this.audioCtx || !this.masterGain) return;

    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.002, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(type === 'chord' ? 1200 : 2200, now);
    filter.Q.setValueAtTime(1.5, now);

    const peakVolume = type === 'chord' ? 0.18 : 0.28;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }

  playSparkleSound(): void {
    try {
      const ctx = this.initAudioContext();
      if (!this.masterGain || this.isMuted()) return;

      const now = ctx.currentTime;
      const pitches = [523.25, 659.25, 783.99, 1046.50];
      
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      });
    } catch {
      // Ignore background errors
    }
  }
}
