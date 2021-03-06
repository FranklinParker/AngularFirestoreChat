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
import {Observable} from 'rxjs/Observable';
import {take} from 'rxjs/operators';
import {PrivateMessageService} from '../../chat/services/private-message.service';


@Injectable()
export class AuthService {
  private fbSubs: Subscription[] = [];

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromRoot.State>,
              private router: Router,
              private chatService: ChatService,
              private privateMessageService: PrivateMessageService) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
      } else {
        this.chatService.unsubcribe();
        this.privateMessageService.unsubscribe();
        this.cancelSubscription();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new UnsetUser());
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
        this.router.navigate(['/chat']);

      })
      .catch(err =>
        this.uiService.showSnackbar(err.message, null, 4000));
  }

  /**
   * load the user info when logging in
   *
   * @param {string} email
   */
  private loadUser(email: string) {
    this.fbSubs.push(
      this.db.collection('users',
        ref => ref.where('email', '==', email)
      )
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              email: doc.payload.doc.data().email

            };
          });
        })
        .subscribe((users) => {
          if (users && users.length > 0) {
            const user = {
              name: users[0]['name'],
              email: users[0]['email'],
              id: users[0]['id']
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
    this.doesUserNameExist(user.name)
      .pipe(take(1))
      .subscribe((users) => {
        if (users && users.length > 0) {
          this.uiService.showSnackbar('This User Name Already Exists, try another', null, 6000);
          this.afAuth.auth.currentUser.delete();

        } else {
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
              this.router.navigate(['/chat']);


            })
            .catch((err) =>
              this.uiService.showSnackbar(err.message, null, 4000));
        }
      });


  }

  /**
   * find user
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  doesUserNameExist(name: string): Observable<any> {
    return this.db.collection('users',
      ref => ref.where('name', '==', name))
      .valueChanges()
      .map((users) => {
        return users;
      });

  }


  /**
   * log out make sure you leave any chat you are in
   *
   *
   */
  logout() {
    this.chatService.setChatRoomToNone()
      .then(() => {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);

      })
      .catch(() => {
        this.uiService.showSnackbar('Error removing From Chat Room',
          null, 5000);
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);


      });

  }

  /**
   *  Is the user logged in
   *
   *
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

}
