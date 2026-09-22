import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FLORAL_DEGRADADOS, girasolHead } from '../utils/floral-art';

@Component({
  selector: 'app-opening-greeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      id="opening-greeting-backdrop"
      class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#0d1f15]/80 backdrop-blur-md transition-opacity duration-700 animate-opening-fade"
      role="dialog"
      aria-modal="true"
    >
      <div
        id="opening-card"
        class="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#FFFDF7] via-[#FFF9E6] to-[#FEF3C7] border-2 border-[#FDE68A] shadow-2xl text-center overflow-hidden animate-card-emerge"
      >
        <!-- Subtle golden background glow circles -->
        <div class="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-[#FBBF24]/20 blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-[#F59E0B]/20 blur-2xl pointer-events-none"></div>

        <!-- Blooming Sunflower Emblem (User's Exact Botanical Girasol) -->
        <div class="relative mx-auto mb-4 w-28 h-28 flex items-center justify-center animate-soft-glow">
          <svg
            viewBox="-82 -82 164 164"
            class="w-full h-full overflow-visible transform transition-transform hover:scale-105"
            [innerHTML]="sunflowerEmblemSvg()"
          ></svg>
        </div>

        <!-- Dedication Tag -->
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs font-semibold uppercase tracking-widest mb-4">
          <mat-icon class="text-sm text-[#D97706]">favorite</mat-icon>
          <span>Especialmente para ti :3</span>
        </div>

        <!-- Name Calligraphy -->
        <h1 class="font-script-love text-5xl sm:text-6xl text-[#78350F] mb-3 leading-tight drop-shadow-sm">
          Mi dulce Aranxita
        </h1>

        <!-- The core requested quote -->
        <div class="my-5 py-4 px-5 rounded-2xl bg-white/70 border border-[#FDE68A] shadow-sm">
          <p class="font-serif-cormorant text-2xl sm:text-3xl italic text-[#92400E] font-medium leading-snug">
            «Tú eres el rayo de sol más brillante de mi vida»
          </p>
        </div>

        <p class="font-sans-clean text-sm sm:text-base text-[#78350F]/80 mb-7 leading-relaxed max-w-sm mx-auto">
          Hoy te entrego estas flores amarillas que viajan hasta donde estés para alegrar tu día y recordarte cuánto te amo :3.
        </p>

        <!-- Primary CTA to open and start music -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="enter-garden-btn"
            type="button"
            (click)="enter.emit()"
            class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-medium text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <mat-icon class="text-xl">local_florist</mat-icon>
            <span>Ver mis flores amarillas</span>
            <mat-icon class="text-xl">music_note</mat-icon>
          </button>
        </div>

        <p class="mt-4 text-xs text-[#92400E]/70 font-sans-clean">
          ✨ Se reproducirá música romántica al entrar
        </p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes openingFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes cardEmerge {
      0% { opacity: 0; transform: translateY(24px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-opening-fade {
      animation: openingFade 0.6s ease-out forwards;
    }
    .animate-card-emerge {
      animation: cardEmerge 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `],
})
export class OpeningGreeting {
  readonly enter = output<void>();

  private sanitizer = inject(DomSanitizer);

  readonly sunflowerEmblemSvg = computed<SafeHtml>(() => {
    const content = `<defs>${FLORAL_DEGRADADOS}${girasolHead()}</defs><use href="#h-girasol" />`;
    return this.sanitizer.bypassSecurityTrustHtml(content);
  });
}
