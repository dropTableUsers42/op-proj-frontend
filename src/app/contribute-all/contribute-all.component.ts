import { Component, OnInit } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';

@Component({
  selector: 'app-contribute-all',
  templateUrl: './contribute-all.component.html',
  styleUrls: ['./contribute-all.component.scss']
})
export class ContributeAllComponent implements OnInit {

  constructor(private pageStyleService: PageStyleService ) { }

  ngOnInit(): void {
    this.pageStyleService.newEvent('home');
  }

}
