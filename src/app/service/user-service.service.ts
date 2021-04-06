import { Injectable } from '@angular/core';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  mainuser:user=new user();

  constructor() { 
  }

  setuser(takeuser:any){
    this.mainuser.displayname=takeuser.displayName;
    this.mainuser.emailid=takeuser.email;
    this.mainuser.photourl= takeuser.photoURL;
    this.mainuser.userid='';
  }
}
