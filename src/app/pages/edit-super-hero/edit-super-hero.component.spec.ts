import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { EditSuperHeroComponent } from './edit-super-hero.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShDataService } from '../../services/sh-data.service';
import { AlertsService } from '../../services/alerts.service';
import { MOCK_MESSAGE_CREATE, MOCK_CREATE_HERO } from '../../../assets/mocks/mocks';
import { ROUTES_CONST } from '../../constants/routes.constants';

describe('EditSuperHeroComponent', () => {
  let component: EditSuperHeroComponent;
  let fixture: ComponentFixture<EditSuperHeroComponent>;
  let shDataService: jasmine.SpyObj<ShDataService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  beforeEach(async () => {
    shDataService = jasmine.createSpyObj('ShDataService', ['getHeroById', 'createHero', 'updateDataHero']);
    alertsService = jasmine.createSpyObj('AlertsService', ['success', 'cancelEdit']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    activatedRoute = {
      url: new BehaviorSubject<UrlSegment[]>([]),
      params: new BehaviorSubject<any>({ id: 1 })
    };

    await TestBed.configureTestingModule({
      imports: [EditSuperHeroComponent, TranslateModule.forRoot(), BrowserAnimationsModule ],
      providers: [
        { provide: ShDataService, useValue: shDataService },
        { provide: AlertsService, useValue: alertsService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        TranslateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSuperHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set isNewHero and title for create mode', fakeAsync(() => {
    activatedRoute.url.next([new UrlSegment(ROUTES_CONST.CREATE, {})]);
    fixture.detectChanges();
    expect(component.isNewHero).toBeFalse();
    expect(component.title).toBe('EDIT.UPDATE');
  }));


  it('should navigate to home on cancel', () => {
    alertsService.cancelEdit.and.returnValue(of(true));
    component.cancel();
    fixture.detectChanges();
    expect(alertsService.cancelEdit).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([ROUTES_CONST.HOME]);
  });


  it('should call createHero for new hero', fakeAsync(() => {
    shDataService.createHero.and.returnValue(of(true));
    alertsService.success.and.returnValue(of(true));
    component.isNewHero = true;
    component.save(MOCK_CREATE_HERO);
    fixture.detectChanges();
    expect(shDataService.createHero).toHaveBeenCalledWith(MOCK_CREATE_HERO);
    expect(alertsService.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([ROUTES_CONST.HOME]);
  }));


  it('should call updateHero for existing hero', fakeAsync(() => {
    shDataService.updateDataHero.and.returnValue(of(true));
    alertsService.success.and.returnValue(of(true));
    component.isNewHero = false;
    component.save(MOCK_CREATE_HERO);
    fixture.detectChanges();
    expect(shDataService.updateDataHero).toHaveBeenCalledWith(MOCK_CREATE_HERO);
    expect(alertsService.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([ROUTES_CONST.HOME]);
  }));


  it('should navigate to home on confirm', fakeAsync(() => {
    alertsService.success.and.returnValue(of(true));
    component.confirm(MOCK_MESSAGE_CREATE);
    fixture.detectChanges();
    expect(alertsService.success).toHaveBeenCalledWith(MOCK_MESSAGE_CREATE);
    expect(router.navigate).toHaveBeenCalledWith([ROUTES_CONST.HOME]);
  }));


  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
