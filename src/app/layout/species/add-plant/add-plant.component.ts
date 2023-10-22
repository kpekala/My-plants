import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewSpecies, Species } from '../species.model';
import { SpeciesService } from '../species.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit{

  @Output() close = new EventEmitter<any>(); 

  plant: NewSpecies = new NewSpecies();
  isSaving = false;
  speciesForm: FormGroup;

  constructor(private speciesService: SpeciesService){

  }

  ngOnInit(): void {
    this.speciesForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'link': new FormControl('', Validators.required),
      'imageUrl': new FormControl('', Validators.required),
      'family': new FormControl('', Validators.required)
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.isSaving = true;
    this.speciesService.addSpecies(this.plant).subscribe({
      next: () => {
        this.isSaving = false;
        this.onClose();
      },error: (_) => {
        this.isSaving = false;
        this.onClose();
      }
    });
  }
}
