import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Profile } from '../home/profile/profile.model';
import { ProfileService } from '../home/profile/profile.service';
import { ProfileStoreService } from '../home/profile/profile.store.service';
import { SpeciesService } from '../species/species.service';
import { GardenPlantsStoreService } from './garden-plants.store.service';

@Injectable({ providedIn: 'root' })
export class GardenService {
    constructor(
        private readonly profileService: ProfileService,
        private readonly profileStoreService: ProfileStoreService,
        private readonly speciesService: SpeciesService,
        private readonly gardenSpeciesStoreService: GardenPlantsStoreService
    ) {}

    fetchGardenData() {
        return this.speciesService
            .fetchApprovedSpecies()
            .pipe(switchMap(() => this.profileService.getProfile()))
            .pipe(
                tap((profile: Profile) => {
                    this.gardenSpeciesStoreService.updateGardenSpecies(
                        profile,
                        this.profileStoreService.collectionMap()
                    );
                })
            );
    }

    waterPlant(id: number) {
        const profile = this.profileStoreService.profile();
        profile.collection = profile.collection.map((plant) => {
            if (plant.plantId === id) {
                plant.lastTimeWatered = new Date();
            }
            return plant;
        });
        return this.profileService.updateProfile(profile).pipe(
            tap(() => {
                this.gardenSpeciesStoreService.updateGardenSpecies(
                    profile,
                    this.profileStoreService.collectionMap()
                );
            })
        );
    }

    removePlant(plantId: number) {
        const profile = this.profileStoreService.profile();
        profile.collection = profile.collection.filter(
            (plant) => plant.plantId !== plantId
        );
        return this.profileService.updateProfile(profile).pipe(
            tap(() => {
                this.gardenSpeciesStoreService.updateGardenSpecies(
                    profile,
                    this.profileStoreService.collectionMap()
                );
            })
        );
    }

    renamePlant(plantId: number, newName: string) {
        const profile = this.profileStoreService.profile();
        profile.collection = profile.collection.map((plant) => {
            if (plant.plantId === plantId) {
                plant.plantName = newName;
            }
            return plant;
        });
        return this.profileService.updateProfile(profile).pipe(
            tap(() => {
                this.gardenSpeciesStoreService.updateGardenSpecies(
                    profile,
                    this.profileStoreService.collectionMap()
                );
            })
        );
    }
}
