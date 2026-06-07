import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: '[appTypewrite]' })
export class TypewriteDirective implements OnInit, OnDestroy, OnChanges {
  @Input() text: string = '';
  @Input() speed = 60; // ms per character for typing
  @Input() loop = true; // auto-restart by default (per user request)
  @Input() loopDelay = 1500; // pause after full text before deleting
  @Input() deleteSpeed?: number; // optional separate delete speed

  private timeoutId: any = null;
  private index = 0;
  private isDeleting = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'typewriter');
    this.startTyping();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && !changes['text'].firstChange) {
      this.reset();
      this.startTyping();
    }
  }

  private startTyping(): void {
    this.index = 0;
    this.isDeleting = false;
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');

    const step = () => {
      const full = this.text || '';
      const delSpeed = this.deleteSpeed ?? Math.max(20, Math.floor(this.speed * 0.6));

      if (!this.isDeleting) {
        if (this.index < full.length) {
          this.index++;
          const current = full.slice(0, this.index);
          this.renderer.setProperty(this.el.nativeElement, 'textContent', current);
          // slight randomness for more natural feel
          const jitter = Math.floor(Math.random() * (this.speed * 0.15));
          this.timeoutId = setTimeout(step, this.speed + jitter);
        } else {
          // finished typing
          if (this.loop) {
            this.timeoutId = setTimeout(() => {
              this.isDeleting = true;
              step();
            }, this.loopDelay);
          } else {
            this.renderer.setProperty(this.el.nativeElement, 'textContent', full);
          }
        }
      } else {
        if (this.index > 0) {
          this.index--;
          const current = full.slice(0, this.index);
          this.renderer.setProperty(this.el.nativeElement, 'textContent', current);
          this.timeoutId = setTimeout(step, delSpeed);
        } else {
          // finished deleting, restart typing after small pause
          this.isDeleting = false;
          this.timeoutId = setTimeout(step, 300);
        }
      }
    };

    step();
  }

  private reset(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.index = 0;
    this.isDeleting = false;
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
