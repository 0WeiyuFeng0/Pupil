import { Credentials } from './../interface/credentials';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('credentials');
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

}
