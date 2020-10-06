import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './../services/data-handler.service';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective} from "@angular/forms"
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  itemList: Observable<any>;

  // username:string = '';
  // password:string = '';

  // inputEmai = ('');
  // inputPassword = ('')
  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  loginForm = this.fb.group(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)] )
    },{
      validator: this.MustMatch('password', 'confirmPassword')
  });

  
  get registerEmailControl() { return this.loginForm.get('email'); }
  get registerPasswordControl() { return this.loginForm.get('password'); }
  get registerConfirmPasswordControl() { return this.loginForm.get('confirmPassword'); }


  addDataToDataBase(){
    this.dataHandler.addData(this.loginForm.value.email,this.loginForm.value.password);
  }

  constructor(private fb: FormBuilder, public dataHandler: DataHandlerService) {
    this.itemList = dataHandler.getData().snapshotChanges();
    }

  ngOnInit(): void {
  }
  

  getEmail(){
    this.itemList.subscribe(item =>{
      item.forEach(element => {
        if(element.payload.val().emai == this.loginForm.value.email){
          // console.log(element.payload.val().emai ,this.loginForm.value.email, element.payload.val().password, this.loginForm.value.password);
          alert("Email already exist please login");
        }else{
          // console.log(element.payload.val().emai + "!=" +this.loginForm.value.email, element.payload.val().password + "!=" + this.loginForm.value.password);
        }
        // console.log(element.payload.val().emai, element.payload.val().password);
      });
      // console.log(item,item.payload);
    });
  }

  addUser(){
    this.dataHandler.addData(this.loginForm.value.email, this.loginForm.value.password);
    // addData(addEmail: String ,addPassword: String);
  }



  onSubmit() {
    // console.warn(this.loginForm.value);
    this.getEmail();
    this.addUser();

    // this.addDataToDataBase()

    // this.dataHandler.getEmail("asdf");

    // if(this.loginForm.value.email == 'test@test.com' && this.loginForm.value.password == "pass"){

    // }else{
    //   alert( " email: " + this.loginForm.value.email + " pass: " + this.loginForm.value.password + ' Wrong email and password')
    // }

  }


}
