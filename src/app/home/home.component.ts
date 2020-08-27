import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  title = 'THE OPPORTUNITY PROJECT.';

  constructor(private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.pageStyleService.newEvent('home');
  }

}
