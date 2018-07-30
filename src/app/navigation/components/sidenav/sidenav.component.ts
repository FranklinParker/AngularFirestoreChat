import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../../user/service/auth.service';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output('closeSideNav') closeSideNav = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  onSidenavClose() {
    this.closeSideNav.emit();
  }

  logout() {
    this.authService.logout();
    this.closeSideNav.emit();

  }

}
