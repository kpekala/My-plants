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
  @Input() isCollectionItem: boolean;
  @Output() closeModal = new EventEmitter();
  @Output() onItemRemovedFromCollection = new EventEmitter();

  isLoading = false;
  alertMessage = "";
  showAlert = false;

  constructor(private profileService: ProfileService) {}

  onClose(){
    this.closeModal.emit();
  }

  onAddToCollection() {
    this.isLoading = true;
    this.profileService.addSpeciesToCollection(this.plant.id)
      .subscribe({
        next: () => {
          this.openAlert("Succesfully added item to your collection!");
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.openAlert('Error adding species to collection!');
        }
      });
  }

  onRemoveFromCollection() {
    this.isLoading = true;
    this.profileService.removeSpeciesFromCollection(this.plant.id)
      .subscribe({
        next: () => {
          this.onItemRemovedFromCollection.emit();
          this.isLoading = false;
          this.openAlert('Succesfully removed item from your collection!');
        },
        error: () => {
          this.isLoading = false;
          this.openAlert('Error removing item from collection!');
        }
      });
  }

  onAlertClose() {
    this.showAlert = false;
    this.alertMessage = '';
    this.closeModal.emit();
  }

  openAlert(message) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
