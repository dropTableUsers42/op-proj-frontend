import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CountdownPipe } from '../_pipes/countdown.pipe';
import { Opps } from '../_models/opps.model';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  ops = "chjbkdsghbvksdcnbadvjkdnvkjdnvjkacklamlkacklamlkacklamlklamlkbgklamlkacklamlklamlkvlklamlkvggamlkvlklamlkvdddgdfg";

  user: User;

  profileForm  = new FormGroup({
    name: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, isIntegerValidator]),
    branch: new FormControl('', [Validators.required, containsNumberValidator]),
    bio: new FormControl(''),
    domainForm: new FormGroup({
      domains: new FormControl([])
    })
  });

  spin = false;

  /*listOpps: Opps[] = [];
  pursuedForm = new FormGroup({
    pursuedMultiCtrl: new FormControl([]),
    pursuedFilterCtrl: new FormControl(''),
  });
  public filteredOppsMulti: ReplaySubject<Opps[]> = new ReplaySubject<Opps[]>(1);*/

  constructor(private backendService: BackendService,
              private router: Router, private authService: AuthService,
              private pageStyleService: PageStyleService) {
    this.pageStyleService.newEvent('home');
  }

  domain_prefs_api = {
    'Core': 'core',
    'IT': 'it',
    'Consulting': 'consult',
    'Entrepreneurship': 'ent',
    'Finance': 'fin',
    'SocDev-and-Policy': 'socdev',
  }

  //@ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  //protected _onDestroy = new Subject<void>();

  get width(): number {
    return window.innerWidth;
  }

  dpOverlayShow = false;

  ngOnInit(): void {

    /*this.backendService.searchOpps('').subscribe(ret => {
      this.listOpps = ret;
      console.log('done');
    });*/

    /*this.filteredOppsMulti.next(this.listOpps.slice());

    this.pursuedForm.get('pursuedFilterCtrl').valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOppsMulti();
      });
    */
    this.user = this.authService.currentUserValue;
    //let temp = this.user.pursued.map(opp => opp.slug);
    //console.log(temp);
    //this.pursuedForm.get('pursuedMultiCtrl').setValue(this.user.pursued);
    this.profileForm.patchValue({
      name: this.user.name,
      college: this.user.college,
      year: this.user.year,
      branch: this.user.branch,
      bio: this.user.bio,
    });
    let domain_prefs = [];
    for(let domain in this.user.domains)
    {
      if(this.user.domains[domain])
      {
        domain_prefs.push(this.domain_prefs_api[domain]);
      }
    }
    this.profileForm.patchValue({
      domainForm: {domains: domain_prefs}
    });
  }

  ngAfterViewInit(): void {
    //this.setInitialValue();
  }

  ngOnDestroy(): void {
    //this._onDestroy.next();
    //this._onDestroy.complete();
  }
/*
  protected setInitialValue(): void {
    this.filteredOppsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Opps, b: Opps) => a && b && a.slug === b.slug;
      });
  }

  protected filterOppsMulti(): void {
    if (!this.listOpps) {
      return;
    }
    // get the search keyword
    let search = this.pursuedForm.get('pursuedFilterCtrl').value;
    if (!search) {
      this.filteredOppsMulti.next(this.listOpps.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOppsMulti.next(
      this.listOpps.filter(opp=> opp.Name_of_Program.toLowerCase().indexOf(search) > -1)
    );
  }
*/
  onSubmit() {
    this.spin = true;
    let domainBody = this.domain_prefs_api;
    for(let domain in this.domain_prefs_api)
    {
      if(this.profileForm.value.domainForm.domains.includes(this.domain_prefs_api[domain]))
      {
        domainBody[domain] = true;
      }
      else
      {
        domainBody[domain] = false;
      }
    }
    delete this.profileForm.value.domainForm;
    let first = this.user.hasCompletedRegistration == false;
    this.backendService.patchUser(this.profileForm.value).subscribe((user: User)=>{
      this.user = user;
      this.backendService.addDomainPref(domainBody).subscribe((user: User) => {
        this.user = user;
        this.spin = false;
        if(first)
        {
          this.router.navigate(['home']);
        }
        else
        {
          this.router.navigate(["/profile"]);
        }
      });
    });
  }

}

export function isIntegerValidator(control: AbstractControl) : {[key : string]: boolean} | null {
  if(control.value !== undefined && isNaN(control.value)) {
    return {'nonNum': true};
  }

  if(control.value > 5)
    return {'nonNum':true};

  return null;
}

export function containsNumberValidator(control: AbstractControl) : {[key : string]: boolean} | null {
  let str = String(control.value);

  if(/\d/.test(str))
  {
    return {'num': true};
  }

  return null;
}
