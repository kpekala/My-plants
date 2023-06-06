import {Injectable} from "@angular/core";
import {PlantType} from "./plant-type.model";

@Injectable({
    providedIn: 'root'
})
export class FindPlantsService{

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

    findPlants(): Promise<PlantType[]>{
        return new Promise((resolve) => {
            let plants = this.plantTypes.concat(this.plantTypes.concat(this.plantTypes));
            resolve(plants);
        })
    }
}
