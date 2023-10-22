import {Injectable} from "@angular/core";
import {NewSpecies, Species} from "./species.model";
import { Observable, Subject, map, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SpeciesService{

    private speciesUrl = 'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species.json';

    constructor(private http: HttpClient){
    }

    fetchPlants(): Observable<Species[]>{
        return this.http.get<Species[]>(this.speciesUrl)
            .pipe(map((species: Species[]) => {
                for(let i=0; i<species.length; i++) {
                    species[i].id = i;
                }
                return species;
            }));
    }

    updateSpecies(species: Species[]): Observable<any> {
        return this.http.put(this.speciesUrl, species);
    }

    changeSpeciesPopularity(speciesId: number, popularityChange: number): Observable<any>{ 
        let fetchPlantsSub = this.fetchPlants();
        return fetchPlantsSub.pipe(
            switchMap((species: Species[]) => {
                species[speciesId].ownersCount += popularityChange;
                return this.updateSpecies(species);
            })
        )
    }

    addSpecies(plant: NewSpecies) {
        return this.fetchPlants().pipe(
            switchMap((species: Species[]) => {
                species.push(plant.mapToSpecies());
                return this.updateSpecies(species);
            }
        ))
    }
}
