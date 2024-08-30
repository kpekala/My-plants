import { Component, input } from '@angular/core';
import { Species } from '../../species/species.model';

@Component({
    selector: 'app-plant-accordion-item',
    standalone: true,
    imports: [],
    templateUrl: './plant-accordion-item.component.html',
    styleUrl: './plant-accordion-item.component.scss',
})
export class PlantAccordionItemComponent {
    plantName = input();
    plantsFromOneSpecies = input<any>();
}
