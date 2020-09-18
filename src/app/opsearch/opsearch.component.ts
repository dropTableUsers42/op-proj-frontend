import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, DoCheck } from '@angular/core';
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

import { tags, months, regions, funding, colleges, years } from './tags-vector';


@Component({
    selector: 'app-opsearch',
    templateUrl: './opsearch.component.html',
    styleUrls: ['./opsearch.component.scss',
                './opsearch-colors.component.scss'],
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
                transform: 'translateY(-{{translate}}px)'
            }), {params: {translate: 67}}),
            transition('* => *', [
                animate('0.2s ease-in-out')
            ]),
        ]),
    ],
})
export class OpsearchComponent implements OnInit, DoCheck {

    pageStyle: string;

    searchForm = new FormGroup({
        searchstring: new FormControl(''),
        searchtype: new FormControl('Opps')
    });

    searchTypes = [
        'Opps',
        'People',
    ];

    oppsFilterForm = new FormGroup({
        type: new FormControl(''),
        date: new FormControl(''),
        region: new FormControl(''),
        funding: new FormControl('')
    });

    userFilterForm = new FormGroup({
        college: new FormControl(''),
        year: new FormControl('')
    });

    spin = false;

    public opportunityList: Opps[] = [];
    public userList: User[] = [];
    public domain: string;
    public searchstring;

    public domain_links = {
        'core': 'Core',
        'it': 'IT',
        'consult': 'Consulting',
        'ent': 'Entrepreneurship',
        'fin': 'Finance',
        'socdev': 'SocDev & Policy'
    };

    public domain_tags = {
        'core': 'Core',
        'it': 'IT',
        'consult': 'Consulting',
        'ent': 'Entrepreneurship',
        'fin': 'Finance',
        'socdev': 'SocDev-and-Policy'
    };

    public domain_tag: string;

    public get_page_style = {
        'Core': 'core',
        'IT': 'it',
        'Consulting': 'consult',
        'Entrepreneurship': 'ent',
        'Finance': 'fin',
        'SocDev-and-Policy': 'socdev' 
    };

    stopPropagate(event): void {
        event.stopPropagation();
    }

    isOverlayOpen = false;

    @ViewChild('scrollFrame') scrollFrame: ElementRef;
    @ViewChild('shadowContainer') shadowContainer: ElementRef;
    @ViewChild('domainContainer') domainContainer: ElementRef;
    public isScrolledToTop = true;
    public scrollContainerHeight = 0;
    public domainTranslate = 0;
    public frameFinalHeight = 0;
    public isMobile = false;

    ngDoCheck(): void {
        this.isMobile = window.innerWidth <= 600;
        this.domainTranslate = this.domainContainer?.nativeElement.offsetTop - 5;
        this.frameFinalHeight = this.domainContainer?.nativeElement.offsetHeight + this.shadowContainer?.nativeElement.offsetHeight;
        this.frameFinalHeight = window.innerHeight - this.frameFinalHeight;
        if (this.scrollFrame) {

            this.isScrolledToTop = this.scrollFrame.nativeElement.scrollTop === 0;
            this.scrollService.newEvent(this.isScrolledToTop);

            if (!this.isScrolledToTop)
            {
                this.scrollContainerHeight = this.frameFinalHeight;
            }
            else
            {
                this.scrollContainerHeight = this.frameFinalHeight - this.domainTranslate - 5 * (this.isMobile ? 0 : 1);
            }

            this.renderer.setStyle(this.scrollFrame.nativeElement, 'height', this.scrollContainerHeight.toString().concat('px'));
        }
    }

    scrolled(): void {
    }

    constructor(private router: Router,
                private renderer: Renderer2,
                private actRoute: ActivatedRoute,
                private backendService: BackendService,
                private scrollService: ScrollService,
                private authService: AuthService,
                private pageStyleService: PageStyleService) {}

    get list_class(): {} {
        if (this.searchForm.value.searchtype === 'Opps')
        {
            return 'opps-list';
        }
        else
        {
            return 'user-list';
        }
    }

