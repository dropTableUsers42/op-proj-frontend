import { Component, OnInit, Input } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-opps-wishlist',
  templateUrl: './opps-wishlist.component.html',
  styleUrls: ['./opps-wishlist.component.scss']
})
export class OppsWishlistComponent implements OnInit {

  @Input('wishlist') public opportunity_list: Opps[] = [];

  constructor(private backendService: BackendService, private authService: AuthService) {
   }

  ngOnInit(): void {
  }

}
