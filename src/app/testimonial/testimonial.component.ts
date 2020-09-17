import { Component, OnInit } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  constructor(private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.pageStyleService.newEvent('home');
  }

  get width(): number {
    return window.innerWidth;
  }

}
