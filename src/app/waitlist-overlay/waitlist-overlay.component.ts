import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WaitlistServiceService } from '../_services/waitlist-service.service';

@Component({
  selector: 'app-waitlist-overlay',
  templateUrl: './waitlist-overlay.component.html',
  styleUrls: ['./waitlist-overlay.component.scss']
})
export class WaitlistOverlayComponent implements OnInit {

  constructor(private waitlistService: WaitlistServiceService) { }

  @Input('show') show = false;

  @Output() onClose = new EventEmitter<any>();

  collegeNames = [
    'IIT Bombay',
    'BITS Pilani - Pilani Campus',
    'IIT Delhi',
    'IIT Kanpur',
    'IIT Guwahati',
    'IIT Kharagpur',
    'IIT Madras',
    'IIT Roorkee',
    'BITS Pilani - Goa Campus',
    'BITS Pilani - Hyderabad Campus',
    'Other'
  ];

  preregForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',  [Validators.required, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]),
    college: new FormControl('',  Validators.required),
    collegeName: new FormControl('')
  } );

  ngOnInit(): void {
  }

  public close(): void {
    this.onClose.emit();
  }

  stopPropagate(event): void{
    event.stopPropagation();
  }

  submitForm(): void {
    console.log('TODO');
    console.log(this.preregForm.value);
    this.waitlistService.sendPrereg(
      this.preregForm.value.name,
      this.preregForm.value.email,
      this.preregForm.value.college,
      this.preregForm.value.collegeName,
    ).subscribe(ret => {
      console.log('Received');
    });
  }

  get collegeEntered(): string {
    return this.preregForm.value.college;
  }

  get currentStatus(): boolean {
    return this.waitlistService.currentStatusValue;
  }

}
