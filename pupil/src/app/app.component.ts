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
  onClick() {
    generateMyChart();
    initialPython();
  }
  
}
