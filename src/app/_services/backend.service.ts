import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user.model';
import { Opps, Comment } from '../_models/opps.model';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { apiUrl } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public getUser(username) : Observable<User>{
    return this.httpClient.get<User>(apiUrl.concat("/user/").concat(username)).pipe(map((user) => {
      user = user['user'];
      user.college = user['college']['type'];
      return user;
    }));
  }

  public patchUser(user: User): Observable<User>{
    let usr = user;
    return this.httpClient.patch<User>(apiUrl.concat("/me/profile"), usr)
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
    return this.httpClient.get<User>(apiUrl.concat("/me")).pipe(map(
      (user) => {
        user = user['user'];
        user.college = user['college']['type'];
        this.authService.updateUser(user);
        return user;
      }
    ))
  }

  public getMyWishlist(): Observable<Opps[]>{
    return this.httpClient.get<Opps[]>(apiUrl.concat("/me/wishlist"))
      .pipe(map((opps) => {
        opps = opps['wishlist']['opportunities'];
        opps.map(opp => {
          opp.domain = opp['domain']['type'];
        })
        return opps;
      }));
  }

  public addPursued(slug: string): Observable<Opps[]> {
    return this.httpClient.post<Opps[]>(apiUrl.concat("/me/pursued"), {"opportunity": slug}).pipe(map(
      opps => {
        return opps['opportunities'];
      }
    ));
  }

  public searchOpps(searchstring, domain = null, tags = null): Observable<Opps[]> {

    let params = new HttpParams();
    if (searchstring != '')
    {
      params = params.append('name', searchstring);
    }
    if(domain !== undefined && domain != null)
    {
      params = params.append("domain", domain);
    }

    if(tags !== undefined && tags != null)
    {
      params = params.append("tags", tags);
    }

    return this.httpClient.get<Opps[]>(apiUrl.concat("/opportunity/search"), {params:params}).pipe(map(item => {
      for(var opp of item)
      {
        opp.domain = opp['domain']['type'];
        opp.Deadline_Comp = opp['Time_Registration'];
        opp.Deadline_Reg = opp['Time_Competition'];
      }
      return item;
    }));
  }

  public follow(username) : Observable<User[]>{
    return this.httpClient.post<User[]>(apiUrl.concat("/me/follow"), {"username": username});
  }

  public unfollow(username) : Observable<User[]>{
    return this.httpClient.post<User[]>(apiUrl.concat("/me/unfollow"), {"username": username});
  }

  public searchUser(searchstring, year = null, college = null) : Observable<User[]> {
    let params = new HttpParams().set("name", searchstring);

    if(year !== undefined && year!= null)
    {
      params = params.append('year', year);
    }

    if(college !== undefined && college != null)
    {
      params = params.append('college', college);
    }

    return this.httpClient.get<User[]>(apiUrl.concat("/user/search"), {params: params}).pipe(map(item => {
      for(var user of item)
      {
        user.college = user['college']['type'];
      }
      return item;
    }));
  }

  public getOpps(slug) : Observable<Opps> {
    return this.httpClient.get<Opps>(apiUrl.concat("/opportunity/").concat(slug)).pipe(map(item => {
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
    return this.httpClient.post<Opps[]>(apiUrl.concat("/me/wishlist"), body=body);
  }

  public deleteOppsFromWishlist(slug) : Observable<Opps[]> {
    return this.httpClient.delete<Opps[]>(apiUrl.concat("/me/wishlist/").concat(slug));
  }

  public addComment(oppSlug, data, parent=null) : Observable<Comment> {
    let body = {'data': data};
    if(parent != null)
    {
      body['parent'] = parent;
    }
    return this.httpClient.post<Comment>(apiUrl.concat("/opportunity/").concat(oppSlug).concat("/comment"), body=body);
  }

  public getReccomendations(slug) : Observable<Opps[]> {
    return this.httpClient.get<Opps[]>(apiUrl.concat("/opportunity/").concat(slug).concat("/recommendations")).pipe(map(
      opps => {
        opps.map(opp => {
          opp.domain = opp['domain']['type'];
        });
        return opps;
      }
    ));
  }

  public addDomainPref(domainBody) : Observable<User> {
    console.log(domainBody);
    return this.httpClient.post<User>(apiUrl.concat("/me/domains/"), {"domains": domainBody}).pipe(map(user => {
      user = user['user'];
      user.college = user['college']['type'];
      user.domains = domainBody;
      this.authService.updateUser(user);
      return user;
    }));
  }

  public postAvatar(style, color) : Observable<User> {

    let body = {
      picture : {
        style: style,
        colour: color,
      }
    };

    return this.httpClient.patch<User>(apiUrl.concat('/me/profile'), body).pipe(map(user => {
      user = user['user'];
      user.college = user['college']['type'];
      this.authService.updateUser(user);
      return user;
    }));
  }

}