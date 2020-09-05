import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user.model';
import { Opps, Comment } from '../_models/opps.model';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public getUser(username) : Observable<User>{
    return this.httpClient.get<User>("https://the-op.herokuapp.com/user/".concat(username)).pipe(map((user) => {
      user = user['user'];
      user.college = user['college']['type'];
      return user;
    }));
  }

  public patchUser(user: User): Observable<User>{
    let usr = user;
    return this.httpClient.patch<User>("https://the-op.herokuapp.com/me/profile", usr)
      .pipe(map(
        (user) => {
          user = user['user'];
          user.college = user['college']['type'];
          this.authService.updateUser(user);
          return user;
        }
      ));
  }

  public getMe(): Observable<User>{
    return this.httpClient.get<User>("https://the-op.herokuapp.com/me").pipe(map(
      (user) => {
        user = user['user'];
        user.college = user['college']['type'];
        this.authService.updateUser(user);
        return user;
      }
    ))
  }

  public getMyWishlist(): Observable<Opps[]>{
    return this.httpClient.get<Opps[]>("https://the-op.herokuapp.com/me/wishlist")
      .pipe(map((opps) => {
        opps = opps['wishlist']['opportunities'];
        opps.map(opp => {
          opp.domain = opp['domain']['type'];
        })
        return opps;
      }));
  }

  public searchOpps(searchstring, domain = null): Observable<Opps[]> {

    let params = new HttpParams().set("name",searchstring);
    if(domain !== undefined && domain != null)
    {
      params = params.append("domain", domain);
    }

    return this.httpClient.get<Opps[]>("https://the-op.herokuapp.com/opportunity/search", {params:params}).pipe(map(item => {
      for(var opp of item)
      {
        opp.domain = opp['domain']['type'];
      }
      return item;
    }));
  }

  public follow(username) {
    return this.httpClient.post("https://the-op.herokuapp.com/me/follow", {"username": username});
  }

  public unfollow(username) {
    return this.httpClient.post("https://the-op.herokuapp.com/me/unfollow", {"username": username});
  }

  public searchUser(searchstring) : Observable<User[]> {
    let params = new HttpParams().set("name", searchstring);
    return this.httpClient.get<User[]>("https://the-op.herokuapp.com/user/search", {params: params}).pipe(map(item => {
      for(var user of item)
      {
        user.college = user['college']['type'];
      }
      return item;
    }));
  }

  public getOpps(slug) : Observable<Opps> {
    return this.httpClient.get<Opps>("https://the-op.herokuapp.com/opportunity/".concat(slug)).pipe(map(item => {
      item.domain = item['domain']['type'];
      item.About = item['Description'];
      item.Deadline_Comp = item['Time_Registration'];
      item.Deadline_Reg = item['Time_Competition'];
      item.Site = item['Link'];
      return item;
    }));
  }

  public addOppsToWishlist(slug) : Observable<Opps[]> {
    let body = {'opportunity': slug};
    return this.httpClient.post<Opps[]>("https://the-op.herokuapp.com/me/wishlist", body=body);
  }

  public deleteOppsFromWishlist(slug) : Observable<Opps[]> {
    return this.httpClient.delete<Opps[]>("https://the-op.herokuapp.com/me/wishlist/".concat(slug));
  }

  public addComment(oppSlug, data, parent=null) : Observable<Comment> {
    let body = {'data': data};
    if(parent != null)
    {
      body['parent'] = parent;
    }
    return this.httpClient.post<Comment>("https://the-op.herokuapp.com/opportunity/".concat(oppSlug).concat("/comment"), body=body);
  }

  public getReccomendations(slug) : Observable<Opps[]> {
    return this.httpClient.get<Opps[]>("https://the-op.herokuapp.com/opportunity/".concat(slug).concat("/recommendations")).pipe(map(
      opps => {
        opps.map(opp => {
          opp.domain = opp['domain']['type'];
        });
        return opps;
      }
    ));
  }

}