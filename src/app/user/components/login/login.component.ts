import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = 'fp@aol.com';
  password = '123456';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }


  onSubmit(loginForm: NgForm) {
    console.log('login form',
      loginForm.value);
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }

}