    get page_class(): {} {
        const retClass = {'page-container': true};
        retClass[this.pageStyle] = true;
        return retClass;
    }

    get tags_vector(): {} {
        return tags;
    }

    get months_vector(): {} {
        return months;
    }

    get regions_vector(): {} {
        return regions;
    }

    get funding_vector(): {} {
        return funding;
    }

    get college_vector(): {} {
        return colleges;
    }

    get year_vector(): {} {
        return years;
    }

    first = true;

    ngOnInit(): void {
        this.actRoute.params.subscribe((val => {
            if(!(val.domain in this.domain_links))
            {
                this.router.navigate(['']);
            }
            else
            {
                if(!this.first)
                {
                    location.reload();
                }
                this.first = false;
                this.oppsFilterForm.setValue({
                    type: '',
                    date: '',
                    region: '',
                    funding: ''
                });
                this.userList = [];
                this.opportunityList = [];
                this.domain = this.domain_links[val.domain];
                this.domain_tag = this.domain_tags[val.domain];
                this.pageStyle = val.domain;
                this.searchForm.patchValue({searchstring: ''});
                this.searchSpecific();
                this.pageStyleService.newEvent(this.pageStyle);
            }
        }));

        this.scrollService.newEvent(this.isScrolledToTop);
        this.scrollContainerHeight = window.innerHeight - 246;

        this.searchForm.get('searchtype').valueChanges.subscribe(val => {
            this.searchForm.patchValue({searchstring: ''});
            this.searchSpecific();
        });

        this.oppsFilterForm.valueChanges.subscribe(val => {
            this.searchSpecific();
        });

        this.userFilterForm.valueChanges.subscribe(val => {
            this.searchSpecific();
        });
    }

    search(): void {
        this.searchSpecific();
    }

    searchSpecific(): void {
        this.spin = true;
        if (this.searchForm.value.searchtype == 'Opps')
        {
            let tags = '';

            if (this.oppsFilterForm.value.type !== '' && this.oppsFilterForm.value.type != undefined)
            {
                tags += ' ' + this.oppsFilterForm.value.type;
            }
            if (this.oppsFilterForm.value.date !== '' && this.oppsFilterForm.value.date != undefined)
            {
                tags += ' ' + this.oppsFilterForm.value.date;
            }
            if (this.oppsFilterForm.value.region !== '' && this.oppsFilterForm.value.region != undefined)
            {
                tags += ' ' + this.oppsFilterForm.value.region;
            }
            if (this.oppsFilterForm.value.funding !== '' && this.oppsFilterForm.value.funding != undefined)
            {
                tags += ' ' + this.oppsFilterForm.value.funding;
            }

            if(tags === '')
            {
                tags = null;
            }

            let searchstring = '';
            if(this.searchForm.value.searchstring === '')
            {
                searchstring = ' ';
            }
            else
            {
                searchstring = this.searchForm.value.searchstring;
            }

            this.backendService.searchOpps(searchstring, this.domain_tag, tags).subscribe(list => {
                this.opportunityList = list;
                this.spin = false;
            });
        }
        else {

            let college = '';
            if (this.userFilterForm.value.college !== '' && this.userFilterForm.value.college != undefined)
            {
                college = this.userFilterForm.value.college;
            }
            else
            {
                college = null;
            }

            let year = '';
            if (this.userFilterForm.value.year !== '' && this.userFilterForm.value.year != undefined)
            {
                year = this.userFilterForm.value.year;
            }
            else
            {
                year = null;
            }

            let searchstring = '';
            if(this.searchForm.value.searchstring === '')
            {
                searchstring = ' ';
            }
            else
            {
                searchstring = this.searchForm.value.searchstring;
            }

            this.backendService.searchUser(searchstring, year, college).subscribe(list => {
                console.log(this.userFilterForm.value);
                this.userList = list;
                this.spin = false;
            });
        }
    }

}
