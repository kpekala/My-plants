import { Component, computed, OnInit } from '@angular/core';
import { ProfileService } from '../home/profile/profile.service';
import { ProfileStoreService } from '../home/profile/profile.store.service';
import { SpeciesService } from '../species/species.service';
import { switchMap } from 'rxjs';
import { PlantsStoreService } from '../species/plants.store.service';
import { Species } from '../species/species.model';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-garden',
    standalone: true,
    imports: [NgbAccordionModule],
    templateUrl: './garden.component.html',
    styleUrl: './garden.component.scss',
})
export class GardenComponent implements OnInit {
    items = [];
    plants = computed(() => this.plantsStoreService.state());
    profile = computed(() => this.profileStoreService.profile());

    constructor(
        private readonly profileService: ProfileService,
        private readonly profileStoreService: ProfileStoreService,
        private readonly speciesService: SpeciesService,
        private readonly plantsStoreService: PlantsStoreService
    ) {}

    ngOnInit(): void {
        this.speciesService
            .fetchPlants()
            .pipe(switchMap(() => this.profileService.getProfile()))
            .subscribe({
                next: () => {
                    Object.entries(
                        this.profileStoreService.collectionMap()
                    ).forEach(([id, count]) => {
                        console.log(id, count);
                        this.items.push({
                            id: Number(id),
                            arr: Array(count).fill({}),
                        });
                    });
                },
            });
    }

    findPlant(id: number): Species {
        return this.plants().filter((plant) => plant.id === id)[0];
    }
}
