import { Component, input, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profile } from '../home/profile/profile.model';
import { ProfileService } from '../home/profile/profile.service';
import { ProfileStoreService } from '../home/profile/profile.store.service';
import { SearchStoreService } from '../navigation/search.store.service';
import { ToggleFavEvent } from './plant/plant.component';
import { SpeciesStoreService } from './species.store.service';
import { Species } from './species.model';
import { SpeciesService } from './species.service';

@Component({
    selector: 'app-find-plants',
    templateUrl: './species.component.html',
    styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {
    isCollection = input(false);

    search = signal('');

    speciesDetailsSub: Subscription;
    showModal = false;
    addingPlant = false;
    selectedSpecies = null;

    constructor(
        private readonly speciesService: SpeciesService,
        private readonly profileService: ProfileService,
        private readonly searchStoreService: SearchStoreService,
        readonly profileStoreService: ProfileStoreService,
        readonly plantsStoreService: SpeciesStoreService
    ) {}

    ngOnInit(): void {
        this.reloadSpecies();
        this.searchStoreService.search$.subscribe({
            next: (search: string) => {
                this.search.set(search);
            },
        });
    }

    reloadSpecies() {
        this.speciesService.fetchApprovedSpecies().subscribe();
        this.profileService.getProfile().subscribe();
    }

    onShowDetails(species: Species) {
        this.selectedSpecies = species;
        this.showModal = true;
    }

    onCloseDetails() {
        this.selectedSpecies = null;
        this.showModal = false;
    }

    showItem(id: number): boolean {
        const profile = this.profileStoreService.profile();
        const plants = this.plantsStoreService.state();

        if (this.isCollection() && !profile) return false;
        if (!this.isCollection()) {
            if (!profile) return false;
            return (
                !profile.favorites.includes(id) &&
                (this.search() === '' ||
                    plants[id].speciesName
                        .toLowerCase()
                        .includes(this.search().toLowerCase()))
            );
        }
        return (
            profile.favorites.includes(id) &&
            (this.search() === '' ||
                plants[id].speciesName
                    .toLowerCase()
                    .includes(this.search().toLowerCase()))
        );
    }

    onItemRemovedFromCollection() {
        this.reloadSpecies();
    }

    onAddPlantClick() {
        this.addingPlant = true;
    }

    onCloseAddPlantView() {
        this.addingPlant = false;
    }

    onToggleFavorite(event: ToggleFavEvent) {
        const plantId = event.plant.id;
        if (event.toggle) {
            this.profileService.addPlantToFavorites(plantId).subscribe({
                next: () => {
                    this.reloadSpecies();
                },
            });
        } else {
            this.profileService.removePlantFromFavorites(plantId).subscribe({
                next: () => {
                    this.reloadSpecies();
                },
            });
        }
    }

    collectionSize(selectedPlant: Species) {
        return this.profileStoreService.collectionMap()[selectedPlant.id] ?? 0;
    }

    onChangeCollectionSize(newSize: number) {
        const id = this.selectedSpecies.id ?? -1;
        this.profileService.changeCollectionSize(id, newSize).subscribe();
    }
}
