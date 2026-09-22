import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RomanticAudio } from '../services/romantic-audio';
import { BloomingFlowersCode } from './blooming-flowers-code';
import { InteractiveFloralMeadow } from './interactive-floral-meadow';

interface FlowerPetalNote {
  flowerType: string;
  scientificName: string;
  title: string;
  message: string;
  icon: string;
}

@Component({
  selector: 'app-interactive-flower-bouquet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    BloomingFlowersCode,
    InteractiveFloralMeadow,
  ],
  template: `
    <section id="flowers-showcase" class="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <!-- Section Header -->
      <div class="text-center mb-8 sm:mb-12">
        <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold tracking-wider uppercase mb-3">
          <mat-icon class="text-sm text-[#D97706]">wb_sunny</mat-icon>
          <span>Con Todo Mi Amor</span>
        </span>
        <h2 class="font-serif-cormorant text-3xl sm:text-5xl font-bold text-[#78350F] mb-3">
          Un Ramo de Flores Amarillas que Jamás se Marchitarán
        </h2>
        <p class="font-serif-cormorant text-base sm:text-lg text-[#92400E]/85 italic max-w-xl mx-auto leading-relaxed">
          Girasoles, rosas, tulipán, narciso y mimosa floreciendo en armonía para ti, mi adorada Aranxita.
        </p>
      </div>

      <!-- Main Visual Grid: Exquisite Bouquet & Interactive Petal Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
        
        <!-- Left Column: Masterpiece Botanical Bouquet with User's Exact Math and SVGs -->
        <div class="lg:col-span-6 flex flex-col items-center">
          <app-blooming-flowers-code />
        </div>

        <!-- Right Column: Interactive Petal Notes & 5 Botanical Flowers Meaning Badges -->
        <div class="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          
          <!-- Interactive Botanical Meaning Badges: 5 Flowers -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md">
            @for (note of notes; track note.flowerType; let i = $index) {
              <button
                type="button"
                (click)="selectFlower(i)"
                class="p-3 rounded-2xl transition-all cursor-pointer text-left border focus:outline-none"
                [class.bg-[#FEF3C7]]="currentNote().flowerType === note.flowerType"
                [class.border-amber-400]="currentNote().flowerType === note.flowerType"
                [class.shadow-md]="currentNote().flowerType === note.flowerType"
                [class.bg-white/90]="currentNote().flowerType !== note.flowerType"
                [class.border-amber-200]="currentNote().flowerType !== note.flowerType"
                [class.hover:bg-[#FEF9E7]]="currentNote().flowerType !== note.flowerType"
              >
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <mat-icon class="text-xs">{{ note.icon }}</mat-icon>
                  </span>
                  <span class="font-serif-cormorant font-bold text-sm text-[#78350F] truncate">
                    {{ note.flowerType }}
                  </span>
                </div>
                <p class="text-[11px] text-[#92400E]/75 font-serif-cormorant italic pl-8 truncate">
                  {{ note.scientificName }}
                </p>
              </button>
            }
          </div>

          <!-- Interactive Petal Note Box -->
          <div
            id="active-note-box"
            class="w-full max-w-md p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF5] to-[#FEF3C7] border-2 border-[#FCD34D] shadow-md transition-all text-left"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs uppercase font-semibold tracking-wider text-[#B45309] flex items-center gap-1">
                <mat-icon class="text-sm">{{ currentNote().icon }}</mat-icon>
                {{ currentNote().flowerType }} — {{ currentNote().scientificName }}
              </span>
              <span class="text-xs text-[#92400E]/60 italic font-sans-clean">Toca otra flor</span>
            </div>
            <h3 class="font-serif-cormorant text-xl font-bold text-[#78350F] mb-1.5">
              {{ currentNote().title }}
            </h3>
            <p class="font-serif-cormorant text-base sm:text-lg text-[#592807] italic leading-relaxed">
              «{{ currentNote().message }}»
            </p>
          </div>

          <!-- Buttons Row for Major Actions -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full">
            <button
              id="open-letter-btn"
              type="button"
              (click)="openLoveLetter.emit()"
              class="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <mat-icon class="text-base">mail</mat-icon>
              <span>Leer Carta Detallada</span>
            </button>

            <button
              id="open-pdf-btn"
              type="button"
              (click)="openPdfModal.emit()"
              class="px-5 py-3 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-semibold text-xs sm:text-sm border border-amber-300 flex items-center gap-2 shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <mat-icon class="text-base text-amber-600">picture_as_pdf</mat-icon>
              <span>Carta en PDF</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Second Floral Section: The 5 Botanical Flowers on one soil line (User's .fila) -->
      <app-interactive-floral-meadow />

      <!-- Love Dedication Banner -->
      <div class="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7]/80 to-[#FFFBEB] border-2 border-[#FDE68A] shadow-xl text-center space-y-4">
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
          <mat-icon class="text-sm text-amber-600">favorite</mat-icon>
          <span>El significado de regalarte flores amarillas</span>
        </div>
        <h3 class="font-serif-cormorant text-2xl sm:text-4xl font-bold text-[#78350F]">
          Flores Amarillas para Nuestro Amor a Distancia :3
        </h3>
        <p class="font-sans-clean text-sm sm:text-base text-[#78350F]/85 leading-relaxed max-w-2xl mx-auto">
          La tradición de las flores amarillas celebra la alegría que traes a mi vida y el deseo sincero de compartir nuestro camino.
          Aunque hoy estemos a distancia, estas flores amarillas viajan volando con todo mi cariño para recordarte lo mucho que te amo :3.
        </p>

        <!-- Dynamic Thought Card that visibly updates right here on button click! -->
        <div
          id="distance-thought-card"
          class="max-w-xl mx-auto p-5 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-md text-left transition-all duration-300 transform"
        >
          <div class="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-100">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <mat-icon class="text-xs">{{ currentDistanceThought().icon }}</mat-icon>
              </span>
              <span>{{ currentDistanceThought().title }}</span>
            </span>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold font-sans-clean">
              Pensamiento {{ currentThoughtIndex() + 1 }} de {{ distanceThoughts.length }}
            </span>
          </div>
          <p class="font-serif-cormorant text-lg sm:text-xl text-[#592807] italic leading-relaxed">
            «{{ currentDistanceThought().text }}»
          </p>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="discover-another-thought-btn"
            type="button"
            (click)="discoverNextThought()"
            class="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer shadow-md hover:shadow-lg"
          >
            <mat-icon class="text-base">volunteer_activism</mat-icon>
            <span>Descubrir otro pensamiento de amor :3</span>
          </button>
        </div>
      </div>
    </section>
  `,
})
export class InteractiveFlowerBouquet {
  readonly openLoveLetter = output<void>();
  readonly openPdfModal = output<void>();

