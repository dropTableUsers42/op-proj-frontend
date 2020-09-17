import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WaitlistServiceService {

  private currentStatusSubject: BehaviorSubject<boolean>;
  public currentStatus: Observable<boolean>;

  constructor(private httpClient: HttpClient, ) {
    this.currentStatusSubject = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('currentStatus')));
    this.currentStatus = this.currentStatusSubject.asObservable();

   }

  public get currentStatusValue(): boolean {
    return this.currentStatusSubject.value;
  }

  updateStatus(status: boolean): void {
    localStorage.setItem('currentStatus', JSON.stringify(status));
    this.currentStatusSubject.next(status);
  }

  public sendPrereg(
    name,
    email,
    college,
    collegeName
  ) {

    let body = {
      name: name,
      email: email
    };

    if(college === 'Other')
    {
      body['sendSpecialMail'] = true;
      body['college'] = collegeName;
    }
    else
    {
      body['sendSpecialMail'] = false;
      body['college'] = college;
    }

    this.updateStatus(true);
    return this.httpClient.post('https://op-waitlist.herokuapp.com', body = body).pipe(map(ret => {
      console.log('Receiving');
    }));
  }
}
