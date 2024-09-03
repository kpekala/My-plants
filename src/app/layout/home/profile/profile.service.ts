import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, tap, toArray } from 'rxjs';
import { getStorage, ref } from 'firebase/storage';
import { LocalStorageService } from 'src/app/data/local-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SpeciesService } from '../../species/species.service';
import { ProfileStoreService } from './profile.store.service';
import { SpeciesStoreService } from '../../species/species.store.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private profileUrl =
        'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/profiles';

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private speciesService: SpeciesService,
        private profileStoreService: ProfileStoreService,
        private readonly speciesStoreService: SpeciesStoreService
    ) {}

    createProfile(
        userId: string,
        username: string,
        email: string
    ): Observable<any> {
        const newProfile = new Profile(email, username, '', [], []);
        return this.http
            .put(`${this.profileUrl}/${userId}.json`, newProfile)
            .pipe(
                tap((result) => {
                    this.localStorageService.saveData('profile-id', userId);
                })
            );
    }

    deleteProfile(userId: string): Observable<any> {
        return this.http.delete(`${this.profileUrl}/${userId}.json`);
    }

    getProfile(): Observable<any> {
        const userId = this.authService.getUserId();
        return this.http.get<any>(`${this.profileUrl}/${userId}.json`).pipe(
            map((profile: Profile) => {
                if (!profile.favorites) profile.favorites = [];
                if (!profile.collection) profile.collection = [];
                return profile;
            }),
            tap((profile) => {
                this.profileStoreService.setProfile(profile);
                this.profileStoreService.setCollectionMap(
                    this.parseCollection(profile)
                );
            })
        );
    }

    updateProfile(profile: Profile) {
        const userId = this.authService.getUserId();
        return this.http
            .patch(`${this.profileUrl}/${userId}.json`, profile)
            .pipe(
                tap(() => {
                    this.profileStoreService.setProfile(profile);
                })
            );
    }

    addPlantToFavorites(speciesId: number) {
        return this.getProfile().pipe(
            map((profile: Profile) => {
                const collection = profile.favorites ? profile.favorites : [];
                collection.push(speciesId);
                profile.favorites = collection;
                return profile;
            }),
            switchMap((profile: Profile) => this.updateProfile(profile)),
            switchMap(() =>
                this.speciesService.changeSpeciesPopularity(speciesId, 1)
            )
        );
    }

    removePlantFromFavorites(speciesId: number) {
        return this.getProfile().pipe(
            map((profile: Profile) => {
                const collection = profile.favorites ? profile.favorites : [];
                const index = collection.indexOf(speciesId);
                if (index !== -1) {
                    collection.splice(index, 1);
                }
                profile.favorites = collection;
                return profile;
            }),
            switchMap((profile: Profile) => this.updateProfile(profile)),
            switchMap(() =>
                this.speciesService.changeSpeciesPopularity(speciesId, -1)
            )
        );
    }

    changeCollectionSize(plantId: number, newSize: number) {
        const profile: Profile = this.profileStoreService.profile();
        const oldSize = this.profileStoreService.collectionMap()[plantId] ?? 0;
        const size = newSize - oldSize;
        const species = this.speciesStoreService.findById(plantId);
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                profile.collection.push({
                    id: plantId,
                    plantId: profile.collection.length,
                    lastTimeWatered: null,
                    plantName: species.speciesName + ' No. ' + (oldSize + 1),
                });
            }
            return this.updateProfile(profile).pipe(
                tap(() => {
                    this.profileStoreService.setCollectionMap(
                        this.parseCollection(profile)
                    );
                })
            );
        }
        return of();
    }

    public parseCollection(profile: Profile) {
        const collectionMap = {};
        console.log(profile);
        profile.collection.forEach((item) => {
            if (item && item.id !== undefined) {
                const idString = `${item.id}`;
                if (!collectionMap[idString]) {
                    collectionMap[idString] = 1;
                } else {
                    collectionMap[idString] += 1;
                }
            }
        });
        return collectionMap;
    }
}
