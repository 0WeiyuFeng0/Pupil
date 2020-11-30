import { Observable } from 'rxjs';
import { DataHandlerService } from './../../services/data-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {

  itemList: Observable<any>;
  userKey: String = "";

  birthday: String = "N/A"
  bloodType: String = "N/A"
  email: String = "N/A"
  firstNmae: String = "N/A"
  groupID: String = "N/A"
  hight: String = "N/A"
  lastName: String = "N/A"
  medicalCondition: String = "N/A"
  phoneNumber: String = "N/A"
  providerID: String = "N/A"
  type: String = "N/A"
  weight: String = "N/A"

  constructor(public dataHandler: DataHandlerService) {
    this.itemList = dataHandler.getData().snapshotChanges();
  }

  loadInfo(){
    this.userKey = this.dataHandler.getUserKey();

    this.itemList.subscribe(item =>{
      item.forEach(element => {
        if(element.key == this.userKey){
          this.birthday = element.payload.val().birthday;
          this.bloodType = element.payload.val().bloodType;
          this.email = element.payload.val().email;
          this.firstNmae = element.payload.val().firstNmae;
          this.groupID = element.payload.val().groupID;
          this.hight = element.payload.val().hight;
          this.lastName = element.payload.val().lastName;
          this.medicalCondition = element.payload.val().medicalCondition;
          this.phoneNumber = element.payload.val().phoneNumber;
          this.providerID = element.payload.val().providerID;
          this.type = element.payload.val().type;
          this.weight = element.payload.val().weight;
        }
      });
    });
  }

  

  ngOnInit(): void {
    this.loadInfo();
  }

}
