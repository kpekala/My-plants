import { Component, OnInit } from '@angular/core';
import { SpeciesService } from './species.service';
import { Species } from './species.model';

@Component({
  selector: 'app-find-plants',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class FindPlantsComponent implements OnInit{

  plantTypes: Species[] = [];

  showModal = false;

  constructor (private findPlantsService: SpeciesService){

  }

  ngOnInit(): void {
    this.findPlantsService.fetchPlants().subscribe({
      next: (species: Species[]) => {
        this.plantTypes = species;
      }
    }); 
  }
}
