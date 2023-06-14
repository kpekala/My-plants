import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/auth/login']);
    }
  }

}
