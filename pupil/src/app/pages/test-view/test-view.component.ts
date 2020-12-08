import { DataHandlerService } from './../../services/data-handler.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {

  itemsRef3: AngularFireList<any>;
  items3: Observable<any[]>;

  testDate: String = null;

  constructor(private db2: AngularFireDatabase, private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.testDate = this.dataHandler.getPatientTest();
    this.itemsRef3 = this.db2.list(String('test/'+this.testDate));
    this.items3 = this.itemsRef3.snapshotChanges();
  }

}
