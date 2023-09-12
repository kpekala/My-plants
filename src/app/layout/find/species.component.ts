import { Component, OnInit } from '@angular/core';
import { SpeciesService } from './species.service';
import { Species } from './species.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-plants',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class FindPlantsComponent implements OnInit{

  species: Species[] = [];

  speciesDetailsSub: Subscription;

  showModal = false;

  selectedSpecies = null;

  constructor (private speciesService: SpeciesService){

  }

  ngOnInit(): void {
    this.speciesService.fetchPlants().subscribe({
      next: (species: Species[]) => {
        this.species = species;
      }
    });
  }

  onShowDetails(species: Species){
    this.selectedSpecies = species;
    this.showModal = true;
  }
}
