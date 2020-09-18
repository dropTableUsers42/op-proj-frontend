import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-about-overlay',
  templateUrl: './about-overlay.component.html',
  styleUrls: ['./about-overlay.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate(200)
      ]),
      transition(':leave', [
        animate(200, style({ transform: 'translateY(100%)' }))
      ]),
    ])
  ]
})
export class AboutOverlayComponent implements OnInit {

  text1 = 'Hello! We are a team of students from IIT Bombay and BITS Pilani, out to solve a critical problem that we have faced. Everyone dreams of learning and pursuing multiple opportunities outside their campuses while cultivating their interests, after entering college. However, most remain limited by the bubble of their choice of peers, constraints in ideas, and trying to find their needle-like calling in the vast haystack-like Internet. And thus was born the drive to create '

  text2 = 'The Opportunity Project';

  text3 = ', something which would chip away at this problem.\n\nProviding access to opportunities all across the globe across six diverse domains, The Opportunity Project aims to eliminate the problem of the bubble which holds in our true potential. We aim to bridge the experiential learning gap and build an exclusive community of like-minded people with the purpose of learning, growing together, and exploring the world.'

  @Input('show') show: boolean;
  @Output() onClose = new EventEmitter<Event>();

  constructor() { }

  stopPropagate(event) {
    event.stopPropagation();
  }

  public close() {
    this.onClose.emit();
  }

  ngOnInit(): void {
  }

}
