import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('sidebarToggle') sidebarToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.sidebarToggle.emit();
  }

}
