import { Component, input, OnInit, output, signal } from '@angular/core';
import { SpecificPlant } from '../../home/profile/profile.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-plant-accordion-item',
    standalone: true,
    imports: [NgbDropdownModule, FormsModule],
    templateUrl: './plant-accordion-item.component.html',
    styleUrl: './plant-accordion-item.component.scss',
})
export class PlantAccordionItemComponent implements OnInit {
    plantName = input();
    plantsFromOneSpecies = input<any>();
    onWaterPlantClick = output<number>();
    onRemovePlantClick = output<number>();
    onRenamePlant = output<{ id: number; newName: string }>();

    showPlantNameInput = signal(false);
    plantNameInput = signal('');
    inputId = signal(0);

    ngOnInit(): void {
        this.plantNameInput.set('');
    }

    handleWaterPlantClick(id: number) {
        this.onWaterPlantClick.emit(id);
    }

    lastTimeWatered(plant: SpecificPlant) {
        const dateString = new Date(plant.lastTimeWatered)?.toDateString();
        return dateString === 'Invalid Date' ? 'never' : dateString;
    }

    handleRenamePlant() {
        this.onRenamePlant.emit({
            id: this.inputId(),
            newName: this.plantNameInput(),
        });
        this.showPlantNameInput.set(false);
    }

    handleRemovePlant(id: number) {
        this.onRemovePlantClick.emit(id);
    }

    onPlantNameClick(plant: SpecificPlant) {
        this.showPlantNameInput.set(true);
        this.inputId.set(plant.plantId);
    }

    onKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.handleRenamePlant();
        }
    }
}
