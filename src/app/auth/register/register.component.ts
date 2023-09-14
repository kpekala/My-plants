import {Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ProfileService } from 'src/app/layout/home/profile/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private authService: AuthService, 
              private router: Router,
              private profileService: ProfileService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required)
    })
  }

  onLoginButtonClicked(){
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const username = this.registerForm.get('username').value;
    this.authService.register(email, password)
      .then(() => {
        this.profileService.createProfile(username, email).subscribe(
          {
            next: () => {
              this.registerForm.reset();
              this.router.navigate(['app/home']);
            }
          }
        );
      }).catch(error => {
        console.log(error);
      });
  }
}
