import { Injectable } from '@angular/core';
import { ProfileService } from '../home/profile/profile.service';
import { of, switchMap } from 'rxjs';
import { Profile } from '../home/profile/profile.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
    constructor(private readonly profileService: ProfileService) {}

    isAdmin() {
        return this.profileService.getProfile().pipe(
            switchMap((profile: Profile) => {
                return of(profile.email === 'kgpekala@gmail.com');
            })
        );
    }
}
