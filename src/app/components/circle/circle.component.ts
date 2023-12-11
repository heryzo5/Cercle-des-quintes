import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.scss',
})
export class CircleComponent implements AfterViewInit {
  @ViewChildren('circleHalf') circleHalfInt!: QueryList<ElementRef>;
  @ViewChild('cntCircle') circle!: ElementRef;
  listKeys = [
    'Do',
    'Sol',
    'Ré',
    'La',
    'Mi',
    'Sib',
    'Fa#',
    'Do#',
    'Lab',
    'Mib',
    'Si',
    'Fa',
  ];
  @Output() chord: EventEmitter<string> = new EventEmitter<string>();

  calculHalf(i: number): string {
    return `${30 * i}deg`;
  }

  tonality(val: string, taget: any) {
    let index = this.listKeys.findIndex((value) => value === val);
    let lastchord = 0;
    let firstchord = 0;
    if (0 > index - 1) {
      lastchord = this.listKeys.length - 1;
    } else {
      lastchord = index - 1;
    }
    if (index + 1 > this.listKeys.length - 1) {
      firstchord = 0;
    } else {
      firstchord = index + 1;
    }
    let result = `${this.listKeys[index]} - ${this.listKeys[lastchord]} - ${this.listKeys[firstchord]}`;
    this.chord.emit(result);
    this.resetActif();
    taget.querySelector('.mainCircle__touch').classList.add('active');
  }
  animation: boolean = false;
  onDown(event: Event) {
    this.animation = true;
    let taget = event as MouseEvent;
    console.log(taget);
  }
  onUp() {
    this.animation = false;
  }
  ngAfterViewInit(): void {
    this.resetActif();
  }
  resetActif() {
    this.circleHalfInt.forEach((half) => {
      half.nativeElement
        .querySelector('.mainCircle__touch')
        .classList.remove('active');
    });
  }
  @HostListener('mousemove', ['$event'])
  mouseenter(event: Event) {
    let taget = event as MouseEvent;
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let posY = taget.clientY;
    let posX = taget.clientX;

    event.stopPropagation();

    if (this.animation) {
      this.circle.nativeElement.style.top = `${posY - screenHeight / 2 - 30}px`;
      this.circle.nativeElement.style.left = `${posX - screenWidth / 2}px`;
    }
  }
}
