import { Injectable, signal } from '@angular/core';
import { GardenSpecies } from './plant-accordion-item/garden.model';

@Injectable({ providedIn: 'root' })
export class GardenPlantsStoreService {
    readonly gardenPlants = signal<GardenSpecies[]>([]);

    setGardenSpecies(plants: GardenSpecies[]) {
        this.gardenPlants.set(plants);
        console.log('siema');
    }
}
