import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(registrationForm: NgForm) {
    console.log('regForm will reg??',  registrationForm.value);
    this.authService.registerUser(registrationForm.value);

  }


}
