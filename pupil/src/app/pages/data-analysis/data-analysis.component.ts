import { Component, OnInit } from '@angular/core';
declare var generateMyChart: any;
declare var initialPython: any;

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss']
})
export class DataAnalysisComponent implements OnInit {

  constructor() { }

  condition: Boolean

  onClick() {
    //generateMyChart();
    //initialPython();
    this.condition = true;
  }

  ngOnInit(): void {
  }

}
