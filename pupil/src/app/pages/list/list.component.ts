import { DataHandlerService } from './../../services/data-handler.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

class TestData {
  id: String;
  name: String;
  type: String;
  dateAndTime: String;
  treatment: String;
  email: String;

  constructor(email,dateAndTime,type){
    this.email = email;
    this.dateAndTime = dateAndTime;
    this.type = type;
  }
}

var patientEmails = [];
// var testDataList = [];
var temp = {
  id: "",
  speed: "",
  type: "",
  dateAndTime: "",
  sphereDiameter: "",
  email: "",
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  testDataList: Array<TestData> = [];
  //patientEmails: string[] = [];
  // testDataList: TestData[] = [];
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  itemsRef2: AngularFireList<any>;
  items2: Observable<any[]>;
  
  itemsRef3: AngularFireList<any>;
  items3: Observable<any[]>;

  // itemList: Observable<any>;
  // itemsEmailRef: AngularFireList<any>;
  userKey: String = null;

  

  constructor(private db: AngularFireDatabase, private dataHandler: DataHandlerService, private db2: AngularFireDatabase) {
    // this.itemList = dataHandler.getData().snapshotChanges();
  }

  ngOnInit(): void {
    // this.userKey = this.dataHandler.getUserKey();
    // this.itemsEmailRef = this.db2.list(String('credentials/'+this.userKey+'/patientEmail'));
    // this.itemList = this.itemsEmailRef.snapshotChanges();
    // this.getEmail();
    this.userKey = this.dataHandler.getUserKey();
    this.itemsRef3 = this.db2.list(String('credentials/'+this.userKey+'/patientEmail'));
    this.items3 = this.itemsRef3.snapshotChanges();
    this.getEmail();

    this.itemsRef = this.db.list('test');
    this.items = this.itemsRef.valueChanges();
    // this.getTest();

    this.itemsRef2 = this.db.list('credentials');
    this.items2 = this.itemsRef2.valueChanges();
    // this.getInfo();
  }

  getTest(){
    console.log(patientEmails);
    // this.items = this.itemsRef.valueChanges();
    this.items.forEach(function(item){
      item.forEach(function(element,index) {
        // console.log(typeof element);     
        // console.log(element);  
        var test = element[Object.keys(element)[0]];
        console.log(test.email);
        //console.log(typeof patientEmails);
        if(patientEmails.includes(String(test.email)) == true){
          console.log("woks");
          //console.log(String(test.date), String(test.test_name), String(test.email));

          temp.dateAndTime = String(test.date);
          temp.email = String(test.email);
          temp.type = String(test.test_name);
          temp.speed = String(test.speed);
          temp.sphereDiameter = String(Math.round((Number(test.sphere_diameter)*1000))/1000);
          temp.id = String(test.key);

          this.testDataList.push(new TestData(test.email,test.date,test.test_name));
          console.log(this.testDataList.length);
          console.log(this.testDataList);
        } 
      }.bind(this));

      this.getInfo()

    }.bind(this));    
  }

  getInfo(){
    console.log("in get info");
    // console.log(testDataList);
    // this.items2 = this.itemsRef2.valueChanges();
    this.items2.forEach(function(item){
      // console.log(item);
      item.forEach(function(element){

        console.log(element.email, this.testDataList.length);

        // var test = testDataList[Object.keys(testDataList)[0]]
        console.log(this.testDataList);

        // this.testDataList.forEach(function(data){
        //   if(data.email == element.email){
        //     console.log(data.email, element.email);
        //   }
        // });



        for(let i = 0; i<this.testDataList.length; i++ ){
          if(this.testDataList[i].email == element.email){
            this.testDataList[i].name = (element.firstNmae + " " + element.lastName);
            this.testDataList[i].treatment = (element.medicalCondition);
            console.log(this.testDataList[i].email, element.email, i);
          }
        }
        
      }.bind(this));
    }.bind(this));
  }
  

  // getEmail(){
  //   this.itemList.subscribe(item =>{
  //     item.forEach(element => {
  //       console.log(element.payload.val().patientEmail);
  //       patientEmails.push(String(element.payload.val().patientEmail));
  //     });
  //   });
  // }

  getEmail(){
    console.log("in get email");
    this.items3.forEach(function(item){
      // console.log(item);
      item.forEach(function(element){
        // console.log(element.email);
        patientEmails.push(String(element.payload.val().patientEmail));
      });
      this.getTest();
    }.bind(this));
    // this.getTest();
    // console.log(patientEmails);
  }

}