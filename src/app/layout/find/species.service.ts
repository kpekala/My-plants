import {Injectable} from "@angular/core";
import {Species} from "./species.model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FindPlantsService{

    private speciesUrl = 'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species.json';

    private plantTypes: Species[] = [];

    private showRecipeDetails = new Subject<Species>();

     constructor(private http: HttpClient){
    }

    fetchPlants(): Observable<Species[]>{
        return this.http.get<Species[]>(this.speciesUrl);
    }

    onShowRecipeDetails(plant: Species){
        this.showRecipeDetails.next(plant);
    }
}
