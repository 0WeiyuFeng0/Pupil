import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataHandlerService } from './../../services/data-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  itemList: Observable<any>;
  isDoctor: Boolean = false;
  itemsRef: AngularFireList<any>;
  userKey: String = null;

  constructor(public dataHandler: DataHandlerService, private db: AngularFireDatabase) {
    this.itemList = dataHandler.getData().snapshotChanges();
   }

  ngOnInit(): void {
    this.isDoctor = this.dataHandler.isDoctor();
    this.userKey = this.dataHandler.getUserKey();
    this.itemsRef = this.db.list(String('credentials/'+this.userKey+'/patientEmail'));
    this.itemList = this.itemsRef.snapshotChanges();
    this.getEmail();
  }

  getEmail(){
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        console.log(element.payload.val().patientEmail);
      });
    });
  }

}
