import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewSpecies } from '../species.model';
import { SpeciesService } from '../species.service';

@Component({
    selector: 'app-add-plant',
    templateUrl: './add-plant.component.html',
    styleUrls: ['./add-plant.component.scss'],
})
export class AddPlantComponent implements OnInit {
    @Output() close = new EventEmitter<any>();

    isSaving = false;
    speciesForm: FormGroup;

    constructor(private speciesService: SpeciesService) {}

    ngOnInit(): void {
        this.speciesForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            link: new FormControl('', Validators.required),
            imageUrl: new FormControl('', Validators.required),
            family: new FormControl('', Validators.required),
        });
    }

    onClose() {
        this.close.emit();
    }

    onSave() {
        this.isSaving = true;

        const species = new NewSpecies(
            this.speciesForm.controls['name'].value,
            this.speciesForm.controls['imageUrl'].value,
            this.speciesForm.controls['family'].value,
            this.speciesForm.controls['description'].value,
            this.speciesForm.controls['link'].value
        );

        this.speciesService.addSpecies(species).subscribe({
            next: () => {
                this.isSaving = false;
                this.onClose();
            },
            error: (_) => {
                this.isSaving = false;
                this.onClose();
            },
        });
    }
}
