import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RomanticAudio } from '../services/romantic-audio';

@Component({
  selector: 'app-love-letter-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="carta-de-amor" class="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16 scroll-mt-20">
      <!-- Section Header Indicator -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold uppercase tracking-widest shadow-xs mb-3">
          <mat-icon class="text-sm text-[#D97706]">mark_email_read</mat-icon>
          <span>Día de las Flores Amarillas</span>
        </div>
        <h2 class="font-serif-cormorant text-3xl sm:text-5xl font-bold text-[#78350F]">
          Mi Carta de Amor para Ti
        </h2>
        <p class="font-serif-cormorant text-base sm:text-lg text-[#92400E]/85 italic mt-1 max-w-lg mx-auto">
          Palabras escritas desde el corazón para acortar cada kilómetro entre nosotros :3
        </p>
      </div>

      <!-- The Letter Parchment Card (Warm Yellow Botanical Stationery) -->
      <div
        id="love-letter-parchment"
        class="relative w-full rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden transition-all duration-500"
        style="background: radial-gradient(circle at 10% 20%, #FFFDF5 0%, #FEF9E7 50%, #FEF3C7 100%); border: 2px solid #FCD34D;"
      >
        <!-- Golden ambient glow corner highlights -->
        <div class="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#FEF08A]/40 blur-3xl pointer-events-none"></div>

        <!-- Subtle floral watermark decorative icon in background -->
        <div class="absolute right-6 bottom-8 text-amber-300/20 pointer-events-none select-none">
          <mat-icon style="font-size: 180px; width: 180px; height: 180px;">local_florist</mat-icon>
        </div>

        <!-- Top Wax Seal & Golden Ribbon Embellishment -->
        <div class="relative z-10 flex flex-col items-center justify-center text-center mb-8">
          <div class="relative flex items-center justify-center">
            <!-- Ribbon tails -->
            <div class="absolute -bottom-4 w-12 h-6 flex justify-center">
              <span class="w-2.5 h-6 bg-amber-600/70 rotate-[-15deg] rounded-b-sm"></span>
              <span class="w-2.5 h-6 bg-amber-600/70 rotate-[15deg] rounded-b-sm"></span>
            </div>
            <!-- Golden Wax Seal with Sunflower -->
            <div class="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309] text-white flex items-center justify-center shadow-lg border-2 border-amber-200">
              <mat-icon class="text-2xl animate-soft-glow">local_florist</mat-icon>
            </div>
          </div>
          <span class="font-script-love text-2xl sm:text-3xl text-[#92400E] mt-3">
            Para Aranxita, con todo mi amor :3
          </span>
          <span class="text-xs uppercase tracking-wider text-[#B45309] font-sans-clean font-semibold mt-0.5">
            Flores que nunca se marchitan
          </span>
        </div>

        <!-- Delicate Botanical Divider -->
        <div class="relative z-10 flex items-center justify-center gap-3 my-6 opacity-60">
          <div class="h-px bg-gradient-to-r from-transparent via-[#D97706] to-transparent w-24 sm:w-40"></div>
          <mat-icon class="text-amber-600 text-sm">favorite</mat-icon>
          <div class="h-px bg-gradient-to-r from-transparent via-[#D97706] to-transparent w-24 sm:w-40"></div>
        </div>

        <!-- Letter Body Typography -->
        <article class="relative z-10 font-serif-cormorant text-lg sm:text-xl text-[#592807] leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p class="font-bold text-2xl sm:text-3xl text-[#92400E]">
            Mi adorada Aranxita :3,
          </p>

          <p class="first-letter:text-5xl first-letter:font-bold first-letter:text-[#B45309] first-letter:float-left first-letter:mr-2">
            Hoy quise detener el tiempo por un momento y entregarte estas flores amarillas que preparé pensando en ti en cada detalle, porque tú eres, sin duda alguna, <strong>el rayo de sol más brillante de mi vida :3</strong>.
          </p>

          <p>
            Aunque hoy tengamos kilómetros de por medio y nos comuniquemos a través de una pantalla, quiero que sepas que la distancia se queda diminuta ante el amor tan inmenso que siento por ti. No hay mapa ni distancia capaz de alejar lo presente que estás en mi mente y en mi corazón a cada segundo :3.
          </p>

          <!-- Golden Quote Callout with Yellow Flowers Theme -->
          <div class="my-6 p-5 sm:p-6 rounded-2xl bg-[#FFFBEB]/90 border-l-4 border-[#F59E0B] shadow-sm italic text-[#78350F] text-base sm:text-lg">
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

          <!-- Letter Sign-off -->
          <div class="pt-6 text-right">
            <p class="font-script-love text-3xl sm:text-4xl text-[#92400E]">
              Siempre tuyo,
            </p>
            <p class="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#78350F] mt-1">
              Tu eterno enamorado :3
            </p>
          </div>
        </article>

        <!-- Letter Bottom Action Bar -->
        <div class="relative z-10 mt-10 pt-6 border-t border-[#FCD34D]/70 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button
              id="copy-letter-section-btn"
              type="button"
              (click)="copyLetter()"
              class="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <mat-icon class="text-base text-amber-600">
                {{ isCopied() ? 'check_circle' : 'content_copy' }}
              </mat-icon>
              <span>{{ isCopied() ? '¡Copiada con mucho amor!' : 'Copiar esta carta' }}</span>
            </button>

            <button
              id="fullscreen-letter-btn"
              type="button"
              (click)="openModal.emit()"
              class="px-4 py-2.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <mat-icon class="text-base">open_in_full</mat-icon>
              <span>Ver en modal</span>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              id="pdf-from-letter-btn"
              type="button"
              (click)="openPdf.emit()"
              class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <mat-icon class="text-base">picture_as_pdf</mat-icon>
              <span>Carta en PDF</span>
            </button>
          </div>
        </div>

        <!-- Sweet Interactive Reaction Badges -->
        <div class="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2">
          <span class="text-xs text-[#92400E]/70 font-sans-clean mr-1">Dedicarle un cariñito:</span>
          @for (reaction of reactions; track reaction.label) {
            <button
              type="button"
              (click)="sendReaction(reaction.label)"
              class="px-3 py-1 rounded-full bg-white/80 hover:bg-amber-100 border border-amber-200 text-xs text-[#78350F] flex items-center gap-1 transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-2xs"
            >
              <span>{{ reaction.emoji }}</span>
              <span class="font-medium">{{ reaction.label }}</span>
            </button>
          }
          @if (activeReaction(); as currentReaction) {
            <span class="ml-2 text-xs font-semibold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300 animate-pulse">
              ¡Enviaste {{ currentReaction }} con mucho amor :3!
            </span>
          }
        </div>
      </div>
    </section>
  `,
})
export class LoveLetterSection {
  readonly openModal = output<void>();
  readonly openPdf = output<void>();

  private audio = inject(RomanticAudio);

  readonly isCopied = signal<boolean>(false);
  readonly activeReaction = signal<string | null>(null);

  readonly reactions = [
    { emoji: ':3', label: 'Ternura' },
    { emoji: '💛', label: 'Amor' },
    { emoji: '🌻', label: 'Flores' },
    { emoji: '🫂', label: 'Abrazo' },
  ];

  copyLetter(): void {
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
        this.isCopied.set(true);
        this.audio.playSparkleSound();
        setTimeout(() => this.isCopied.set(false), 2500);
      });
    }
  }

  sendReaction(label: string): void {
    this.activeReaction.set(label);
    this.audio.playSparkleSound();
    setTimeout(() => this.activeReaction.set(null), 2500);
  }
}
