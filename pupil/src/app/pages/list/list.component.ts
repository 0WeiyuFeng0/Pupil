import { DataHandlerService } from './../../services/data-handler.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  id: String = "1";
  name: String = "";
  type: String = "";
  dateAndTime: String = "";
  treatment: String = "";
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  itemList: Observable<any>;
  isDoctor: Boolean = false;
  itemsEmailRef: AngularFireList<any>;
  userKey: String = null;



  constructor(private db: AngularFireDatabase, private dataHandler: DataHandlerService, private db2: AngularFireDatabase) {
    this.itemList = dataHandler.getData().snapshotChanges();
  }

  ngOnInit(): void {
    this.isDoctor = this.dataHandler.isDoctor();
    this.userKey = this.dataHandler.getUserKey();
    this.itemsEmailRef = this.db2.list(String('credentials/'+this.userKey+'/patientEmail'));
    this.itemList = this.itemsEmailRef.snapshotChanges();
    this.getEmail();

    this.itemsRef = this.db.list('test');
    this.getTest();
  }

  getTest(){
    this.items = this.itemsRef.valueChanges();
    this.items.forEach(function(item){
      item.forEach(function(element) {
        // console.log(typeof element);     
        // console.log(element);  
        var test = element[Object.keys(element)[0]];
        console.log(test.email);   
      });
      // console.log(typeof item);
      // console.log(item);
      // var test = item[Object.keys(item)[0]];
      // console.log(test);
      // console.log(test[Object.keys(test)[0]].email);
    });
      
  }

  getEmail(){
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        console.log(element.payload.val().patientEmail);
      });
    });
  }

}
