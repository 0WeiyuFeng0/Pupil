import { Credentials } from './../interface/credentials';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

// var userIsIn: boolean;
// userIsIn = false;

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  userIsIn: boolean = false;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('credentials');
    // this.userIsIn = false;
    // console.log(this.itemsRef);
   }
   
   getData(){
    return this.itemsRef;
   }

   getEmail(email: String){
    this.items = this.itemsRef.valueChanges();
    this.items.forEach(function(item){
      console.log(item)
    });
   }


   addData(addEmail: String ,addPassword: String){
    this.itemsRef.push({ email: addEmail, password: addPassword});
   }

   loginSuccessful(){
     this.userIsIn = true;
   }

   isUserLoggedIn(){
     return this.userIsIn;
   }

   userLogout(){
     this.userIsIn = false;
   }
}
