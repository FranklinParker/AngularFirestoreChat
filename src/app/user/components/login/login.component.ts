import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = 'fp@aol.com';
  password = '123456';
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log('email: ' + this.email);
    console.log('password:' + this.password);

  }

}
