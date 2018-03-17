import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserModel} from '../user-model';
import {UiService} from '../../shared/service/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from '../auth.actions';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {SetUser, UnsetUser} from '../user.actions';
import {Subscription} from 'rxjs/Subscription';
import {ChatService} from '../../chat/services/chat.service';

@Injectable()
export class AuthService {
  private fbSubs: Subscription[] = [];

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromRoot.State>,
              private router: Router,
              private chatService: ChatService) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/chat']);
      } else {
        this.chatService.unsubScribe();
        this.cancelSubscription();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new UnsetUser());
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
        this.loadUser(email);
      })
      .catch(err =>
        this.uiService.showSnackbar(err.message, null, 4000));
  }

  private loadUser(email: string) {
    this.fbSubs.push(
      this.db.collection('users',
        ref => ref.where('email', '==', email)
      )
        .valueChanges()
        .subscribe((users) => {
          if (users && users.length > 0) {
            const user = {
              name: users[0]['name'],
              email: users[0]['email']
            };
            this.store.dispatch(new SetUser(user));
          }
        }));

  }

  cancelSubscription() {
    this.fbSubs.forEach((sub: Subscription) => sub.unsubscribe());
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
        this.store.dispatch(new SetUser({
          email: user.email,
          name: user.name
        }));

      })
      .catch((err) =>
        this.uiService.showSnackbar(err.message, null, 4000));


  }

  /**
   *
   *
   *
   */
  logout() {
    this.afAuth.auth.signOut();
  }

}
