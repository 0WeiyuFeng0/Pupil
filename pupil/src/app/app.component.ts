import { Observable } from 'rxjs';
import { DataHandlerService } from './services/data-handler.service';
import { AuthService } from './services/auth.service';
import { auth } from 'firebase/app';
import { Component } from '@angular/core';
declare var generateMyChart: any;
declare var initialPython: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pupil';
  itemList: Observable<any>;
  onClick() {
    generateMyChart();
    initialPython();
  }

  addDataToDataBase(){
    // this.dataHandlerService.addData("asf","asdf");
  }

  constructor(public auth: AuthService, public dataHandlerService: DataHandlerService) {
    this.itemList = dataHandlerService.getData().snapshotChanges();
  }

}
