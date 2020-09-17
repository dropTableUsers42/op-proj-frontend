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
          image: '/assets/team/Cherub.png',
          linkedin: '',
          insta: '',
        },
        {
          name: 'Rahul Sunder',
          image: '/assets/team/RahulS.png',
          linkedin: '',
          insta: '',
        }
      ],
    'Core Team': [
      {
        name: 'Hrishikesh Baviskar',
        image: '/assets/team/Baviskar.png',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Neelanchal Joshi',
        image: '/assets/team/Neelanchal.png',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Mainak Mandal',
        image: '/assets/team/Mainak.png',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Rahul Kumar',
        image: '/assets/team/RahulK.png',
        linkedin: '',
        insta: '',
      }
    ],
    'Product Developers': [
      {
        name: 'Rwitaban Goswami',
        image: '/assets/team/Rwitaban.png',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Nimish Lakhotia',
        image: '/assets/team/Nimish.png',
        linkedin: '',
        insta: '',
      },
      {
        name: 'Pratham Gupta',
        image: '/assets/team/Pratham.png',
        linkedin: '',
        insta: '',
      },
    ],
  };

  public team1 = [
    'Vasu Swaroop',
    'Yatin Jindal',
    'Yash Pathak',
    'Tulip Pandey',
    'Shubham Kumar',
    'Sushant Gupta',
    'Dishank Jindal',
    'Aryan Verma',
    'Arnev Garg',
    'Parag Panigrahi'
  ];

  constructor(private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.pageStyleService.newEvent('home');
  }

}
