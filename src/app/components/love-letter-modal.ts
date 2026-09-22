import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-love-letter-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      id="love-letter-overlay"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
    >
      <!-- Backdrop button for accessible dismissal -->
      <button
        type="button"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 w-full h-full border-none cursor-default"
        (click)="closeLetter.emit()"
        aria-label="Cerrar carta"
      ></button>

      <div
        id="love-letter-container"
        class="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FFFDF9] border border-[#FDE68A] rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 animate-fadeIn"
      >
        <!-- Header / Decorative Envelope Top -->
        <div class="relative px-6 py-4 bg-gradient-to-r from-[#FEF3C7] via-[#FFFBEB] to-[#FEF3C7] border-b border-[#FCD34D]/40 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#B45309]">
              <mat-icon class="text-xl">favorite</mat-icon>
            </span>
            <div>
              <span class="text-xs uppercase tracking-wider text-[#92400E] font-medium font-sans-clean">
                Carta Especial
              </span>
              <h3 id="letter-title" class="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#78350F] leading-tight">
                Para mi dulce Aranxita
              </h3>
            </div>
          </div>

          <!-- Close button -->
          <button
            id="close-letter-btn"
            type="button"
            (click)="closeLetter.emit()"
            class="w-9 h-9 rounded-full bg-white/80 hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D]/50 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            aria-label="Cerrar carta"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <!-- Scrollable Letter Body -->
        <div class="flex-1 overflow-y-auto px-6 sm:px-10 py-8 bg-[#FFFDF9] text-[#451A03] space-y-6">
          <!-- Letter seal badge -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#B45309] shadow-inner">
              <mat-icon class="text-2xl animate-soft-glow">local_florist</mat-icon>
            </div>
            <p class="font-script-love text-2xl text-[#B45309] mt-2">
              Con todo mi amor para ti :3
            </p>
          </div>

          <!-- The Detailed Love Letter Content -->
          <div class="prose prose-amber max-w-none font-serif-cormorant text-lg sm:text-xl leading-relaxed text-[#592807] space-y-5">
            <p class="font-bold text-2xl sm:text-3xl text-[#92400E]">
              Mi adorada Aranxita :3,
            </p>

            <p class="first-letter:text-5xl first-letter:font-bold first-letter:text-[#B45309] first-letter:float-left first-letter:mr-2">
              Hoy quise detener el tiempo por un momento y entregarte estas flores amarillas que preparé pensando en ti en cada detalle, porque tú eres, sin duda alguna, <strong>el rayo de sol más brillante de mi vida :3</strong>.
            </p>

            <p>
              Aunque hoy tengamos kilómetros de por medio y nos comuniquemos a través de una pantalla, quiero que sepas que la distancia se queda diminuta ante el amor tan inmenso que siento por ti. No hay mapa ni distancia capaz de alejar lo presente que estás en mi mente y en mi corazón a cada segundo :3.
            </p>

            <div class="my-6 p-4 sm:p-5 rounded-2xl bg-[#FFFBEB] border-l-4 border-[#F59E0B] italic text-[#78350F] text-base sm:text-lg shadow-sm">
              «Dicen que regalar flores amarillas simboliza alegría, luz pura y el deseo sincero de compartir la vida juntos. Hoy te entrego este ramo eterno para recordarte que, sin importar cuán lejos estemos hoy, siempre serás mi personita favorita :3.»
            </div>

            <p>
              Amo con todo mi ser nuestras charlas, nuestras risas y esa complicidad tan hermosa que tenemos a pesar de no poder vernos cara a cara todos los días. Cada mensaje tuyo y cada videollamada son el momento más esperado y feliz de mi jornada :3.
            </p>

            <p>
              Estas flores amarillas son mi promesa sincera de cuidarte, de apoyarte siempre y de soñar con ese momento tan esperado en el que pueda dártelas en persona y darte un abrazo bien apretado de esos que quitan el aliento :3.
            </p>

            <p>
              Te mando un abrazo lleno de calorcito hasta donde estés, con todo mi cariño y un beso enorme :3.
            </p>

            <p class="pt-4 text-right font-script-love text-3xl sm:text-4xl text-[#92400E]">
              Siempre tuyo,<br />
              <span class="text-xl sm:text-2xl font-serif-cormorant font-semibold tracking-wide">
                Tu eterno enamorado :3
              </span>
            </p>
          </div>

          <!-- Sweet footer decoration -->
          <div class="pt-4 border-t border-[#FDE68A]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#92400E]/80">
            <div class="flex items-center gap-1.5">
              <mat-icon class="text-base text-[#F59E0B]">favorite</mat-icon>
              <span>Dedicado con amor eterno para Aranxita :3</span>
            </div>
            <span class="italic">Flores Amarillas • Amor a Distancia</span>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="px-6 py-4 bg-[#FFFBEB] border-t border-[#FCD34D]/40 flex flex-wrap items-center justify-between gap-3">
          <button
            id="copy-letter-text-btn"
            type="button"
            (click)="copyLetterText()"
            class="px-4 py-2 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D] text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <mat-icon class="text-base">content_copy</mat-icon>
            <span>{{ copied() ? '¡Copiado con amor!' : 'Copiar carta' }}</span>
          </button>

          <div class="flex items-center gap-2">
            <button
              id="open-pdf-from-modal-btn"
              type="button"
              (click)="openPdf.emit()"
              class="px-4 py-2 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#F59E0B]/50 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <mat-icon class="text-base">picture_as_pdf</mat-icon>
              <span>Ver en PDF</span>
            </button>

            <button
              id="close-modal-main-btn"
              type="button"
              (click)="closeLetter.emit()"
              class="px-5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <mat-icon class="text-base">favorite_border</mat-icon>
              <span>Guardar en mi corazón</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `],
})
export class LoveLetterModal {
  readonly closeLetter = output<void>();
  readonly openPdf = output<void>();
  readonly copied = signal<boolean>(false);

  copyLetterText(): void {
    const text = `Para mi dulce y amada Aranxita :3,

Hoy quise detener el tiempo por un momento y entregarte estas flores amarillas que preparé pensando en ti en cada detalle, porque tú eres, sin duda alguna, el rayo de sol más brillante de mi vida :3.

Aunque hoy tengamos kilómetros de por medio y nos comuniquemos a través de una pantalla, quiero que sepas que la distancia se queda diminuta ante el amor tan inmenso que siento por ti. No hay mapa ni distancia capaz de alejar lo presente que estás en mi mente y en mi corazón a cada segundo :3.

«Dicen que regalar flores amarillas simboliza alegría, luz pura y el deseo sincero de compartir la vida juntos. Hoy te entrego este ramo eterno para recordarte que, sin importar cuán lejos estemos hoy, siempre serás mi personita favorita :3.»

Amo con todo mi ser nuestras charlas, nuestras risas y esa complicidad tan hermosa que tenemos a pesar de no poder vernos cara a cara todos los días. Cada mensaje tuyo y cada videollamada son el momento más esperado y feliz de mi jornada :3.

Estas flores amarillas son mi promesa sincera de cuidarte, de apoyarte siempre y de soñar con ese momento tan esperado en el que pueda dártelas en persona y darte un abrazo bien apretado de esos que quitan el aliento :3.

Te mando un abrazo lleno de calorcito hasta donde estés, con todo mi cariño y un beso enorme :3.

Siempre tuyo,
Tu eterno enamorado :3`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2500);
      });
    }
  }
}
