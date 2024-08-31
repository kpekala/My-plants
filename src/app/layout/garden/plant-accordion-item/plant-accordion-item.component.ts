import { Component, input, output } from '@angular/core';
import { SpecificPlant } from '../../home/profile/profile.model';

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
    onWaterPlantClick = output<number>();

    handleWaterPlantClick(id: number) {
        this.onWaterPlantClick.emit(id);
    }

    lastTimeWatered(plant: SpecificPlant) {
        const dateString = new Date(plant.lastTimeWatered)?.toUTCString();
        return dateString === 'Invalid Date' ? 'never' : dateString;
    }
}
