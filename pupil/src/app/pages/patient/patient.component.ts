import { Observable } from 'rxjs';
import { DataHandlerService } from './../../services/data-handler.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
  }

  addInfo(){
    this.router.navigate(['/addInfo']);
  }

}
