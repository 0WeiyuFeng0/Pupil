import { DataHandlerService } from './../services/data-handler.service';
import { AuthService } from './../services/auth.service';
import { auth } from 'firebase/app';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']

})
export class GoogleLoginComponent implements OnInit {

  constructor(public auth: AuthService, private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
  }

}
