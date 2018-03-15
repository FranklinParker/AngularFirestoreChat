import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserModel} from '../user-model';
import {UiService} from '../../shared/service/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from '../auth.actions';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
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
    console.log('registerUser ', user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.email)
      .then((result) => {
        console.log('user registered', result);
      }, (err) => this.uiService.showSnackbar(err.message, null, 4000));
  }

}
