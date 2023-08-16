import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onRegisterButtonClicked(){
    this.authService.register(this.email, this.password)
      .then(() => {
        this.router.navigate(['app/home']);
      });
  }

  
}
