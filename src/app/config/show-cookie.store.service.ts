import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShowCookieStoreService {
  private readonly _show = new Subject<void>();
  readonly show$ = this._show.asObservable();

  setShow() {
    this._show.next();
  }
}
