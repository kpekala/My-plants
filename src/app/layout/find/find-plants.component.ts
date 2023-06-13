import { Component, OnInit } from '@angular/core';
import { FindPlantsService } from './find-plants.service';
import { PlantType } from './plant-type.model';

@Component({
  selector: 'app-find-plants',
  templateUrl: './find-plants.component.html',
  styleUrls: ['./find-plants.component.scss']
})
export class FindPlantsComponent implements OnInit{

  plantTypes: PlantType[] = [];

  constructor (private findPlantsService: FindPlantsService){

  }

  ngOnInit(): void {
    this.findPlantsService.findPlants()
      .then((plantTypes: PlantType[]) =>{
        this.plantTypes = plantTypes;
        console.log(plantTypes)
      });
  }
}
