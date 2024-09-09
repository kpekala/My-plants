import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NewSpecies, Species } from './species.model';
import { SpeciesStoreService } from './species.store.service';

@Injectable({
    providedIn: 'root',
})
export class SpeciesService {
    private speciesFinalUrl =
        'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species.json';
    private speciesUrl =
        'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species/';

    constructor(
        private readonly http: HttpClient,
        private readonly speciesStoreService: SpeciesStoreService,
        private readonly authService: AuthService
    ) {}

    fetchAllSpecies() {
        return this.http.get<Species[]>(this.speciesFinalUrl).pipe(
            map((speciesMap: object) => {
                const entries = Object.entries(speciesMap);
                const species = [];
                for (let i = 0; i < entries.length; i++) {
                    const id = entries[i][1].id;
                    if (id === undefined || id === null) entries[i][1].id = i;
                    species.push(entries[i][1]);
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
                console.log(species);
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

    updateSpecies(species: Species): Observable<any> {
        return this.authService.getUserToken().pipe(
            switchMap((token: string) => {
                const params = {
                    auth: token,
                };
                const url = `${this.speciesUrl}/${species.id}.json`;
                return this.http.put(url, species, { params });
            })
        );
    }

    changeSpeciesPopularity(
        speciesId: number,
        popularityChange: number
    ): Observable<any> {
        const species = this.speciesStoreService.findById(speciesId);
        species.ownersCount += popularityChange;
        return this.updateSpecies(species);
    }

    addSpecies(plant: NewSpecies) {
        const species = plant.mapToSpecies();
        species.id = new Date().getTime();
        return this.authService.getUserToken().pipe(
            switchMap((token: string) => {
                const params = {
                    auth: token,
                };
                const url = `${this.speciesUrl}/${species.id}.json`;
                return this.http.put(url, species, { params });
            })
        );
    }

    approveSpecies(species: Species) {
        return this.authService.getUserToken().pipe(
            switchMap((token: string) => {
                const params = {
                    auth: token,
                };
                const url = `${this.speciesUrl}/${species.id}.json`;
                species.pending = false;
                console.log(species);
                return this.http.put(url, species, { params });
            })
        );
    }
}
