import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioService } from './portfolio.service';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  profile: any;
  experience: any[] = [];
  projects: any[] = [];
  skills: any;
  achievements: string[] = [];
  objectKeys = Object.keys;

  // Particle Animation State
  private ctx!: CanvasRenderingContext2D;
  private particlesArray: Particle[] = [];
  private mouse = { x: 0, y: 0, radius: 150 };
  private animationFrameId: number = 0;
  private isBrowser: boolean;

  // Theme State
  isLightMode: boolean = false;

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.portfolioService.getProfile().subscribe(data => this.profile = data);
    this.portfolioService.getExperience().subscribe(data => this.experience = data);
    this.portfolioService.getProjects().subscribe(data => this.projects = data);
    this.portfolioService.getSkills().subscribe(data => this.skills = data);
    this.portfolioService.getAchievements().subscribe(data => this.achievements = data);
    
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.isLightMode = true;
        document.body.classList.add('light-mode');
      }
    }
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if (this.isBrowser) {
      if (this.isLightMode) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
    }
  }

  getTechIcon(tech: string): string {
    return tech.split(' ')[0];
  }

  getTechName(tech: string): string {
    return tech.substring(tech.indexOf(' ') + 1);
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.canvasRef) {
      this.initCanvas();
      this.animateParticles();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser && this.canvasRef) {
      this.canvasRef.nativeElement.width = window.innerWidth;
      this.canvasRef.nativeElement.height = window.innerHeight;
      this.initParticles();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
    // Add interaction particles occasionally
    if (Math.random() > 0.6) {
       this.particlesArray.push(this.createParticle(this.mouse.x, this.mouse.y, true));
    }
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent) {
    // Generate an immersive burst of particles at click location
    if (this.isBrowser && this.ctx) {
      for (let i = 0; i < 15; i++) {
        const p = this.createParticle(event.clientX, event.clientY, true);
        // Make burst particles move faster
        p.speedX = (Math.random() - 0.5) * 3;
        p.speedY = (Math.random() - 0.5) * 3;
        this.particlesArray.push(p);
      }
    }
  }

  @HostListener('window:mouseleave')
  onMouseLeave() {
    this.mouse.x = 0;
    this.mouse.y = 0;
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.initParticles();
  }

  private createParticle(x?: number, y?: number, isInteractive: boolean = false): Particle {
    const pSize = Math.random() * 2 + 0.5;
    return {
      x: x !== undefined ? x : Math.random() * window.innerWidth,
      y: y !== undefined ? y : Math.random() * window.innerHeight,
      size: pSize,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      life: isInteractive ? 100 : Infinity
    };
  }

  private initParticles() {
    this.particlesArray = [];
    let numberOfParticles = (window.innerWidth * window.innerHeight) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
      this.particlesArray.push(this.createParticle());
    }
  }

  private drawParticle(p: Particle) {
    this.ctx.fillStyle = `rgba(14, 165, 233, ${p.life !== Infinity ? p.life / 100 : 0.4})`;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private animateParticles = () => {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Draw subtle gradient orb at cursor
    if (this.mouse.x && this.mouse.y) {
      const gradient = this.ctx.createRadialGradient(this.mouse.x, this.mouse.y, 0, this.mouse.x, this.mouse.y, this.mouse.radius);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)'); // purple faint glow
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    for (let i = 0; i < this.particlesArray.length; i++) {
      let p = this.particlesArray[i];
      p.x += p.speedX;
      p.y += p.speedY;

      // Interaction with mouse
      if (this.mouse.x && this.mouse.y) {
        let dx = this.mouse.x - p.x;
        let dy = this.mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.mouse.radius && p.life === Infinity) {
           p.x -= dx / 30;
           p.y -= dy / 30;
        }
      }

      // Edge wrapping
      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      if (p.life !== Infinity) {
         p.life -= 1.5;
         if (p.life <= 0) {
            this.particlesArray.splice(i, 1);
            i--;
            continue;
         }
      }
      
      this.drawParticle(p);

      // Connect near particles
      for (let j = i; j < this.particlesArray.length; j++) {
        let p2 = this.particlesArray[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 - distance / 1000})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    this.animationFrameId = requestAnimationFrame(this.animateParticles);
  }
}
