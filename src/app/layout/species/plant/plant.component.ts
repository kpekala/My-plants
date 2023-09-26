import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Species } from '../species.model';
import { SpeciesService } from '../species.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent {
  @Input() plant!: Species;
  @Output() showDetails = new EventEmitter<Species>();

  constructor(private speciesService: SpeciesService){

  }

  onShowDetails(){
    this.showDetails.emit(this.plant)
  }
}
