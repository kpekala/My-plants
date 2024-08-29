import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Species } from '../species.model';

@Component({
    selector: 'app-plant-modal',
    templateUrl: './plant-modal.component.html',
    styleUrls: ['./plant-modal.component.scss'],
})
export class PlantModalComponent {
    @Input() plant!: Species;
    @Input() initialCollectionSize: number;
    @Input() isCollectionItem: boolean;
    @Output() closeModal = new EventEmitter();
    @Output() onItemsChanged = new EventEmitter();

    collectionSize = signal(0);

    isLoading = false;
    alertMessage = '';
    showAlert = false;

    constructor() {
        this.collectionSize.set(this.initialCollectionSize);
    }

    onClose() {
        this.closeModal.emit();
    }
}
