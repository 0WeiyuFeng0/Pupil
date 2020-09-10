import { AuthService } from './services/auth.service';
import { auth } from 'firebase/app';
import { Component } from '@angular/core';
declare var generateMyChart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pupil';
  onClick() {
    generateMyChart();
  }
  constructor(public auth: AuthService) {}
}
