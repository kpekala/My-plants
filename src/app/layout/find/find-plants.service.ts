import {Injectable} from "@angular/core";
import {PlantType} from "./plant-type.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FindPlantsService{

    private speciesUrl = 'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species.json';

    private plantTypes: PlantType[] = [];

     constructor(private http: HttpClient){
    }

    fetchPlants(): Observable<PlantType[]>{
        return this.http.get<PlantType[]>(this.speciesUrl);
    }
}
