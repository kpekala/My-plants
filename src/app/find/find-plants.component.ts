import { Component, OnInit } from '@angular/core';
import { FindPlantsService } from './find-plants.service';
import { PlantType } from './plant-type.model';

@Component({
  selector: 'app-find-plants',
  templateUrl: './find-plants.component.html',
  styleUrls: ['./find-plants.component.scss']
})
export class FindPlantsComponent implements OnInit{

  constructor (private findPlantsService: FindPlantsService){
  }

  ngOnInit(): void {
    this.findPlantsService.find.subscribe((plantTypes: PlantType[]) =>{
        console.log(plantTypes);
    });
  }
}
