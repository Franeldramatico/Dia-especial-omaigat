import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pdf-viewer-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      id="pdf-modal-overlay"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
    >
      <!-- Backdrop button for accessible dismissal -->
      <button
        type="button"
        class="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 w-full h-full border-none cursor-default"
        (click)="closePdf.emit()"
        aria-label="Cerrar visor PDF"
      ></button>

      <div
        id="pdf-modal-container"
        class="relative z-10 w-full max-w-3xl h-[88vh] flex flex-col bg-[#FFFDF9] border border-[#FDE68A] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
      >
        <!-- Modal Header -->
        <div class="px-5 sm:px-6 py-4 bg-[#FEF3C7] border-b border-[#FCD34D]/50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-full bg-[#D97706]/15 text-[#B45309] flex items-center justify-center">
              <mat-icon class="text-xl">picture_as_pdf</mat-icon>
            </span>
            <div>
              <span class="text-xs uppercase tracking-wider text-[#92400E] font-medium font-sans-clean">
                Documento Especial
              </span>
              <h3 id="pdf-modal-title" class="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#78350F] leading-tight">
                Carta Extra en PDF para Aranxita
              </h3>
            </div>
          </div>

          <button
            id="close-pdf-modal-btn"
            type="button"
            (click)="closePdf.emit()"
            class="w-9 h-9 rounded-full bg-white/80 hover:bg-[#FDE68A] text-[#78350F] border border-[#FCD34D]/60 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Cerrar visor PDF"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <!-- Action bar with Quick Open & Download -->
        <div class="px-5 py-3 bg-[#FFFBEB] border-b border-[#FDE68A] flex flex-wrap items-center gap-2 text-sm">
          <div class="flex items-center gap-2">
            <a
              id="direct-pdf-link"
              [href]="currentPdfUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3.5 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm text-xs sm:text-sm"
            >
              <mat-icon class="text-base">open_in_new</mat-icon>
              <span>Abrir en nueva pestaña</span>
            </a>

            <a
              id="download-pdf-link"
              [href]="currentPdfUrl()"
              download="Carta_Especial_Aranxita.pdf"
              class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm text-xs sm:text-sm"
            >
              <mat-icon class="text-base">download</mat-icon>
              <span>Descargar PDF</span>
            </a>
          </div>

        </div>

        <!-- PDF Frame / Embedded Viewer -->
        <div class="flex-1 bg-[#F5F5F4] relative flex flex-col items-center justify-center p-2">
          @if (currentPdfUrl()) {
            <iframe
              id="pdf-iframe-viewer"
              [src]="currentPdfUrl()"
              class="w-full h-full rounded-lg border border-amber-200/50 bg-white"
              title="Carta en PDF"
            ></iframe>
          }

          <!-- Fallback overlay if browser blocks embedded PDF preview -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-amber-200 px-4 py-2 rounded-xl shadow-lg flex items-center gap-3 text-xs text-amber-900 pointer-events-auto">
            <mat-icon class="text-amber-600 text-sm">info</mat-icon>
            <span>¿No se visualiza en tu móvil?</span>
            <a
              [href]="currentPdfUrl()"
              target="_blank"
              class="font-semibold text-amber-700 underline hover:text-amber-900"
            >
              Toca aquí para abrir directamente el PDF
            </a>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `],
})
export class PdfViewerModal {
  readonly closePdf = output<void>();
  readonly currentPdfUrl = signal<string>('assets/carta-para-aranxita.pdf');
}
