import { Component, OnInit } from '@angular/core';
declare var generateMyChart: any;

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss']
})
export class DataAnalysisComponent implements OnInit {

  constructor() { }

  onClick() {
    generateMyChart();
  }

  ngOnInit(): void {
  }

}
