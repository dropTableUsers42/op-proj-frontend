import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Opps } from '../_models/opps.model';
import { User } from '../_models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../_services/backend.service';
import { ScrollService } from '../_services/scroll.service';
import { PageStyleService } from '../_services/page-style.service'
import { AuthService } from '../_services/auth.service';
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

	searchForm = new FormGroup({
		searchstring: new FormControl(''),
		searchtype: new FormControl('Opps')
	})

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
	public user_list: User[] = [];
	public domain: string;
	public searchstring;

	public domain_links = {
		'core': 'Core',
		'it': 'IT',
		'consult': 'Consulting',
		'ent': 'Entrepreneurship',
		'fin': 'Finance',
		'socdev': 'SocDev-and-Policy'
	}

	public domain_tags = {
		'core': 'Core',
		'it': 'IT',
		'consult': 'Consulting',
		'ent': 'Entrepreneurship',
		'fin': 'Finance',
		'socdev': 'SocDev-and-Policy'
	}

	public domain_tag: string;

	public get_page_style = {
		'Core': 'core',
		'IT': 'it',
		'Consulting': 'consult',
		'Entrepreneurship': 'ent',
		'Finance': 'fin',
		'SocDev-and-Policy': 'socdev' 
	}

	get list_class() {
		if(this.searchForm.value['searchtype'] == 'Opps')
		{
			return 'opps-list';
		}
		else
		{
			return 'user-list';
		}
	}

	page_style: string;

	constructor(private router: Router, private actRoute: ActivatedRoute, private backendService: BackendService, private scrollService: ScrollService, private authService: AuthService, private pageStyleService: PageStyleService) {
	}

	get page_class() {
		let ret_class = {'page-container': true};
		ret_class[this.page_style] = true;
		return ret_class;
	}

	get domain_title_class() {
		let ret_class = {'domain': true};
		ret_class[this.page_style] = true;
		return ret_class;
	}

	get search_icon_class() {
		let ret_class = {'search-icon': true};
		ret_class[this.page_style] = true;
		return ret_class;
	}

	get search_input_class() {
		let ret_class = {'search-input': true};
		ret_class[this.page_style] = true;
		return ret_class;
	}

	ngOnInit(): void {
		this.actRoute.params.subscribe((val => {
			if(!(val.domain in this.domain_links))
			{
				this.router.navigate(['']);
			}
			else
			{
				this.user_list = [];
				this.opportunity_list = [];
				this.domain = this.domain_links[val.domain];
				this.domain_tag = this.domain_tags[val.domain];
				this.page_style = val.domain;
				this.searchForm.patchValue({'searchstring': ''});
				this.searchSpecific();
				this.pageStyleService.newEvent(this.page_style);
			}
		}));

		this.scrollService.newEvent(this.isScrolledToTop);
		this.scrollContainerHeight = window.innerHeight - 257;

		this.searchForm.get('searchtype').valueChanges.subscribe(val => {
			this.searchForm.patchValue({'searchstring': ''});
			this.searchSpecific();
		});
		
	}

	search() {
		this.searchSpecific();
	}

	searchSpecific() {
		if(this.searchForm.value.searchtype == 'Opps')
		{
			this.backendService.searchOpps(this.searchForm.value.searchstring, this.domain_tag).subscribe(list => {
				this.opportunity_list = list;
			})
		}
		else {
			this.backendService.searchUser(this.searchForm.value.searchstring).subscribe(list => {
				this.user_list = list;
			})
		}
	}

}
