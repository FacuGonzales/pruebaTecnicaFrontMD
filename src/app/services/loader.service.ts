import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderSubject.asObservable();

  constructor() { }

  viewLoader() {
    console.log('Loader: Showing loader');
    this.loaderSubject.next(true);
  }

  disabledLoader() {
    console.log('Loader: Hiding loader');
    this.loaderSubject.next(false);
  }
}
