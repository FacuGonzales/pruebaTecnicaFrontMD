import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderSubject.asObservable();

  constructor() { }

  viewLoader() {
    this.loaderSubject.next(true);
  }

  disabledLoader() {
    this.loaderSubject.next(false);
  }
}
