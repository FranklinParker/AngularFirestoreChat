import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../../app.reducer';
import {AuthService} from '../../../user/service/auth.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('sidebarToggle') sidebarToggle = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuthenticated$ =  this.store.select(fromRoot.getIsAuth);
  }

  onToggle() {
    this.sidebarToggle.emit();
  }

  logout(){
    this.authService.logout();
  }
}
