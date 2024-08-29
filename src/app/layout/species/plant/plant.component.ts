import { Component, input, OnInit, output, signal } from '@angular/core';
import { Species } from '../species.model';

export interface ToggleFavEvent {
    toggle: boolean;
    plant: Species;
}

@Component({
    selector: 'app-plant',
    templateUrl: './plant.component.html',
    styleUrls: ['./plant.component.scss'],
})
export class PlantComponent implements OnInit {
    plant = input<Species>();
    isCollection = input<boolean>();
    showDetails = output<Species>();
    onToggleFavorite = output<ToggleFavEvent>();

    isFavorite = signal(false);
    isMouseOnFavorite = signal(false);

    constructor() {}

    ngOnInit(): void {
        this.isFavorite.set(this.isCollection());
    }

    onShowDetails() {
        this.showDetails.emit(this.plant());
    }

    onToggleFav() {
        this.isFavorite.update((isFav) => !isFav);
        this.onToggleFavorite.emit({
            toggle: this.isFavorite(),
            plant: this.plant(),
        });
    }

    onFavoriteMouseEnter() {
        this.isMouseOnFavorite.set(true);
    }

    onFavoriteMouseExit() {
        this.isMouseOnFavorite.set(false);
    }
}
