import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserModel} from '../user-model';
import {UiService} from '../../shared/service/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from '../auth.actions';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromRoot.State>,
              private router: Router) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/chat']);
      } else {
        //this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * registers a new user
   *
   * @param {UserModel} user
   */
  registerUser(user: UserModel) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.addUser(user);
      })
      .catch(err =>
        this.uiService.showSnackbar(err.message, null, 4000));
  }

  /**
   * login
   *
   * @param {string} email
   * @param {string} password
   */
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((resp) => {
      })
      .catch(err =>
        this.uiService.showSnackbar(err.message, null, 4000));
  }


  /**
   * add a user with name and email
   *
   * @param {UserModel} user
   */

  private addUser(user: UserModel) {
    this.db.collection('users')
      .add({
        email: user.email,
        name: user.name
      })
      .then((result) => {

      })
      .catch((err) =>
        this.uiService.showSnackbar(err.message, null, 4000));


  }

}
