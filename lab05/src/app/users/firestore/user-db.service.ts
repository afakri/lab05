import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from
"@angular/fire/compat/firestore";

import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  constructor(private firestore:AngularFirestore) { }

  getUsers():Observable<DocumentChangeAction<unknown>[]>{
      return this.firestore.collection('users').snapshotChanges()
  }
  createUser(user: User): Promise<DocumentReference<unknown>> {
    delete user.id;
    return this.firestore
      .collection('users')
      .add({...user});
  }
}
