import { DataHandlerService } from './data-handler.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthPatientGuard implements CanActivate {
  
  constructor(private dataHandlerService:DataHandlerService, private router: Router){
  }

  canActivate(){
    if(this.dataHandlerService.isDoctor() == false){
      return true;
    }else{
      this.router.navigate(['/list']);
      return false;
    }
  }
  
}
