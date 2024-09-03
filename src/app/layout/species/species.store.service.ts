import { Injectable, signal } from '@angular/core';
import { Species } from './species.model';

@Injectable({ providedIn: 'root' })
export class SpeciesStoreService {
    readonly state = signal([]);

    setSpecies(species: Species[]) {
        this.state.set(species);
    }

    findById(id: number): Species {
        return this.state().filter((s) => s.id === id)[0];
    }
}
