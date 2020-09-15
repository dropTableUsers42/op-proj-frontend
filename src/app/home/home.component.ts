import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { tags, months, regions, funding, domains } from '../opsearch/tags-vector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',
              './home-colors.component.scss'],
  animations: [
    trigger('shadowTrigger', [
            state ('hasShadow', style({
                boxShadow: '3px 6px 10px -4px rgba(0, 0, 0, 0.3)'
            })),
            state('hasNoShadow', style({
                boxShadow: 'none'
            })),
            transition ('* => *', [
                animate('0.2s ease-in-out')
            ]),
        ]),
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, DoCheck {

  title = 'THE OPPORTUNITY PROJECT.';

  searchForm = new FormGroup({
        searchstring: new FormControl (''),
        searchtype: new FormControl('Opps')
    });

    oppsFilterForm = new FormGroup({
        domain: new FormControl(''),
        type: new FormControl(''),
        date: new FormControl(''),
        region: new FormControl(''),
        funding: new FormControl('')
    });

  search_types = [
        { id: 1, name: "Opps" },
        { id: 2, name: "People" }, 
  ]
  
  spin: boolean;

  isMobile: boolean;

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

    get domains_vector(): {} {
        return domains;
    }

  constructor(private pageStyleService: PageStyleService, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit(): void {

    this.spin = false;
    this.pageStyleService.newEvent('home');

    this.user_list = [];
        this.opportunity_list = [];
    this.searchForm.patchValue({'searchstring': ''});
    this.searchSpecific();
    
    this.searchForm.get('searchtype').valueChanges.subscribe(val => {
            this.searchForm.patchValue({'searchstring': ''});
            this.searchSpecific();
    });

    this.oppsFilterForm.valueChanges.subscribe(val => {
        console.log(this.oppsFilterForm.value);
        this.searchSpecific();
    });
  }

  get getHeight(): number {
    return window.innerHeight;
  }

  ngDoCheck(): void {
    this.isMobile = window.innerWidth <= 600;
  }

  public opportunity_list: Opps[] = [];
    public user_list: User[] = [];

  get domain_title_class() {
        let ret_class = {'domain': true};
        ret_class['it'] = true;
        return ret_class;
    }

    get search_icon_class() {
        let ret_class = {'search-icon': true};
        ret_class['it'] = true;
        return ret_class;
    }

    get search_input_class() {
        let ret_class = {'search-input': true};
        ret_class['it'] = true;
        return ret_class;
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
  
  search() {
        this.searchSpecific();
    }

    searchSpecific(): void {
    this.spin = true;
    if(this.searchForm.value.searchtype == 'Opps')
    {
        let tags = '';

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

        let domain = '';
        if (this.oppsFilterForm.value.domain !== '' && this.oppsFilterForm.value.domain  != undefined)
        {
            domain = this.oppsFilterForm.value.domain;
        }
        else
        {
            domain = null;
        }

        console.log(tags);
        this.backendService.searchOpps(this.searchForm.value.searchstring, domain, tags).subscribe(list => {
            this.opportunity_list = list;
            this.spin = false;
        })
    }
    else {
        this.backendService.searchUser(this.searchForm.value.searchstring).subscribe(list => {
    this.user_list = list;
    this.spin = false;
        })
    }
  }

  @ViewChild ('scrollFrame', {static: false}) scrollFrame: ElementRef;
  private scrollContainer: any;
  isScrolledToTop: boolean = true;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.isScrolledToTop = this.scrollContainer.scrollTop == 0;
  }
  
  scrolled() {
        this.isScrolledToTop = this.scrollContainer.scrollTop == 0;
    }

}
