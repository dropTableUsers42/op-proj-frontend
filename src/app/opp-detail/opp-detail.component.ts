import { Component, OnInit } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { BackendService } from '../_services/backend.service';
import { PageStyleService } from '../_services/page-style.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opp-detail',
  templateUrl: './opp-detail.component.html',
  styleUrls: ['./opp-detail.component.css', 
          './opp-detail-color.component.css']
})
export class OppDetailComponent implements OnInit {

  opps: Opps;

  page_style: string;

  get_page_style = {
    'Core': 'core',
    'IT': 'it',
    'Consulting': 'consult',
    'Finance': 'fin',
    'Entrepreneurship': 'ent',
    'SocDev-and-Policy': 'socdev'
  }

  get title_class() {
    let ret_class = {'opp-title-container': true};
    ret_class[this.page_style] = true;
    return ret_class;
  }

  get detail_class() {
    let ret_class = {'opp-detailed-container': true};
    ret_class[this.page_style] = true;
    return ret_class;
  }

  get interested_class() {
    let ret = {'opp-interested-button': true};
    if(!this.opps)
    {
    }
    else if(this.opps.isInWishlist)
    {
      ret['interested'] = true;
    }
    else
    {
      ret['not-interested'] = true;
    }
    return ret;
  }

  constructor(private actRoute: ActivatedRoute, private backendService: BackendService, private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(val => {
      this.backendService.getOpps(val['slug']).subscribe(opp => {
        this.opps = opp;
        this.page_style = this.get_page_style[this.opps.domain];
        this.pageStyleService.newEvent(this.page_style);
      })
    });
    /*this.opps = new Opps();
    this.opps.Name_of_Program = "STEP Youth Regional Affairs Dialogue";
    this.opps.Organiser = "Comittee Organis";
    this.opps.domain = "Social Development & Policy";
    this.opps.Type = "Conference";
    this.opps.Location = "Singapore";
    this.opps.Deadline = "12 June 2020";
    this.opps.About = "Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random";

    this.opps.Testimonial = "Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description.Lorem ipsum description blah blah blah random hello description description Lorem Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description.Lorem ipsum description blah blah blah rand. Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description blah blah blah random hello description description Lorem ipsum description.Lorem ipsum description blah blah blah";*/
  }

  interestedClick() {
    if(this.opps)
    { 
      if(this.opps.isInWishlist)
      {
        this.opps.numUsers--;
      }
      else
      {
        this.opps.numUsers++;
        this.backendService.addOppsToWishlist(this.opps.slug).subscribe( ret => {
          console.log('added');
        });
      }
      this.opps.isInWishlist = !this.opps.isInWishlist;
    }

  }

}
