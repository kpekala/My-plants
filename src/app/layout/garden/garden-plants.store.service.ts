import { Injectable, signal } from '@angular/core';
import { GardenSpecies } from './plant-accordion-item/garden.model';
import { Profile } from '../home/profile/profile.model';
import { SpeciesStoreService } from '../species/species.store.service';

@Injectable({ providedIn: 'root' })
export class GardenPlantsStoreService {
    constructor(private readonly speciesStoreService: SpeciesStoreService) {}

    readonly gardenPlants = signal<GardenSpecies[]>([]);

    setGardenSpecies(plants: GardenSpecies[]) {
        this.gardenPlants.set(plants);
    }

    updateGardenSpecies(profile: Profile, collectionMap) {
        const speciesList: GardenSpecies[] = [];
        Object.entries(collectionMap).forEach(([id, count]) => {
            const idNumb = Number(id);
            const specificPlants = profile.collection
                .filter((plant) => plant.id === idNumb)
                .map((plant) => {
                    return { ...plant };
                });
            speciesList.push({
                speciesId: idNumb,
                species: this.speciesStoreService.findById(idNumb),
                specificPlants,
            });
        });
        this.setGardenSpecies(speciesList);
    }
}
