import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onLoginButtonClicked(){
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['app/home']);
      });
  }
}
