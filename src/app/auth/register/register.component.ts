import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onRegisterButtonClicked(){
    this.authService.register(this.email, this.password)
      .then(() => {
      });
  }

  
}
