import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

name: String;
username: String;
email: String;
password;

  constructor(
    private validateService: ValidateService, 
    private FlashMessages:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {  
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.FlashMessages.show('Please fill in all Fields', {cssClass: 'alert-danger'});
      return false;
    }

    //Validate Email 
    if(!this.validateService.validateEmail(user.email)){
      this.FlashMessages.show('Please use a valid Email', {cssClass: 'alert-danger'});    
      return false;
    }


    //RegisterUser
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.FlashMessages.show('Your Account Has Been Created, Try Loggin in!', {cssClass: 'alert-success'});
        this.router.navigate(['/login']);
      } else {
        this.FlashMessages.show('oops! something went Wrong!', {cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      }
    })
  }
}
