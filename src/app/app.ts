import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FloatingMusicPlayer } from './components/floating-music-player';
import { GoldenParticles } from './components/golden-particles';
import { InteractiveFlowerBouquet } from './components/interactive-flower-bouquet';
import { LoveLetterModal } from './components/love-letter-modal';
import { LoveLetterSection } from './components/love-letter-section';
import { OpeningGreeting } from './components/opening-greeting';
import { PdfViewerModal } from './components/pdf-viewer-modal';
import { RomanticAudio } from './services/romantic-audio';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    GoldenParticles,
    OpeningGreeting,
    LoveLetterModal,
    LoveLetterSection,
    PdfViewerModal,
    InteractiveFlowerBouquet,
    FloatingMusicPlayer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly audio = inject(RomanticAudio);

  readonly showGreeting = signal<boolean>(true);
  readonly showLoveLetter = signal<boolean>(false);
  readonly showPdfModal = signal<boolean>(false);

  // Love moments cards tailored for their distance relationship (no time duration, sweet :3)
  readonly loveReasons = [
    {
      icon: 'wb_sunny',
      title: 'Tu luz que me alcanza donde sea',
      description: 'Eres ese rayo de sol que alumbra cada rincón de mi vida, sin importar los kilómetros que hoy nos separen :3.',
    },
    {
      icon: 'favorite',
      title: 'Tu ternura a la distancia',
      description: 'La calidez de tus mensajes, tu paciencia y el amor con el que me cuidas son el regalo más valioso que tengo :3.',
    },
    {
      icon: 'music_note',
      title: 'Tu risa en nuestras llamadas',
      description: 'Escucharte reír a través del teléfono es mi melodía favorita. Alegras mi mundo con solo escuchar tu hermosa voz :3.',
    },
    {
      icon: 'spa',
      title: 'La paz que me transmites',
      description: 'Saber que estás ahí me llena de serenidad absoluta. Soñar con el día de abrazarte en persona me llena de ilusión :3.',
    },
    {
      icon: 'auto_awesome',
      title: 'Nuestra complicidad única',
      description: 'Esa conexión tan bonita en la que nos entendemos al instante y donde cada videollamada se nos pasa volando :3.',
    },
    {
      icon: 'loyalty',
      title: 'Mi promesa dorada',
      description: 'Estar a tu lado apoyándote en todo, amándote cada día más y recordarte siempre lo maravillosa que eres para mí :3.',
    },
  ];

  onEnterGarden(): void {
    this.showGreeting.set(false);
    this.audio.playMusic();
  }

  scrollToLetter(): void {
    const element = document.getElementById('carta-de-amor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-[#F59E0B]');
      setTimeout(() => element.classList.remove('ring-4', 'ring-[#F59E0B]'), 2200);
    } else {
      this.openLetter();
    }
  }

  openLetter(): void {
    this.showLoveLetter.set(true);
  }

  closeLetter(): void {
    this.showLoveLetter.set(false);
  }

  openPdf(): void {
    this.showPdfModal.set(true);
  }

  closePdf(): void {
    this.showPdfModal.set(false);
  }

  goHome(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reopenGreeting(): void {
    this.showGreeting.set(true);
  }

  openPdfDirect(): void {
    window.open('assets/carta-para-aranxita.pdf', '_blank', 'noopener,noreferrer');
  }
}
