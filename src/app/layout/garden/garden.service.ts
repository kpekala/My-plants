import { Injectable } from '@angular/core';
import { SpeciesStoreService } from '../species/species.store.service';
import { SpeciesService } from '../species/species.service';
import { switchMap, tap } from 'rxjs';
import { ProfileService } from '../home/profile/profile.service';
import { ProfileStoreService } from '../home/profile/profile.store.service';
import { GardenPlantsStoreService } from './garden-plants.store.service';
import { GardenSpecies } from './plant-accordion-item/garden.model';

@Injectable({ providedIn: 'root' })
export class GardenService {
    constructor(
        private readonly profileService: ProfileService,
        private readonly profileStoreService: ProfileStoreService,
        private readonly speciesService: SpeciesService,
        private readonly gardenSpeciesStoreService: GardenPlantsStoreService,
        private readonly speciesStoreService: SpeciesStoreService
    ) {}

    fetchGardenData() {
        return this.speciesService
            .fetchPlants()
            .pipe(switchMap(() => this.profileService.getProfile()))
            .pipe(
                tap(() => {
                    const speciesList: GardenSpecies[] = [];
                    Object.entries(
                        this.profileStoreService.collectionMap()
                    ).forEach(([id, count]) => {
                        const idNumb = Number(id);
                        const specificPlants = this.profileStoreService
                            .profile()
                            .collection.filter((plant) => plant.id === idNumb);
                        speciesList.push({
                            speciesId: idNumb,
                            species: this.speciesStoreService.findById(idNumb),
                            specificPlants,
                        });
                    });
                    this.gardenSpeciesStoreService.setGardenSpecies(
                        speciesList
                    );
                })
            );
    }

    waterPlant(id: number) {
        const profile = this.profileStoreService.profile();
        profile.collection = profile.collection.map((plant) => {
            if (plant.id === id) {
                plant.lastTimeWatered = new Date();
            }
            return plant;
        });
        return this.profileService.updateProfile(profile).pipe(
            tap(() => {
                this.profileStoreService.setProfile(profile);
            })
        );
    }
}
