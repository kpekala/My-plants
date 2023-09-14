import { Component, Input, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { FirebaseStorageService } from 'src/app/data/firebase-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() profile: Profile; 

  imagePath = '';

  constructor(private storageService: FirebaseStorageService){

  }

  ngOnInit(): void {
    let imageSub = null;
    if(this.profile.imagePath === '')
      imageSub = this.storageService.getDefaultProfileImageUrl();
    else
      imageSub = this.storageService.getImageDownloadUrl(this.profile.imagePath);
    
    imageSub.then(imagePath => {
      this.imagePath = imagePath;
    })
    }
}
