import { Injectable, signal } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileStoreService {
    readonly profile = signal(null);
    readonly collectionMap = signal<object>({});

    setProfile(profile: Profile) {
        this.profile.set(profile);
    }

    setCollectionMap(map) {
        this.collectionMap.set(map);
    }
}
