import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Opps } from '../_models/opps.model';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { InterestedService } from '../_services/interested.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../_models/user.model';
import { ScrollService } from '../_services/scroll.service';
import { tagsVector } from './tags-vector';

@Component({
  selector: 'app-opp-detail',
  templateUrl: './opp-detail.component.html',
  styleUrls: ['./opp-detail.component.scss', 
          './opp-detail-color.component.scss']
})
export class OppDetailComponent implements OnInit {

  opps: Opps;
  recc_opps: Opps[];

  page_style: string;

  comment_dict = {};

  get_page_style = {
    'Core': 'core',
    'IT': 'it',
    'Consulting': 'consult',
    'Finance': 'fin',
    'Entrepreneurship': 'ent',
    'SocDev-and-Policy': 'socdev'
  }

  spin = false;

  @ViewChild('scrollFrame') scrollFrame: ElementRef;

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

  get interested_number_class() {
    let ret = {'opp-interested-number': true};
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

  get tags_vector(): {} {
    return tagsVector;
  }

  commentForm = new FormGroup({
    data: new FormControl('')
  })

  constructor(private actRoute: ActivatedRoute, private backendService: BackendService, private pageStyleService: PageStyleService, private authService: AuthService, public interestedService: InterestedService, private renderer: Renderer2, private scrollService: ScrollService) { }

  fill_comments() {
    this.comment_dict = {};
    for(let comment of this.opps.comments)
    {
      this.comment_dict[comment._id] = comment;
    }
  }

  havePursued = false;

  ngOnInit(): void {
    this.actRoute.params.subscribe(val => {
      this.recc_opps = [];
      window.scroll(0, 0);
      this.gotoTop();
      this.backendService.getOpps(val['slug']).subscribe(opp => {
        this.havePursued = false;
        this.opps = opp;
        this.page_style = this.get_page_style[this.opps.domain];
        console.log(this.authService.currentUserValue.pursued);

        let pursued = this.authService.currentUserValue.pursued;

        for (let opp of pursued)
        {
          if(opp.slug == this.opps.slug)
          {
            this.havePursued = true;
            break;
          }
        }

        this.pageStyleService.newEvent(this.page_style);

        this.backendService.getReccomendations(this.opps.slug).subscribe(reccs => {
          this.recc_opps = reccs;
        });
        this.fill_comments();
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

  pursue(): void {
    this.havePursued = true;
    this.backendService.addPursued(this.opps.slug).subscribe(opps => {
      this.backendService.getMe();
      let usr = this.authService.currentUserValue;
     });
  }

  gotoTop(): void {

    var scrollElem= document.querySelector('#moveTop');
    scrollElem?.scrollIntoView();
  }

  scrolled() {
    this.scrollService.newEvent(this.scrollFrame.nativeElement.scrollTop == 0);
  }

  interestedClick() {
    this.interestedService.newEvent('detail');
    if(this.opps)
    { 
      if(this.opps.isInWishlist)
      {
        this.backendService.deleteOppsFromWishlist(this.opps.slug).subscribe( ret => {
          console.log('removed');
        });
        this.opps.numUsers--;
      }
      else
      {
        this.backendService.addOppsToWishlist(this.opps.slug).subscribe( ret => {
          console.log('added');
        });
        this.opps.numUsers++;
      }
      this.opps.isInWishlist = !this.opps.isInWishlist;
    }

  }

  domain_type_api = {
    'Core': 'Core',
    'IT': 'IT',
    'Consulting': 'Consulting',
    'Entrepreneurship': 'Entrepreneurship',
    'Finance': 'Finance',
    'SocDev-and-Policy': 'SocDev & Policy',
    null: 'Undefined'
  }

  get location_type() {
    if(this.opps)
    {
      for(var tag of this.opps.tags)
      {
        if(tag.slug == 'international')
        {
          return 'International';
        }
        else if(tag.slug == 'national')
        {
          return 'National';
        }
        else if(tag.slug == 'online')
        {
          return 'Online';
        }
        else if(tag.slug == 'indian')
        {
          return 'National';
        }
      }
      return 'Undefined';
    }
    return 'Undefined';
  }

  submitComment() {
    if (this.spin === false)
    {
      this.spin = true;
      this.backendService.addComment(this.opps.slug, this.commentForm.value.data).subscribe(comment => {
        this.commentForm.patchValue({data: ''});
        comment.user = this.authService.currentUserValue;
        this.opps.comments.push(comment);
        this.fill_comments();
        this.spin = false;
      },
      error => {
        this.spin = false;
      });
    }
  }

  addToReplies(comment) {
    comment.user = this.authService.currentUserValue;
    for(let pcomment of this.opps.comments){
      if(comment.parent == pcomment._id)
      {
        pcomment.children.push(comment._id);
      }
    }
    this.opps.comments.push(comment);
    this.fill_comments();
  }

}
