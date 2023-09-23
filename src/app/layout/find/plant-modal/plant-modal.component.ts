import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Species } from '../species.model';
import { SpeciesService } from '../species.service';
import { ProfileService } from '../../home/profile/profile.service';

@Component({
  selector: 'app-plant-modal',
  templateUrl: './plant-modal.component.html',
  styleUrls: ['./plant-modal.component.scss']
})
export class PlantModalComponent {
  
  @Input() plant!: Species;
  @Output() closeModal = new EventEmitter();

  constructor(private profileService: ProfileService) {}

  onClose(){
    this.closeModal.emit();
  }

  onAddToCollection() {
    this.profileService.addSpeciesToCollection(this.plant.id)
      .subscribe({
        next: () => {
          alert('Species added to collection!');
        },
        error: () => {
          alert('Error adding species to collection!');
        }
      });
  }
}
