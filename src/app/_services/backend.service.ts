import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public getUser(username) : Observable<User>{
    return this.httpClient.get<User>("https://the-op.herokuapp.com/user/".concat(username)).pipe(map((user) => user['user']));
  }

  public patchUser(user: User): Observable<User>{
    return this.httpClient.patch<User>("https://the-op.herokuapp.com/me/profile", user)
      .pipe(map(
        (user) => {
          this.authService.updateUser(user['user']);
          return user['user'];
        }
      ));
  }

  public getWishlist(): Observable<Opps[]>{
    return this.httpClient.get<Opps[]>("https://the-op.herokuapp.com/me/wishlist")
      .pipe(map((opps) => opps['opportunities']));
  }

  public getOpps(searchstring): Observable<Opps[]> {

    let params = new HttpParams().set("name",searchstring);
    console.log(params);

    return this.httpClient.get<Opps[]>("https://the-op.herokuapp.com/opportunity/search", {params:params});
  }
}