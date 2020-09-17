import { Component, OnInit } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';

@Component({
  selector: 'app-contribute-all',
  templateUrl: './contribute-all.component.html',
  styleUrls: ['./contribute-all.component.scss']
})
export class ContributeAllComponent implements OnInit {

  constructor(private pageStyleService: PageStyleService ) { }

  text = 'While you go about connecting with people and cultivating your interests, we would love for you to make an individual impact on the Project as well! In order to make this project sustainable and more community-driven, we need your full support. After all, we’re nothing without you.\n\nPlease let us know about an opportunity that you think must exist on the platform and isn’t already there, or your experience in the form of a testimonial for an opportunity that you had availed.'

  ngOnInit(): void {
    this.pageStyleService.newEvent('home');
  }

}
