import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchStoreService {
  private readonly _search = new BehaviorSubject<string>('');
  readonly search$ = this._search.asObservable();

  setSearch(search: string) {
    this._search.next(search);
  }
}
