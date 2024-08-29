import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { Species } from '../species.model';

@Component({
    selector: 'app-plant-modal',
    templateUrl: './plant-modal.component.html',
    styleUrls: ['./plant-modal.component.scss'],
})
export class PlantModalComponent implements OnInit {
    @Input() plant!: Species;
    @Input() initialCollectionSize: number;
    @Input() isCollectionItem: boolean;
    @Output() closeModal = new EventEmitter();
    @Output() onItemsChanged = new EventEmitter();
    @Output() onChangeCollectionSize = new EventEmitter<number>();
    collectionSize = signal(0);

    isLoading = false;
    alertMessage = '';
    showAlert = false;

    ngOnInit(): void {
        this.collectionSize.set(this.initialCollectionSize);
    }

    onClose() {
        this.closeModal.emit();
    }

    onChangeCollectionSizeClick() {
        this.onChangeCollectionSize.emit(this.collectionSize());
    }
}
