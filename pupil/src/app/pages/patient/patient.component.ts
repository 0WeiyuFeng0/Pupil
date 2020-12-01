import { Observable } from 'rxjs';
import { DataHandlerService } from './../../services/data-handler.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var initialPython: any;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  itemList: Observable<any>;

  constructor(public dataHandler: DataHandlerService, private router: Router) {
    this.itemList = dataHandler.getData().snapshotChanges();
   }


  first: Boolean
  second: Boolean
  third: Boolean
  four: Boolean

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

  ngOnInit(): void {
  }

  addInfo(){
    this.router.navigate(['/addInfo']);
  }

}
