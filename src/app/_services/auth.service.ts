import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(id, token) {
    let user = new User();
    user.token = token;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return this.http.get<User>('https://the-op.herokuapp.com/user/'.concat(id))
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            user = user['user'];
            user.token = token;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUser(user: User) {
    let token = this.currentUserSubject.value.token;

    user.token = token;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  sendOtp(id) {
    return this.http.post("https://the-op.herokuapp.com/login/otp", {"identifier": id});
  }

  loginOtp(id, otp) {
    return this.http.post<User>("https://the-op.herokuapp.com/login", {"identifier": id, "otp": otp})
          .pipe(map(user => {
              let token = user['token'];
              user = user['user'];
              user.token = token;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }
}
