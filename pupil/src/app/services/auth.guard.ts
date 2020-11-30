import { AuthService } from './auth.service';
import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { DataHandlerService } from './data-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataHandlerService:DataHandlerService, private router: Router){
  }

  canActivate(){
    if(this.dataHandlerService.isUserLoggedIn() == false){
      return true;
    }else if (this.dataHandlerService.isDoctor() == true){
      this.router.navigate(['/list']);
    }
      else{
        this.router.navigate(['/patient'])
      }
      return false;
  }
  
}
