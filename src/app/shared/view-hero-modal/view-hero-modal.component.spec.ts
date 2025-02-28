import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeroModalComponent } from './view-hero-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShDataService } from '../../services/sh-data.service';
import { MOCK_HEROES_LIST } from '../../../assets/mocks/mocks';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('ViewHeroModalComponent', () => {
  let component: ViewHeroModalComponent;
  let fixture: ComponentFixture<ViewHeroModalComponent>;
  let shDataService: ShDataService;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ViewHeroModalComponent>>;

  class MOCK_SH_DATA {
    getHeroById() {
      return of(MOCK_HEROES_LIST[0])
    }
  }

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    dialogRef.close.and.returnValue()


    await TestBed.configureTestingModule({
      imports: [ViewHeroModalComponent, MatDialogModule, TranslateModule.forRoot()],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 1 },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: ShDataService, useClass: MOCK_SH_DATA },
        TranslateService,
        provideHttpClient(withFetch())
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHeroModalComponent);
    component = fixture.componentInstance;
    shDataService = TestBed.inject(ShDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getHeroesById on ngOnInit', () => {
    const spy = spyOn(shDataService, 'getHeroById').and.callThrough();
    component.data = 1;
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.hero).toEqual(MOCK_HEROES_LIST[0]);
  });


  it('should call dialogRef.close on close', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });


  it('should unsubscribe on ngOnDestroy', () => {
    const destroySpy = spyOn((component as any).destroy$, 'next');
    const completeSpy = spyOn((component as any).destroy$, 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call dialogRef.close on close', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
