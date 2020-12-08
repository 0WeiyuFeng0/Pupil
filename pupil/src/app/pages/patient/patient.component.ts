import { Observable } from 'rxjs';
import { DataHandlerService } from './../../services/data-handler.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
declare var initialPython: any;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  testDataList: Observable<any>;
  userKey: String = null;
  userRef: AngularFireList<any>;
  user: Observable<any[]>;
  first: Boolean;
  second: Boolean;
  third: Boolean;
  four: Boolean;
  //test_data: any[];
  

  
  constructor(public dataHandler: DataHandlerService, private router: Router, private db: AngularFireDatabase) {
    this.testDataList = dataHandler.getTestDataRef().valueChanges();
    this.userKey = this.dataHandler.getUserKey();
    this.userRef = this.db.list(String('credentials/'+this.userKey));
    this.user = this.userRef.snapshotChanges();

   }

  ngOnInit(): void {

    var temp = {
      id: "",
      speed: "",
      type: "",
      dateAndTime: "",
      sphereDiameter: "",
      email: "",
    }

    this.getEmail();

  }

  getEmail(){
    var flag = true;
    this.user.forEach(element => {
      element.forEach(item=>{
        if(item.payload.key == "email")
        {
          var email = item.payload.val();
          // find test corresponding to this email
          this.testDataList.forEach(element => {
            element.forEach(item => {
              var data = item[Object.keys(item)[0]];
              if(data.email == email && flag)
              {
                initialPython(data.data_list);
                flag = false;
                //this.test_data = data.data_list;
                //console.log(this.test_data);
                //this.dataHandler.setTestData(data.data_list);
                      
              }
            });
          });
        }
      })
    });
  }

  firstClick() {
     //generateMyChart();
     //initialPython();
     this.first = true;
  }

  secondClick(){
     this.second = true;
  }

  thirdClick() {
    //generateMyChart();
    //initialPython();
    this.third = true;
  }

  fourClick(){
    this.four = true;
  }


  addInfo(){
    this.router.navigate(['/addInfo']);
  }

}
