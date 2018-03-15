import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserModel} from '../user-model';
import {UiService} from '../../shared/service/ui.service';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private uiService: UiService) {
  }

  /**
   * registers a new user
   *
   * @param {UserModel} user
   */
  registerUser(user: UserModel) {
    console.log('registerUser ', user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.email)
      .then((result) => {
        console.log('user registered', result);
      }, (err) => this.uiService.showSnackbar(err.message, null, 4000));
  }

}
