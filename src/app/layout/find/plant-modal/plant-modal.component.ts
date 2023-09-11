import { Component, Input } from '@angular/core';
import { Species } from '../species.model';

@Component({
  selector: 'app-plant-modal',
  templateUrl: './plant-modal.component.html',
  styleUrls: ['./plant-modal.component.scss']
})
export class PlantModalComponent {
  
  @Input() plant!: Species;
}
