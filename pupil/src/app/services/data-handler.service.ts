import { Credentials } from './../interface/credentials';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { concat, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

// var userIsIn: boolean;
// userIsIn = false;

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  userIsIn: boolean = false;
  userKey: String = null;
  userType: String = null;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('credentials');
    // this.userIsIn = false;
    // console.log(this.itemsRef);
   }
   
   getData(){
    return this.itemsRef;
   }

  // checkLogin(email: String, password:String):Boolean{
  //   var userEmail: Boolean = false;    
  //   this.items = this.itemsRef.valueChanges();
  //   this.items.forEach(element => {
  //     console.log(element);
  //     if(element.payload.val().email == email && element.payload.val().password == password){
  //       userEmail = true;
  //       this.userKey = element.key;
  //       return true;
  //     }

  //     if(userEmail == false){
  //       return false;
  //     }
  //   });
  //   return false;
  // }

   getEmail(email: String){
    this.items = this.itemsRef.valueChanges();
    this.items.forEach(function(item){
      console.log(item)
    });
   }

   saveUser(key: String, type: String){
     this.userKey = key;
     this.userType = type;
     console.log(this.userKey, this.userType);
   }

   getUserKey(){
     return this.userKey;
   }

   addInfo(addPhoneNumber: String, addProviderID: String, addGroupID:String, addHight:String, addWeight:String, addBloodType:String, addMedicalCondition:String){
    console.log(addPhoneNumber, addProviderID, addGroupID, addHight, addWeight, addBloodType, addMedicalCondition);
    console.log(this.userKey);
    if (this.userKey != ""){
      if(addPhoneNumber != "N/A"){
        this.itemsRef.update(String(this.userKey), { phoneNumber: addPhoneNumber});
      }
      if (addProviderID != "N/A") {
        this.itemsRef.update(String(this.userKey), { providerID: addProviderID});
      }
      if (addGroupID != "N/A") {
        this.itemsRef.update(String(this.userKey), { groupID: addGroupID});
      }
      if (addHight != "N/A") {
        this.itemsRef.update(String(this.userKey), { hight: addHight});
      }
      if (addWeight != "N/A") {
        this.itemsRef.update(String(this.userKey), { weight: addWeight});
      }
      if (addBloodType != "N/A") {
        this.itemsRef.update(String(this.userKey), { bloodType: addBloodType});
      }
      if (addMedicalCondition != "N/A") {
        this.itemsRef.update(String(this.userKey), { medicalCondition: addMedicalCondition});
      }
      //this.itemsRef.update(String(this.userKey), { phoneNumber: addPhoneNumber,  providerID: addProviderID, groupID: addGroupID, hight: addHight, weight: addWeight, bloodType: addBloodType, medicalCondition: addMedicalCondition});
    }else {
      console.log("key is N/A")
    }

   }

  addData(addFirstName:String, addLastName:String, addEmail: String ,addPassword: String, addBirthday:String, addType: String){
    this.itemsRef.push({ firstNmae: addFirstName, lastName:addLastName, email: addEmail, password: addPassword, birthday: addBirthday, type: addType, phoneNumber: "N/A", providerID: "N/A", groupID:"N/A", hight:"N/A", weight:"N/A", bloodType:"N/A", medicalCondition:"N/A"});   
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

  isDoctor(){
    if(this.userType == "Doctor"){
      return true;
    }else{
      return false;
    }
  }
}
