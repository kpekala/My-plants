import {Injectable} from "@angular/core";
import {PlantType} from "./plant-type.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FindPlantsService{

    private speciesUrl = 'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/species.json';

    private plantTypes: PlantType[] = [
        {
            speciesName: 'Humulus',
            family: 'Cannabaceae',
            ownersCount: 23,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Humulus.jpg'

        },
        {
            speciesName: 'Dandelion',
            family: 'Asteraceae',
            ownersCount: 16,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Taraxacum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-135.jpg/330px-Taraxacum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-135.jpg'
        },
        {
            speciesName: 'Oak',
            family: 'beech',
            ownersCount: 5,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Quercus_robur.jpg'
        }
    ];

     constructor(private http: HttpClient){
        http.put(this.speciesUrl, this.plantTypes).subscribe(
            {next: () => {

            }, error: (error) => {
                console.log(error.message);
            }}
        );
    }

    fetchPlants(): Observable<PlantType[]>{
        return this.http.get<PlantType[]>(this.speciesUrl);
    }
}
