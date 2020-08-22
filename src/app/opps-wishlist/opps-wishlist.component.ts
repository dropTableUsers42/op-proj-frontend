import { Component, OnInit } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-opps-wishlist',
  templateUrl: './opps-wishlist.component.html',
  styleUrls: ['./opps-wishlist.component.css']
})
export class OppsWishlistComponent implements OnInit {

  public opportunity_list: Opps[] = [];

  constructor(private backendService: BackendService, private authService: AuthService) {
   }

  ngOnInit(): void {
    this.opportunity_list.push(new Opps());
		this.opportunity_list[0].domain = 'Core';
		this.opportunity_list[0].Deadline = '1 Week';
		this.opportunity_list[0].Location = 'Singapore';
		this.opportunity_list[0].Name_of_Program = 'STEP Youth Regional Affairs Dialogue';
		this.opportunity_list[0].Organiser = 'Commitee Organis';
		this.opportunity_list[0].Type = 'CONFERENCE';
  }

}
