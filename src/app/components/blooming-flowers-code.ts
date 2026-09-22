import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { getAllFloralDefs, getBouquetSvg } from '../utils/floral-art';

@Component({
  selector: 'app-blooming-flowers-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      id="blooming-flowers-art"
      class="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center p-4 sm:p-7 rounded-3xl transition-all duration-700 shadow-2xl overflow-hidden select-none"
      [class.bg-[#0f2a1c]]="theme() === 'emerald'"
      [class.bg-gradient-to-b]="theme() === 'cream'"
      [class.from-[#FFFDF8]]="theme() === 'cream'"
      [class.via-[#FFF9EB]]="theme() === 'cream'"
      [class.to-[#FEF3C7]]="theme() === 'cream'"
      [class.border-2]="true"
      [class.border-[#245f2e]/60]="theme() === 'emerald'"
      [class.border-[#FDE68A]]="theme() === 'cream'"
    >
      <!-- Background Radiance from user's botanical palette -->
      @if (theme() === 'emerald') {
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            class="absolute inset-0"
            style="background: radial-gradient(760px 520px at 50% 34%, rgba(255,203,46,0.22), transparent 70%), radial-gradient(1200px 900px at 50% 10%, #1d4a30 0%, #0f2a1c 70%);"
          ></div>
        </div>
      } @else {
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-[#FDE047]/30 to-transparent blur-3xl"></div>
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-48 rounded-full bg-[#F59E0B]/15 blur-2xl"></div>
        </div>
      }

      <!-- Top Dedicated Controls -->
      <div class="relative z-10 flex items-center justify-between w-full mb-3 px-1">
        <span
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-xs transition-colors"
          [class.bg-[#163c27]]="theme() === 'emerald'"
          [class.text-[#ffcb2e]]="theme() === 'emerald'"
          [class.border]="true"
          [class.border-[#387a4c]]="theme() === 'emerald'"
          [class.bg-amber-100/90]="theme() === 'cream'"
          [class.text-amber-900]="theme() === 'cream'"
          [class.border-amber-300/80]="theme() === 'cream'"
        >
          <mat-icon class="text-sm animate-spin-slow" [class.text-[#ffcb2e]]="theme() === 'emerald'" [class.text-amber-600]="theme() === 'cream'">
            local_florist
          </mat-icon>
          <span>Ramo de Flores Amarillas</span>
        </span>

        <!-- Theme Toggle: Emerald Forest (User's original) vs Warm Cream -->
        <button
          type="button"
          (click)="toggleTheme()"
          class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all shadow-xs hover:shadow-md cursor-pointer"
          [class.bg-[#19402a]]="theme() === 'emerald'"
          [class.hover:bg-[#205236]]="theme() === 'emerald'"
          [class.text-[#fff3c4]]="theme() === 'emerald'"
          [class.border-[#3d7a4f]]="theme() === 'emerald'"
          [class.bg-white/95]="theme() === 'cream'"
          [class.hover:bg-white]="theme() === 'cream'"
          [class.text-amber-900]="theme() === 'cream'"
          [class.border-amber-200]="theme() === 'cream'"
          title="Alternar fondo"
        >
          <mat-icon class="text-sm text-amber-500">
            {{ theme() === 'emerald' ? 'dark_mode' : 'light_mode' }}
          </mat-icon>
          <span>{{ theme() === 'emerald' ? 'Fondo Bosque' : 'Fondo Claro' }}</span>
        </button>
      </div>

      <!-- Dedication Caption above bouquet -->
      <div class="relative z-10 text-center mb-2">
        <h3
          class="font-serif-cormorant text-2xl sm:text-3xl font-bold tracking-tight"
          [class.text-[#fff3c4]]="theme() === 'emerald'"
          [class.text-[#78350F]]="theme() === 'cream'"
        >
          Para mi hermosa Aranxita
        </h3>
        <p
          class="text-xs sm:text-sm italic font-serif-cormorant mt-0.5"
          [class.text-[#b9cfa6]]="theme() === 'emerald'"
          [class.text-[#92400E]]="theme() === 'cream'"
        >
          Girasoles, rosas, tulipán, narciso y mimosa en flor eterna
        </p>
      </div>

      <!-- The Bouquet Masterpiece SVG (Exact user logic) -->
      <div class="relative z-10 w-full max-w-[540px] flex items-center justify-center py-2">
        <svg
          viewBox="0 0 600 730"
          class="w-full h-auto max-h-[620px] overflow-visible drop-shadow-[0_26px_30px_rgba(0,0,0,0.42)] transition-transform duration-500 hover:scale-[1.02]"
          role="img"
          aria-label="Ramo de flores amarillas: girasoles, rosas, tulipán, narciso y mimosa"
          [innerHTML]="bouquetInnerSvg()"
        ></svg>
      </div>

      <!-- Bottom delicate ribbon note -->
      <div class="relative z-10 mt-3 text-center">
        <span
          class="inline-block px-4 py-1.5 rounded-full text-xs font-medium border"
          [class.bg-[#153523]]="theme() === 'emerald'"
          [class.text-[#b9cfa6]]="theme() === 'emerald'"
          [class.border-[#245f2e]]="theme() === 'emerald'"
          [class.bg-white/80]="theme() === 'cream'"
          [class.text-[#78350F]]="theme() === 'cream'"
          [class.border-amber-200]="theme() === 'cream'"
        >
          Flores vivas mecidas suavemente por el amor que te tengo
        </span>
      </div>
    </div>
  `,
})
export class BloomingFlowersCode {
  private sanitizer = inject(DomSanitizer);

  // Defaults to emerald as designed in user's CSS for optimum yellow flower vibrancy
  readonly theme = signal<'emerald' | 'cream'>('emerald');

  readonly bouquetInnerSvg = computed<SafeHtml>(() => {
    // Include defs directly in the SVG as well as the bouquet contents to ensure it renders flawlessly in any context
    const fullContent = `<defs>${getAllFloralDefs()}</defs>${getBouquetSvg()}`;
    return this.sanitizer.bypassSecurityTrustHtml(fullContent);
  });

  toggleTheme(): void {
    this.theme.update((t) => (t === 'emerald' ? 'cream' : 'emerald'));
  }
}
