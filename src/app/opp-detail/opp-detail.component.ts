import { Component, OnInit } from '@angular/core';
import { Opps } from '../_models/opps.model';

@Component({
  selector: 'app-opp-detail',
  templateUrl: './opp-detail.component.html',
  styleUrls: ['./opp-detail.component.css']
})
export class OppDetailComponent implements OnInit {

  opps: Opps;

  constructor() { }

  ngOnInit(): void {
    this.opps = new Opps();
    this.opps.Name_of_Program = "STEP Youth Regional Affairs Dialogue";
    this.opps.Organiser = "Comittee Organis";
  }

}
