import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
const twitterlogoURL = "https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/twitter.svg";
const ghublogoURL="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/github.svg";

@Component({
  selector: 'app-loginscr',
  templateUrl: './loginscr.component.html',
  styleUrls: ['./loginscr.component.css']
})
export class LoginscrComponent implements OnInit {

  constructor( private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,public auth: AngularFireAuth) { 
    this.matIconRegistry.addSvgIcon( "glogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon( "tlogo", this.domSanitizer.bypassSecurityTrustResourceUrl(twitterlogoURL));
    this.matIconRegistry.addSvgIcon( "gitlogo", this.domSanitizer.bypassSecurityTrustResourceUrl(ghublogoURL));
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res)=>{
    console.log("google user "+ JSON.stringify(res.user))
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
    console.log("twitter user "+ JSON.stringify(res))
    
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
      console.log("Github user is "+ JSON.stringify(user));
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

}
