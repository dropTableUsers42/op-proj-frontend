import { Component, OnInit, Input } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { Router } from '@angular/router';
import { BackendService } from '../_services/backend.service'

@Component({
	selector: 'app-opps-card',
	templateUrl: './opps-card.component.html',
	styleUrls: ['./opps-card.component.css',
				'./opps-card-colors.component.css']
})
export class OppsCardComponent implements OnInit {


@Input('opps') public opportunity: Opps;
@Input('interest') public showInterested: boolean = true;
@Input('type') public cardType: string = 'search';

	constructor(private router: Router, private backendService: BackendService) {
	}

	ngOnInit(): void {
	}

	getMainColor() {
		if(this.opportunity.domain == 'Core')
			return '#05905F';
		else if(this.opportunity.domain == 'IT')
			return '#FF9D63';
	}

	domain_page_style = {
		'Core': 'core',
		'IT': 'it',
		'Consulting': 'consult',
		'Finance': 'fin',
		'Entrepreneurship': 'ent',
		'Socdev & Policy': 'socdev'
	}

	get main_class() {
		let ret={'opps-card': true};
		ret[this.domain_page_style[this.opportunity.domain]] = true;
		ret[this.cardType] = true;
		return ret;
	}

	oppClick() {
		this.router.navigate(['opps', this.opportunity.slug]);
	}

	get interested_icon() {
		if(!this.opportunity.isInWishlist)
		{
			return 'notifications_none';
		}
		else
		{
			return 'notifications_active';
		}
	}

	interested_click(event) {
		event.preventDefault();
    	event.stopPropagation();
		if(!this.opportunity.isInWishlist)
		{
			this.backendService.addOppsToWishlist(this.opportunity.slug).subscribe(ret => {
				console.log('Added opp!');
			})
			this.opportunity.isInWishlist = true;
		}
		else
		{
			this.backendService.deleteOppsFromWishlist(this.opportunity.slug).subscribe(ret => {
				console.log('Deleted opp!');
			})
			this.opportunity.isInWishlist = false;
		}
	}
}
