import { Component, OnInit, Input } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opps-card',
  templateUrl: './opps-card.component.html',
  styleUrls: ['./opps-card.component.css']
})
export class OppsCardComponent implements OnInit {


  @Input('opps') public opportunity: Opps;

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  getMainColor() {
      return '#05905F';
  }

  oppClick() {
    this.router.navigate(['opps/default']);
  }

}
