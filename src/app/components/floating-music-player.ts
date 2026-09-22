import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RomanticAudio } from '../services/romantic-audio';

@Component({
  selector: 'app-floating-music-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      id="floating-music-control"
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#FDE68A] shadow-xl text-[#78350F] transition-all hover:shadow-2xl"
    >
      <!-- Play/Pause Button -->
      <button
        id="toggle-music-btn"
        type="button"
        (click)="audioService.toggleMusic()"
        class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] hover:from-[#D97706] hover:to-[#F59E0B] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
        [title]="audioService.isPlaying() ? 'Pausar música romántica' : 'Reproducir música romántica'"
      >
        <mat-icon>{{ audioService.isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
      </button>

      <!-- Music Info & Equalizer -->
      <div class="hidden xs:flex flex-col pr-1 min-w-[130px]">
        <div class="flex items-center gap-1.5">
          <span class="text-xs font-semibold text-[#78350F] font-sans-clean leading-none">
            Melodía para Aranxita
          </span>
          <!-- Animated Equalizer bars -->
          @if (audioService.isPlaying()) {
            <div class="flex items-end gap-0.5 h-3">
              <span class="w-0.5 bg-[#F59E0B] rounded-full animate-eq-1"></span>
              <span class="w-0.5 bg-[#D97706] rounded-full animate-eq-2"></span>
              <span class="w-0.5 bg-[#FBBF24] rounded-full animate-eq-3"></span>
            </div>
          }
        </div>
        <span class="text-[10px] text-[#92400E]/70 font-sans-clean">
          {{ audioService.isPlaying() ? 'Piano acústico romántico' : 'Música en pausa' }}
        </span>
      </div>

      <!-- Mute / Unmute Button -->
      <button
        id="toggle-mute-btn"
        type="button"
        (click)="audioService.toggleMute()"
        class="w-8 h-8 rounded-lg hover:bg-[#FEF3C7] text-[#92400E] flex items-center justify-center transition-colors cursor-pointer shrink-0"
        [title]="audioService.muted() ? 'Activar sonido' : 'Silenciar'"
      >
        <mat-icon class="text-lg">{{ audioService.muted() ? 'volume_off' : 'volume_up' }}</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    @keyframes eq1 {
      0%, 100% { height: 4px; }
      50% { height: 12px; }
    }
    @keyframes eq2 {
      0%, 100% { height: 11px; }
      50% { height: 5px; }
    }
    @keyframes eq3 {
      0%, 100% { height: 6px; }
      50% { height: 14px; }
    }
    .animate-eq-1 { animation: eq1 0.8s ease-in-out infinite; }
    .animate-eq-2 { animation: eq2 0.7s ease-in-out infinite 0.2s; }
    .animate-eq-3 { animation: eq3 0.9s ease-in-out infinite 0.4s; }
  `],
})
export class FloatingMusicPlayer {
  audioService = inject(RomanticAudio);
}
