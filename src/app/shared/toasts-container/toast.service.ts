import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ToastType {
    SUCCESS = 1,
    INFO = 2,
    ERROR = 3,
}

export interface Toast {
    type: ToastType;
    message: string;
    className: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts$ = new Subject<Toast>();

    success(message: string) {
        this.toasts$.next({
            message,
            type: ToastType.SUCCESS,
            className: 'bg-success text-light',
        });
    }

    info(message: string) {
        this.toasts$.next({ message, type: ToastType.INFO, className: '' });
    }

    error(message: string) {
        this.toasts$.next({
            message,
            type: ToastType.ERROR,
            className: 'bg-success text-light',
        });
    }
}
