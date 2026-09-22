import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  alpha: number;
  alphaSpeed: number;
  maxAlpha: number;
  type: 'sparkle' | 'orb' | 'star' | 'petal';
  color: string;
  glowRadius: number;
}

@Component({
  selector: 'app-golden-particles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas
      #canvas
      id="golden-particles-canvas"
      class="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    ></canvas>
  `,
})
export class GoldenParticles implements OnInit, OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private particles: Particle[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private width = 0;
  private height = 0;
  private isPaused = false;

  private readonly colors = [
    '#FBBF24', // Amber 400
    '#F59E0B', // Amber 500
    '#FCD34D', // Amber 300
    '#FEF08A', // Yellow 200 (warm sunlight)
    '#FFFBEB', // Golden white glint
    '#D97706', // Deep warm amber
  ];

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    // Small delay to ensure view is mounted
    setTimeout(() => {
      this.initCanvas();
    }, 50);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  ngOnDestroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  private handleVisibilityChange = (): void => {
    this.isPaused = document.hidden;
    if (!this.isPaused && !this.animFrameId) {
      this.render();
    }
  };

  private initCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.updateSize();

    this.resizeObserver = new ResizeObserver(() => {
      this.updateSize();
    });
    this.resizeObserver.observe(document.body);

    this.createParticles();
    this.render();
  }

  private updateSize(): void {
    const canvas = this.canvasRef().nativeElement;
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;

    if (this.ctx) {
      this.ctx.resetTransform();
      this.ctx.scale(dpr, dpr);
    }
  }

  private createParticles(): void {
    // Number of particles: modest and smooth to ensure high performance
    const isMobile = this.width < 768;
    const count = isMobile ? 36 : 65;

    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.generateParticle(Math.random() * this.height));
    }
  }

  private generateParticle(initialY?: number): Particle {
    const types: ('sparkle' | 'orb' | 'star' | 'petal')[] = ['sparkle', 'orb', 'star', 'petal', 'sparkle', 'petal'];
    const type = types[Math.floor(Math.random() * types.length)];
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const size = type === 'petal' ? Math.random() * 5 + 4 : (type === 'orb' ? Math.random() * 3.5 + 1.5 : Math.random() * 4 + 2);

    return {
      x: Math.random() * this.width,
      y: initialY !== undefined ? initialY : -20,
      size,
      speedY: type === 'petal' ? Math.random() * 0.6 + 0.4 : Math.random() * 0.7 + 0.35, // Slow gentle falling
      speedX: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.04,
      alpha: Math.random() * 0.5 + 0.25,
      alphaSpeed: Math.random() * 0.015 + 0.008,
      maxAlpha: Math.random() * 0.55 + 0.35,
      type,
      color,
      glowRadius: size * (type === 'star' ? 3.5 : 2.5),
    };
  }

  private render = (): void => {
    if (this.isPaused || !this.ctx) {
      this.animFrameId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update position with graceful sway
      p.y += p.speedY;
      p.angle += p.angleSpeed;
      p.x += Math.sin(p.angle) * (p.type === 'petal' ? 1.2 : 0.5) + p.speedX;

      // Pulse alpha smoothly
      p.alpha += p.alphaSpeed;
      if (p.alpha > p.maxAlpha || p.alpha < 0.15) {
        p.alphaSpeed = -p.alphaSpeed;
      }

      // Draw particle based on type (mathematical geometric glow & code petals, no emojis)
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

      if (p.type === 'sparkle' || p.type === 'star') {
        this.drawSparkle(p);
      } else if (p.type === 'petal') {
        this.drawGoldenPetal(p);
      } else {
        this.drawGlowingOrb(p);
      }

      this.ctx.restore();

      // Reset when particle falls off screen
      if (p.y > this.height + 25 || p.x < -30 || p.x > this.width + 30) {
        this.particles[i] = this.generateParticle(-15);
      }
    }

    this.animFrameId = requestAnimationFrame(this.render);
  };

  private drawGoldenPetal(p: Particle): void {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);

    // Warm golden gradient for the petal
    const w = p.size;
    const h = p.size * 2.2;
    const grad = this.ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    grad.addColorStop(0, '#FEF08A');
    grad.addColorStop(0.5, '#FBBF24');
    grad.addColorStop(1, '#D97706');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -h / 2);
    this.ctx.bezierCurveTo(w / 1.5, -h / 4, w / 1.5, h / 4, 0, h / 2);
    this.ctx.bezierCurveTo(-w / 1.5, h / 4, -w / 1.5, -h / 4, 0, -h / 2);
    this.ctx.fill();

    // Central vein
    this.ctx.strokeStyle = '#FDE68A';
    this.ctx.lineWidth = 0.8;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -h / 2.5);
    this.ctx.lineTo(0, h / 2.5);
    this.ctx.stroke();

    this.ctx.restore();
  }

  private drawGlowingOrb(p: Particle): void {
    if (!this.ctx) return;

    // Radial gradient for warm shimmering bokeh effect
    const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowRadius);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.3, p.color);
    grad.addColorStop(1, 'rgba(251, 191, 36, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Central bright core
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawSparkle(p: Particle): void {
    if (!this.ctx) return;

    const armLength = p.size * 2.8;
    const innerWidth = p.size * 0.45;

    // Outer glow
    const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, armLength * 1.5);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.4, p.color);
    grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, armLength * 1.5, 0, Math.PI * 2);
    this.ctx.fill();

    // 4-point star glint
    this.ctx.fillStyle = '#FFFDF0';
    this.ctx.beginPath();

    // North
    this.ctx.moveTo(p.x, p.y - armLength);
    this.ctx.quadraticCurveTo(p.x, p.y, p.x + innerWidth, p.y);
    // East
    this.ctx.lineTo(p.x + armLength, p.y);
    this.ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + innerWidth);
    // South
    this.ctx.lineTo(p.x, p.y + armLength);
    this.ctx.quadraticCurveTo(p.x, p.y, p.x - innerWidth, p.y);
    // West
    this.ctx.lineTo(p.x - armLength, p.y);
    this.ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - innerWidth);

    this.ctx.closePath();
    this.ctx.fill();

    // Tiny white core center
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
