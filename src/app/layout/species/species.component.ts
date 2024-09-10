import { Component, input, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../home/profile/profile.service';
import { ProfileStoreService } from '../home/profile/profile.store.service';
import { SearchStoreService } from '../navigation/search.store.service';
import { ChangeSizeState } from './plant-modal/plant-modal.component';
import { ToggleFavEvent } from './plant/plant.component';
import { Species } from './species.model';
import { SpeciesService } from './species.service';
import { SpeciesStoreService } from './species.store.service';
import { ToastService } from 'src/app/shared/toasts-container/toast.service';

@Component({
    selector: 'app-find-plants',
    templateUrl: './species.component.html',
    styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {
    isCollection = input(false);

    search = signal('');
    changeSizeState = signal(ChangeSizeState.NOTHING);

    speciesDetailsSub: Subscription;
    showModal = false;
    addingPlant = false;
    selectedSpecies = null;

    constructor(
        private readonly speciesService: SpeciesService,
        private readonly profileService: ProfileService,
        private readonly searchStoreService: SearchStoreService,
        private readonly profileStoreService: ProfileStoreService,
        readonly plantsStoreService: SpeciesStoreService,
        private readonly toastService: ToastService
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
                    this.toastService.success('Plant added to favorites!');
                },
                error: () => {
                    this.toastService.error(
                        'Failed to add a plant to favorites!'
                    );
                },
            });
        } else {
            this.profileService.removePlantFromFavorites(plantId).subscribe({
                next: () => {
                    this.reloadSpecies();
                    this.toastService.success(
                        'Planted removed from favorites!'
                    );
                },
                error: () => {
                    this.toastService.error(
                        'Failed to remove a plant from favorites!'
                    );
                },
            });
        }
    }

    collectionSize(selectedPlant: Species) {
        return this.profileStoreService.collectionMap()[selectedPlant.id] ?? 0;
    }

    onChangeCollectionSize(newSize: number) {
        const id = this.selectedSpecies.id ?? -1;
        this.changeSizeState.set(ChangeSizeState.LOADING);
        this.profileService.changeCollectionSize(id, newSize).subscribe({
            next: () => {
                this.changeSizeState.set(ChangeSizeState.NOTHING);
                this.toastService.success(
                    'Successfully changed collection size!'
                );
            },
            error: () => {
                this.changeSizeState.set(ChangeSizeState.ERROR);
                this.toastService.error('Failed to change collection size!');
            },
        });
    }
}