  private audioService = inject(RomanticAudio);

  readonly notes: FlowerPetalNote[] = [
    {
      flowerType: 'Girasol',
      scientificName: 'Helianthus annuus',
      title: 'Tu luz que llega hasta mí',
      message: 'Aunque estemos lejos, así como el girasol busca al sol, mis pensamientos siempre viajan derechito hacia ti :3',
      icon: 'wb_sunny',
    },
    {
      flowerType: 'Narciso',
      scientificName: 'Narcissus pseudonarcissus',
      title: 'La ilusión de nuestro futuro',
      message: 'Tu amor me demuestra que la distancia no es un obstáculo cuando soñamos con construir una vida hermosa juntos :3',
      icon: 'flare',
    },
    {
      flowerType: 'Tulipán',
      scientificName: 'Tulipa',
      title: 'Mi refugio a la distancia',
      message: 'En cada mensaje y en cada llamada encuentro esa paz, respeto y cariño que solo tú sabes transmitirme :3',
      icon: 'local_florist',
    },
    {
      flowerType: 'Rosa amarilla',
      scientificName: 'Rosa × hybrida',
      title: 'Nuestras risas compartidas',
      message: 'Amo nuestras charlas interminables donde las horas vuelan y la distancia se esfuma por completo :3',
      icon: 'favorite',
    },
    {
      flowerType: 'Mimosa',
      scientificName: 'Acacia dealbata',
      title: 'Un abrazo apachurradito',
      message: 'Te mando toda mi ternura en este ramito amarillo, con un abrazo súper apretado hasta donde estés :3',
      icon: 'spa',
    },
  ];

