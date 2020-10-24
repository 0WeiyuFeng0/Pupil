import { RouterModule, Router } from '@angular/router';
import { DataHandlerService } from './../services/data-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { Observable } from 'rxjs';

var userEmail : boolean;
userEmail = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  itemList: Observable<any>;


  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  get registerEmailControl() { return this.loginForm.get('email'); }
  get registerPasswordControl() { return this.loginForm.get('password'); }

  addDataToDataBase(){
    this.dataHandler.addData(this.loginForm.value.email,this.loginForm.value.password);
  }

  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService, private router: Router) {
    this.itemList = dataHandler.getData().snapshotChanges();
    }

  ngOnInit(): void {
  }


  getEmail(){
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        if(element.payload.val().email == this.loginForm.value.email && element.payload.val().password == this.loginForm.value.password){
          userEmail = true;
          this.router.navigate(['/list']);
        }
      });
      
      if(userEmail == false){
        alert("try again");
        }
    });


  }

  onSubmit() {
    this.getEmail();
  }


}
