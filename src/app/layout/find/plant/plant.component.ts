import { Component, Input } from '@angular/core';
import { Species } from '../species.model';
import { SpeciesService } from '../species.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent {
  @Input() plant!: Species;

  constructor(private speciesService: SpeciesService){

  }

  onShowDetails(){
    this.speciesService.onShowRecipeDetails(this.plant);
  }
}
