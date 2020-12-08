import { DataHandlerService } from './data-handler.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthTestDataGuard implements CanActivate {

  constructor(private dataHandlerService:DataHandlerService, private router: Router){
  }

  canActivate(){
    if(this.dataHandlerService.isPatientTestValid() == true){
      return true;
    }else{
      this.router.navigate(['/list']);
      return false;
    }
  }
  
}
