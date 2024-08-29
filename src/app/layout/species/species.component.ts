import { Component, input, Input, OnInit, signal } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { Profile } from '../home/profile/profile.model';
import { ProfileService } from '../home/profile/profile.service';
import { SearchStoreService } from '../navigation/search.store.service';
import { Species } from './species.model';
import { SpeciesService } from './species.service';
import { ToggleFavEvent } from './plant/plant.component';

@Component({
    selector: 'app-find-plants',
    templateUrl: './species.component.html',
    styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements OnInit {
    isCollection = input(false);

    search = signal('');

    species: Species[] = [];
    speciesDetailsSub: Subscription;
    showModal = false;
    addingPlant = false;
    selectedSpecies = null;

    profile: Profile = null;

    constructor(
        private speciesService: SpeciesService,
        private profileService: ProfileService,
        private searchStoreService: SearchStoreService
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
        this.speciesService
            .fetchPlants()
            .pipe(
                tap((species: Species[]) => {
                    this.species = species;
                }),
                switchMap((species: Species[]) => {
                    return this.profileService.getProfile();
                })
            )
            .subscribe({
                next: (profile: Profile) => {
                    this.profile = profile;
                },
            });
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
        if (this.isCollection() && !this.profile) return false;
        if (!this.isCollection()) {
            if (!this.profile) return false;
            return (
                !this.profile.favorites.includes(id) &&
                (this.search() === '' ||
                    this.species[id].speciesName
                        .toLowerCase()
                        .includes(this.search().toLowerCase()))
            );
        }
        return (
            this.profile.favorites.includes(id) &&
            (this.search() === '' ||
                this.species[id].speciesName
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
}
