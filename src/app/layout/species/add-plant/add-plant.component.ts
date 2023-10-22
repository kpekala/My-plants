import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewSpecies, Species } from '../species.model';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent {

  @Output() close = new EventEmitter<any>(); 

  plant: NewSpecies = new NewSpecies();
  isSaving = false;

  onClose() {
    this.close.emit();
  }

  onAdd() {
  }
}
