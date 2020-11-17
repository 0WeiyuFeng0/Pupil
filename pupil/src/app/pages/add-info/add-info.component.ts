import { logging } from 'protractor';
import { DataHandlerService } from './../../services/data-handler.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { concat, Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

var userBloodType: String = "N/A";
var userMedicalCondition: String = "Concussion";


@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss']
})
export class AddInfoComponent implements OnInit {

  itemList: Observable<any>;


  addInfo = this.fb.group(
    {
      phoneNumber: new FormControl('',[Validators.minLength(10)]),
      providerID: new FormControl(''),
      groupID: new FormControl(''),
      height: new FormControl(''),
      weigh: new FormControl(''),
    });

  get registerPhoneNumberControl() { return this.addInfo.get('phoneNumber'); }
  get registerProviderIDControl() { return this.addInfo.get('providerID'); }
  get registerGroupIDControl() { return this.addInfo.get('groupID'); }
  get registerHeightControl() { return this.addInfo.get('height'); }
  get registerWeighControl() { return this.addInfo.get('weigh'); }

  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService, private router: Router) {
    this.itemList = dataHandler.getData().snapshotChanges();
    }

  ngOnInit(): void {
  }


  // addUser(){
  //   alert("added user");
  //   this.dataHandler.addData(this.loginForm.value.firstName,this.loginForm.value.lastName,this.loginForm.value.email, this.loginForm.value.password, String(this.loginForm.value.birthday), userType);
  //   // addData(addEmail: String ,addPassword: String);
  // }

  sendInfoToDataHandler(){

    var addPhoneNumber: String = "N/A";
    var addProviderID: String = "N/A";
    var addGroupID: String = "N/A";
    var addHight: String = "N/A";
    var addWeight: String = "N/A";

    if (this.addInfo.value.phoneNumber != ""){
      addPhoneNumber = this.addInfo.value.phoneNumber;
    }
    if (this.addInfo.value.providerID != ""){
      addProviderID = this.addInfo.value.providerID;
    }
    if (this.addInfo.value.groupID != ""){
      addGroupID = this.addInfo.value.groupID;
    }
    if (this.addInfo.value.height != ""){
      addHight = this.addInfo.value.height;
    }
    if (this.addInfo.value.weigh != ""){
      addWeight = this.addInfo.value.weigh;
    }

    this.dataHandler.addInfo(addPhoneNumber, addProviderID, addGroupID, addHight, addWeight, userBloodType, userMedicalCondition);

  }

  onSubmit() {

    this.sendInfoToDataHandler();
    
    // this.dataHandler.addInfo();
    // this.router.navigate(['/patient']);
  }

  selectBloodType(event: any){
    userBloodType = event.target.value;
    console.log(userBloodType);
  }

  selectMedicalCondition(event: any){
    userMedicalCondition = event.target.value;
    console.log(userMedicalCondition);
  }
}