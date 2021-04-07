import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {UserServiceService} from '../service/user-service.service';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
const twitterlogoURL = "https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/twitter.svg";
const ghublogoURL="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/github.svg";

@Component({
  selector: 'app-loginscr',
  templateUrl: './loginscr.component.html',
  styleUrls: ['./loginscr.component.css']
})
export class LoginscrComponent implements OnInit {

  constructor( private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,public auth: AngularFireAuth, private userService: UserServiceService,
    private http: HttpClient) { 
    this.matIconRegistry.addSvgIcon( "glogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon( "tlogo", this.domSanitizer.bypassSecurityTrustResourceUrl(twitterlogoURL));
    this.matIconRegistry.addSvgIcon( "gitlogo", this.domSanitizer.bypassSecurityTrustResourceUrl(ghublogoURL));
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res)=>{
     //console.log("google user "+ JSON.stringify(res.user))
     this.userService.setuser(res.user);
     console.log("User set is "+ this.userService.mainuser.displayname);
     this.fetchuserdata();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have signed up with a different provider for that email.');
        // Handle linking here if your app allows it.
      } else {
        console.error(error);
      };
    });;
  }

  tlogin(){
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then((res)=>{
     //console.log("twitter user "+ JSON.stringify(res))
     this.userService.setuser(res.user);
     this.fetchuserdata();
     console.log("User set is "+ this.userService.mainuser.displayname);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have signed up with a different provider for that email.');
        // Handle linking here if your app allows it.
      } else {
        console.error(error);
      };
    });;
  }

  gitlogin(){
    this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then((res)=>{
      // The signed-in user info.
      var user = res.user;
      //console.log("Github user is "+ JSON.stringify(user));
      this.userService.setuser(res.user);
      this.fetchuserdata();
     console.log("User set is "+ this.userService.mainuser.displayname);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have signed up with a different provider for that email.');
        // Handle linking here if your app allows it.
      } else {
        console.error(error);
      };
    });
  }

  
  logout() {
    this.auth.signOut();
  }

  fetchuserdata(){
   
   

    const APIendpoint=environment.APIEndpoint;
    const posturl = APIendpoint+'/api/user/login';


   firebase.auth().currentUser?.getIdToken(true).then((idtoken)=>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': idtoken
      })
    };//end of httpoptions

    this.http.post<any>(posturl,JSON.stringify(this.userService.mainuser),httpOptions).subscribe(
      (res)=> {
         //console.log("response " + res.message + " "  + res.success);
        if (res.success){
          console.log("it was a success");
           
          
        } else{
          //do nothing and show the error message
          console.log("Show error message " + res.message);
           
        }
      } ,
      (err)=> {
        console.log(err.error.message);
      }
    );

    }).catch(function(error){
      console.log("Network error please try again");
    });
   

   


  }//end of fetch user
}//end of class
