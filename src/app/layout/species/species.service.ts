import { Injectable } from '@angular/core';
import { NewSpecies, Species } from './species.model';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SpeciesStoreService } from './species.store.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class SpeciesService {
    private speciesUrl =
        'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species.json';

    constructor(
        private readonly http: HttpClient,
        private readonly speciesStoreService: SpeciesStoreService,
        private readonly authService: AuthService
    ) {}

    fetchAllSpecies() {
        return this.http.get<Species[]>(this.speciesUrl).pipe(
            map((speciesMap: object) => {
                let species = Object.values(speciesMap);
                species = species.filter((s) => s !== null);
                for (let i = 0; i < species.length; i++) {
                    species[i].id = i;
                }
                return species;
            })
        );
    }

    fetchApprovedSpecies(): Observable<Species[]> {
        return this.fetchAllSpecies().pipe(
            map((species: Species[]) => {
                return species.filter((s) => !s.pending);
            }),
            tap((species) => {
                this.speciesStoreService.setSpecies(species);
            })
        );
    }

    fetchPendingSpecies() {
        return this.fetchAllSpecies().pipe(
            map((species: Species[]) => {
                return species.filter((s) => s.pending);
            })
        );
    }

    updateSpecies(species: Species[]): Observable<any> {
        return this.authService.getUserToken().pipe(
            switchMap((token: string) => {
                const params = {
                    auth: token,
                };
                return this.http.put(this.speciesUrl, species, { params });
            })
        );
    }

    changeSpeciesPopularity(
        speciesId: number,
        popularityChange: number
    ): Observable<any> {
        let fetchPlantsSub = this.fetchApprovedSpecies();
        return fetchPlantsSub.pipe(
            switchMap((species: Species[]) => {
                species[speciesId].ownersCount += popularityChange;
                return this.updateSpecies(species);
            })
        );
    }

    addSpecies(plant: NewSpecies) {
        const species = plant.mapToSpecies();
        species.id = new Date().getTime();

        return this.authService.getUserToken().pipe(
            switchMap((token: string) => {
                const params = {
                    auth: token,
                };
                return this.http.post(this.speciesUrl, species, { params });
            })
        );
    }
}
