import {Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }

  onLoginButtonClicked(){
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.authService.register(email, password)
      .then(() => {
        this.registerForm.reset();
        this.router.navigate(['app/home']);
      });
  }


}
