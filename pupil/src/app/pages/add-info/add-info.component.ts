import { logging } from 'protractor';
import { DataHandlerService } from './../../services/data-handler.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { concat, Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

var userBloodType: String = "N/A";
var userMedicalCondition: String = "Concussion";


@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss']
})
export class AddInfoComponent implements OnInit {

  itemList: Observable<any>;
  isDoctor: Boolean = false;
  itemsRef: AngularFireList<any>;
  userKey: String = null;


  addInfo = this.fb.group(
    {
      phoneNumber: new FormControl('',[Validators.minLength(10)]),
      providerID: new FormControl(''),
      groupID: new FormControl(''),
      height: new FormControl(''),
      weigh: new FormControl(''),
      email: new FormControl('', [Validators.email]),
    });

  get registerPhoneNumberControl() { return this.addInfo.get('phoneNumber'); }
  get registerProviderIDControl() { return this.addInfo.get('providerID'); }
  get registerGroupIDControl() { return this.addInfo.get('groupID'); }
  get registerHeightControl() { return this.addInfo.get('height'); }
  get registerWeighControl() { return this.addInfo.get('weigh'); }
  get registerEmailControl() { return this.addInfo.get('email'); }


  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService, private router: Router, private db: AngularFireDatabase) {
    this.itemList = dataHandler.getData().snapshotChanges();
    
    }

  ngOnInit(): void {
    this.isDoctor = this.dataHandler.isDoctor();
    this.userKey = this.dataHandler.getUserKey();
    this.itemsRef = this.db.list(String('credentials/'+this.userKey+'/patientEmail'));
  }


  sendInfoToDataHandler(){

    var addPhoneNumber: String = "N/A";
    var addProviderID: String = "N/A";
    var addGroupID: String = "N/A";
    var addHight: String = "N/A";
    var addWeight: String = "N/A";
    var addEmail: String = "N/A";

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

    if(this.addInfo.value.email != ""){
      this.itemsRef.push({patientEmail: this.addInfo.value.email});
    }

    this.dataHandler.addInfo(addPhoneNumber, addProviderID, addGroupID, addHight, addWeight, userBloodType, userMedicalCondition);
    this.dataHandler.addPatient(addEmail);
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
