import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { getAllFloralDefs, getIndividualFlowerSvg } from '../utils/floral-art';

interface BotanicalFlower {
  id: string;
  type: 'girasol' | 'narciso' | 'tulipan' | 'rosa' | 'mimosa';
  commonName: string;
  scientificName: string;
  romanticMessage: string;
}

@Component({
  selector: 'app-interactive-floral-meadow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      id="floral-meadow-container"
      class="relative w-full rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden select-none transition-colors duration-500"
      style="background: radial-gradient(760px 520px at 50% 34%, rgba(255,203,46,0.16), transparent 70%), radial-gradient(1200px 900px at 50% 10%, #1d4a30 0%, #0f2a1c 70%); border: 1px solid rgba(255, 224, 120, 0.28);"
    >
      <!-- Atmosphere Radiance -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#ffcb2e]/10 blur-3xl"></div>
        <div class="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0f2a1c] to-transparent"></div>
      </div>

      <!-- Meadow Header -->
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#163c27] border border-[#387a4c] text-[#ffcb2e] text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <mat-icon class="text-sm text-[#ffcb2e]">eco</mat-icon>
            <span>Jardín Botánico de Amor</span>
          </div>
          <h3 class="font-serif-cormorant text-2xl sm:text-4xl font-normal text-[#fff3c4] tracking-tight">
            Cinco flores vivas para mi amada Aranxita
          </h3>
          <p class="font-serif-cormorant text-sm sm:text-base text-[#b9cfa6] italic max-w-2xl mt-1">
            Cada una con su esencia, tallo y pétalos únicos mecidas suavemente sobre la misma tierra fértil.
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <span class="text-xs px-3 py-1 rounded-full bg-[#153a26] text-[#b9cfa6] border border-[#2d5f3d]">
            Toca una flor para leer su mensaje
          </span>
        </div>
      </div>

      <!-- The 5 Botanical Flowers Row (Exact User Design & Geometry) -->
      <div class="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
        @for (flower of flowers; track flower.id) {
          <button
            type="button"
            (click)="selectFlower(flower)"
            class="group flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 border text-center focus:outline-none cursor-pointer"
            [class.bg-[#19402a]/80]="selectedFlower().id === flower.id"
            [class.border-[#ffcb2e]]="selectedFlower().id === flower.id"
            [class.shadow-[0_0_20px_rgba(255,203,46,0.25)]]="selectedFlower().id === flower.id"
            [class.scale-[1.03]]="selectedFlower().id === flower.id"
            [class.bg-[#133221]/60]="selectedFlower().id !== flower.id"
            [class.border-[#245334]]="selectedFlower().id !== flower.id"
            [class.hover:bg-[#163a26]]="selectedFlower().id !== flower.id"
          >
            <!-- SVG Stage for the individual flower -->
            <div class="w-full aspect-[260/380] flex items-center justify-center overflow-visible">
              <svg
                viewBox="0 0 260 380"
                class="w-full h-full overflow-visible transition-transform duration-500 group-hover:scale-105"
                [attr.aria-label]="flower.commonName"
                role="img"
                [innerHTML]="getFlowerSafeHtml(flower.type)"
              ></svg>
            </div>

            <!-- Figcaption matching user's exact typography and line decoration -->
            <div class="w-full mt-3 pt-2.5 border-t border-[rgba(255,224,120,0.28)]">
              <span class="font-serif-cormorant text-lg sm:text-xl font-normal text-[#fff3c4] block">
                {{ flower.commonName }}
              </span>
              <span class="block mt-0.5 text-xs text-[#b9cfa6] italic font-serif-cormorant">
                {{ flower.scientificName }}
              </span>
            </div>
          </button>
        }
      </div>

      <!-- Active Flower Romantic Dedication Note -->
      <div class="relative z-10 mt-8 p-5 sm:p-6 rounded-2xl bg-[#143623]/90 border border-[rgba(255,224,120,0.35)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#ffcb2e]/15 text-[#ffcb2e] flex items-center justify-center shrink-0 border border-[#ffcb2e]/30">
            <mat-icon class="text-2xl">favorite</mat-icon>
          </div>
          <div>
            <h4 class="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#fff3c4]">
              {{ selectedFlower().commonName }} — Para ti, Aranxita
            </h4>
            <p class="font-serif-cormorant text-sm sm:text-base text-[#fff3c4]/90 italic leading-relaxed mt-0.5">
              «{{ selectedFlower().romanticMessage }}»
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <span class="text-xs px-3.5 py-1.5 rounded-full bg-[#1c472f] text-[#ffcb2e] font-medium border border-[#387a4c]">
            Siempre en mi corazón
          </span>
        </div>
      </div>
    </div>
  `,
})
export class InteractiveFloralMeadow {
  private sanitizer = inject(DomSanitizer);

  readonly flowers: BotanicalFlower[] = [
    {
      id: 'girasol',
      type: 'girasol',
      commonName: 'Girasol',
      scientificName: 'Helianthus annuus',
      romanticMessage:
        'Así como el girasol busca incansablemente el sol, mis pensamientos viajan hasta ti sin importar la distancia :3.',
    },
    {
      id: 'narciso',
      type: 'narciso',
      commonName: 'Narciso',
      scientificName: 'Narcissus pseudonarcissus',
      romanticMessage:
        'Simboliza la luz y la ilusión de nuestro futuro juntos, recordándome que pronto estaremos cerquita :3.',
    },
    {
      id: 'tulipan',
      type: 'tulipan',
      commonName: 'Tulipán',
      scientificName: 'Tulipa',
      romanticMessage:
        'Representa la nobleza y la sinceridad con la que te amo, un amor puro y leal a través de cualquier distancia :3.',
    },
    {
      id: 'rosa',
      type: 'rosa',
      commonName: 'Rosa amarilla',
      scientificName: 'Rosa × hybrida',
      romanticMessage:
        'Celebra nuestras risas interminables y esa complicidad mágica que tenemos en cada llamada :3.',
    },
    {
      id: 'mimosa',
      type: 'mimosa',
      commonName: 'Mimosa',
      scientificName: 'Acacia dealbata',
      romanticMessage:
        'Es como un abrazo apachurradito y calientito que te mando volando hasta donde estés :3.',
    },
  ];

  readonly selectedFlower = signal<BotanicalFlower>(this.flowers[0]);

  selectFlower(f: BotanicalFlower): void {
    this.selectedFlower.set(f);
  }

  getFlowerSafeHtml(type: 'girasol' | 'narciso' | 'tulipan' | 'rosa' | 'mimosa'): SafeHtml {
    // Include defs directly so each SVG is completely self-contained and renders immediately
    const svgCode = `<defs>${getAllFloralDefs()}</defs>${getIndividualFlowerSvg(type)}`;
    return this.sanitizer.bypassSecurityTrustHtml(svgCode);
  }
}
