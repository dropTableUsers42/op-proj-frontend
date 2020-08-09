import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../_services/backend.service';
import { ScrollService } from '../_services/scroll.service';
import {
	trigger,
	state,
	style,
	animate,
	transition,
} from '@angular/animations';


@Component({
	selector: 'app-opsearch',
	templateUrl: './opsearch.component.html',
	styleUrls: ['./opsearch.component.css',
							'./opsearch-colors.component.css'],
	animations: [
		trigger('shadowTrigger', [
			state('hasShadow', style({
				boxShadow: '3px 6px 10px -4px rgba(0, 0, 0, 0.3)'
			})),
			state('hasNoShadow', style({
				boxShadow: 'none'
			})),
			transition('* => *', [
				animate('0.2s ease-in-out')
			]),
		]),
		trigger('domainTransform', [
			state('default', style({
				transform: 'none'
			})),
			state('transform', style({
				transform: 'translateY(-79px)'
			})),
			transition('* => *', [
				animate('0.2s ease-in-out')
			]),
		]),
	],
})
export class OpsearchComponent implements OnInit, AfterViewInit {

	@ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
	private scrollContainer: any;
	public isScrolledToTop: boolean = true;
	public scrollContainerHeight: number = 0;

	ngAfterViewInit() {
		this.scrollContainer = this.scrollFrame.nativeElement;
		this.isScrolledToTop = this.scrollContainer.scrollTop == 0;

		this.scrollContainer.style.height = '{$h}px';

	}

	scrolled(event: any) {
		this.isScrolledToTop = this.scrollContainer.scrollTop == 0;
		this.scrollService.newEvent(this.isScrolledToTop);
		let h: number;
		if(!this.isScrolledToTop)
		{
			this.scrollContainerHeight = this.scrollContainer.offsetHeight + 79;
		}
		else
		{
			this.scrollContainerHeight = window.innerHeight - 190;
		}
		this.scrollContainer.style.height = '{$h}px';

	}

	search_types = [
		{ id: 1, name: "Opps" },
		{ id: 2, name: "People" }, 
	]
	search_type = this.search_types[0].id.toString();

	public opportunity_list: Opps[] = [];
	public domain: string;
	public searchstring;

	public domain_links = {
		'core': 'Core',
		'it': 'Information Technology',
		'consulting': 'Consulting',
		'ent': 'Entrepreneurship',
		'fin': 'Finance',
		'socpol': 'Socdev & Policy'
	}

	constructor(private router: Router, private actRoute: ActivatedRoute, private backendService: BackendService, private scrollService: ScrollService) {
	}

	ngOnInit(): void {
		this.actRoute.params.subscribe((val => {
			if(!(val.domain in this.domain_links))
			{
				this.router.navigate(['']);
			}
			else
			{
				this.domain = this.domain_links[val.domain];
			}
		}));

		this.scrollService.newEvent(this.isScrolledToTop);
		this.scrollContainerHeight = window.innerHeight - 257;

		this.opportunity_list.push(new Opps());
		this.opportunity_list[0].domain = 'Core';
		this.opportunity_list[0].Deadline = '1 Week';
		this.opportunity_list[0].Location = 'Singapore';
		this.opportunity_list[0].Name_of_Program = 'STEP Youth Regional Affairs Dialogue';
		this.opportunity_list[0].Organiser = 'Commitee Organis';
		this.opportunity_list[0].Type = 'CONFERENCE';
	}

	search(form) {
		this.backendService.getOpps(form.value.searchstring)
			.subscribe((opps => {
				this.opportunity_list = opps;
			}));
	}

}
