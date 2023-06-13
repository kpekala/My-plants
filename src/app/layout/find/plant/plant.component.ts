import { Component, Input } from '@angular/core';
import { PlantType } from '../plant-type.model';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent {
  @Input() plant!: PlantType;
}
