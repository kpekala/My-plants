import { Component, OnInit } from '@angular/core';
import { Profile } from './profile/profile.model';
import { ProfileService } from './profile/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  profile: Profile;

  constructor(private profileService: ProfileService,
              private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.profile = data[0];
    });
  }
}
