import { Component, OnInit } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public aboutContent = 'Hello! We are a team of students from IIT Bombay and BITS Pilani, out to solve a critical problem that we have faced. Everyone dreams of learning and pursuing multiple opportunities outside their campuses while cultivating their interests, after entering college. However, most remain limited by the bubble of their choice of peers, constraints in ideas, and trying to find their needle-like calling in the vast haystack-like Internet. And thus was born the drive to create The Opportunity Project, something which would chip away at this problem.\n\nProviding access to opportunities all across the globe across six diverse domains, The Opportunity Project aims to eliminate the problem of the bubble which holds in our true potential. We aim to bridge the experiential learning gap and build an exclusive community of like-minded people with the purpose of learning, growing together, and exploring the world.';

  public team = {
    'Co-Founders': [
        {
          name: 'Cherub Kapoor',
          image: '/assets/images/placeholder.jpg',
          linkedin: '',
          insta: '',
        },
        {
          name: 'Rahul Sunder',
          image: '/assets/images/placeholder.jpg',
          linkedin: '',
          insta: '',
        }
      ],
    'Product Curators': [
      {
        name: 'Hrishikesh Baviskar',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Neelanchal Joshi',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Mainak Mandal',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Rahul Kumar',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      }
    ],
    'Product Developers': [
      {
        name: 'Rwitaban Goswami',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Nimish Lakhotia',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Pratham Gupta',
        image: '/assets/images/placeholder.jpg',
        linkedin: '',
        insta: '',
      },
    ]
  };

  constructor(private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.pageStyleService.newEvent('home');
  }

}
