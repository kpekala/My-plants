import { Component, OnInit, signal } from '@angular/core';
import { Species } from '../species/species.model';
import { SpeciesService } from '../species/species.service';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
    pendingSpecies = signal<Species[]>(null);

    constructor(private readonly speciesService: SpeciesService) {}

    ngOnInit(): void {
        this.reloadSpecies();
    }

    private reloadSpecies() {
        this.speciesService.fetchPendingSpecies().subscribe({
            next: (species: Species[]) => {
                this.pendingSpecies.set(species);
            },
        });
    }

    onApproveClick(species: Species) {
        this.speciesService.approveSpecies(species).subscribe({
            next: () => {
                this.reloadSpecies();
            },
        });
    }
}
