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
    this.opps.domain = "Social Development & Policy";
    this.opps.Type = "Conference";
    this.opps.Location = "Singapore";
    this.opps.Deadline = "12 June 2020";
    this.opps.About = "Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random";

    this.opps.Testimonial = "Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description.Lorem ipsum description blah blah blah random hello description description Lorem Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description.Lorem ipsum description blah blah blah rand. Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description.Lorem ipsum description blah blah blah";
  }

}
