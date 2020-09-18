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
          linkedin: 'https://www.linkedin.com/in/cherub-kapoor-290219146/',
          insta: 'https://www.instagram.com/cherubkapoor/',
          college: 'IIT Bombay'
        },
        {
          name: 'Rahul Sunder',
          image: '/assets/team/RahulS.png',
          linkedin: 'https://www.linkedin.com/in/sunderrahul',
          insta: 'https://www.instagram.com/rahulsunder/',
          college: 'BITS Pilani - Pilani'
        }
      ],
    'Core Team': [
      {
        name: 'Hrishikesh Baviskar',
        image: '/assets/team/Baviskar.png',
        linkedin: 'https://www.linkedin.com/in/hrishikesh-baviskar-0b039b176/',
        insta: 'https://www.instagram.com/hrishikesh_baviskar/',
        college: 'IIT Bombay'
      },
      {
        name: 'Neelanchal Joshi',
        image: '/assets/team/Neelanchal.png',
        linkedin: 'https://www.linkedin.com/in/neelanchal-joshi/',
        insta: 'https://www.instagram.com/neelanchaljoshi/',
        college: 'BITS Pilani - Pilani'
      },
      {
        name: 'Mainak Mandal',
        image: '/assets/team/Mainak.png',
        linkedin: 'https://www.linkedin.com/in/i-am-mainak-mandal/',
        insta: 'https://www.instagram.com/mainak_mandal/',
        college: 'BITS Pilani - Pilani'
      },
      {
        name: 'Rahul Kumar',
        image: '/assets/team/RahulK.png',
        linkedin: 'https://www.linkedin.com/in/rahul-kumar-431b31199',
        insta: 'https://www.instagram.com/rahu1kumar/',
        college: 'BITS Pilani - Goa'
      }
    ],
    'Product Developers': [
      {
        name: 'Rwitaban Goswami',
        image: '/assets/team/Rwitaban.png',
        linkedin: 'https://www.linkedin.com/in/rwitaban-goswami-7a9481167/',
        insta: 'https://www.instagram.com/dilli._se_hu_bc/',
        college: 'IIT Bombay'
      },
      {
        name: 'Nimish Lakhotia',
        image: '/assets/team/Nimish.png',
        linkedin: 'https://www.linkedin.com/in/nimish-l-b2785210a/',
        insta: 'https://www.instagram.com/nimish_c137/',
        college: 'IIT Bombay'
      },
      {
        name: 'Pratham Gupta',
        image: '/assets/team/Pratham.png',
        linkedin: 'https://www.linkedin.com/in/pratham-gupta-699a2b197',
        insta: 'https://www.instagram.com/pratham1002/',
        college: 'BITS Pilani - Pilani'
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
