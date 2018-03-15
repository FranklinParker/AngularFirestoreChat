import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserModel} from '../user-model';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
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
      }, (err) => console.log('err', err));
  }

}
