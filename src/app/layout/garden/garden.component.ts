import { NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Species } from '../species/species.model';
import { SpeciesStoreService } from '../species/species.store.service';
import { PlantAccordionItemComponent } from './plant-accordion-item/plant-accordion-item.component';
import { GardenPlantsStoreService } from './garden-plants.store.service';
import { GardenService } from './garden.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-garden',
    standalone: true,
    imports: [NgbAccordionModule, NgIf, PlantAccordionItemComponent],
    templateUrl: './garden.component.html',
    styleUrl: './garden.component.scss',
})
export class GardenComponent implements OnInit {
    speciesList = [];

    constructor(
        private readonly speciesStoreService: SpeciesStoreService,
        readonly gardenPlantsStoreService: GardenPlantsStoreService,
        private readonly gardenService: GardenService,
        private readonly destroyRef: DestroyRef
    ) {}

    ngOnInit(): void {
        this.gardenService
            .fetchGardenData()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    findPlant(id: number): Species {
        return this.speciesStoreService
            .state()
            .filter((plant) => plant.id === id)[0];
    }

    handleWaterPlantClick(id: number) {
        this.gardenService
            .waterPlant(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    handleRemovePlantClick(id: number) {
        this.gardenService
            .removePlant(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    handleRenamePlant(event: { id: number; newName: string }) {
        this.gardenService
            .renamePlant(event.id, event.newName)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
}
