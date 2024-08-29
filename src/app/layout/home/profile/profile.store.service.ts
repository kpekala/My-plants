import { Injectable, signal } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileStoreService {
    readonly profile = signal(null);

    setProfile(profile: Profile) {
        this.profile.set(profile);
    }
}
