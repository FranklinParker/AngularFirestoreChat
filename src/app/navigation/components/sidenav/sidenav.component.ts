import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output('closeSideNav') closeSideNav = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSidenavClose() {
    this.closeSideNav.emit();
  }

  logout() {
    this.closeSideNav.emit();

  }

}
