import { Observable } from 'rxjs';
import { DataHandlerService } from './../../services/data-handler.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  itemList: Observable<any>;
  isDoctor: Boolean = false;

  constructor(private router:Router, public dataHandler: DataHandlerService) {
    this.itemList = dataHandler.getData().snapshotChanges();
   }


  patient(){
    this.router.navigate(['/patient']);
  }

  list(){
    this.router.navigate(['/list']);
  }

  ngOnInit(): void {
    this.isDoctor = this.dataHandler.isDoctor();
  }

}
