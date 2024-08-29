import { Injectable, signal } from '@angular/core';
import { Species } from './species.model';

@Injectable({ providedIn: 'root' })
export class PlantsStoreService {
    readonly state = signal(null);

    setPlants(plants: Species[]) {
        this.state.set(plants);
    }
}