  readonly distanceThoughts = [
    {
      title: 'Amor sin distancias',
      text: 'Aunque estemos a kilómetros de distancia y nos separe una pantalla, mi corazón late bien cerquita del tuyo cada segundo :3',
      icon: 'favorite',
    },
    {
      title: 'Bajo el mismo sol',
      text: 'Cuando el sol brilla sobre mí, me alegra saber que es el mismo sol amarillo que te alumbra y te cuida a ti :3',
      icon: 'wb_sunny',
    },
    {
      title: 'Flores eternas para ti',
      text: 'Te mando un ramito virtual de flores amarillas que nunca se marchitan, con un beso enorme hasta donde estás :3',
      icon: 'local_florist',
    },
    {
      title: 'Abrazo apachurradito',
      text: 'Cierra los ojos un segundo y siente este abrazo apretadito que viaja desde mi corazón directo al tuyo :3',
      icon: 'volunteer_activism',
    },
    {
      title: 'Mi personita favorita',
      text: 'La distancia no es nada cuando una personita como tú lo es absolutamente todo para mí :3',
      icon: 'star',
    },
    {
      title: 'Mi rayo de sol',
      text: 'Tú eres el rayo de sol más brillante de mi vida, y no hay distancia en el mapa capaz de apagar tu luz :3',
      icon: 'flare',
    },
    {
      title: 'Tu hermosa sonrisa',
      text: 'Cada videollamada y cada risa tuya hacen que cualquier día se vuelva radiante y lleno de color :3',
      icon: 'sentiment_very_satisfied',
    },
    {
      title: 'Esperando nuestro encuentro',
      text: 'No veo la hora de que llegue el día de poder entregarte flores amarillas en tus manitas y darte un abrazo de verdad :3',
      icon: 'celebration',
    },
    {
      title: 'Complicidad pura',
      text: 'Amo la complicidad tan bonita que tenemos; la distancia física solo hace que valore más cada instante que compartimos :3',
      icon: 'auto_awesome',
    },
    {
      title: 'Promesa dorada',
      text: 'En este Día de las Flores Amarillas, te prometo que siempre tendrás en mí un refugio lleno de amor y comprensión :3',
      icon: 'loyalty',
    },
  ];

  readonly currentNote = signal<FlowerPetalNote>(this.notes[0]);
  readonly currentThoughtIndex = signal<number>(0);
  readonly currentDistanceThought = signal(this.distanceThoughts[0]);

  selectFlower(index: number): void {
    if (this.notes[index]) {
      this.currentNote.set(this.notes[index]);
      this.audioService.playSparkleSound();
    }
  }

  discoverNextThought(): void {
    // Advance to next thought cyclically
    const nextIdx = (this.currentThoughtIndex() + 1) % this.distanceThoughts.length;
    this.currentThoughtIndex.set(nextIdx);
    this.currentDistanceThought.set(this.distanceThoughts[nextIdx]);

    // Also update current note in bouquet to keep everything in sync
    const noteIdx = nextIdx % this.notes.length;
    this.currentNote.set(this.notes[noteIdx]);

    // Play sparkle sound
    this.audioService.playSparkleSound();
  }

  getRandomPetal(): void {
    this.discoverNextThought();
  }
}
