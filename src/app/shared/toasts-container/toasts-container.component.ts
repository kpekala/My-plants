import { Component, DestroyRef, OnInit } from '@angular/core';
import { Toast, ToastService, ToastType } from './toast.service';
import { AsyncPipe } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-toasts-container',
    standalone: true,
    imports: [AsyncPipe, NgbToastModule],
    templateUrl: './toasts-container.component.html',
    styleUrl: './toasts-container.component.scss',
})
export class ToastsContainerComponent implements OnInit {
    toasts: Toast[] = [];

    constructor(
        private readonly toastService: ToastService,
        private readonly destroyRef: DestroyRef
    ) {}

    ngOnInit(): void {
        this.toastService.toasts$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (toast: Toast) => {
                    this.toasts.push(toast);
                },
            });
    }
}
