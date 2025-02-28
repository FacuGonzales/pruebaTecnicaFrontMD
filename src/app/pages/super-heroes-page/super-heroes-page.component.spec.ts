import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperHeroesPageComponent } from './super-heroes-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShDataService } from '../../services/sh-data.service';
import { ModalService } from '../../services/modal.service';
import { AlertsService } from '../../services/alerts.service';
import { ROUTES_CONST } from '../../constants/routes.constants';
import { MOCK_HEROES_LIST } from '../../../assets/mocks/mocks';

describe('SuperHeroesPageComponent', () => {
  let component: SuperHeroesPageComponent;
  let fixture: ComponentFixture<SuperHeroesPageComponent>;
  let shDataService: jasmine.SpyObj<ShDataService>;
  let modalService: jasmine.SpyObj<ModalService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    shDataService = jasmine.createSpyObj('ShDataService', ['getHeroes', 'filterByName', 'deleteHero']);
    modalService = jasmine.createSpyObj('ModalService', ['openViewHeroModal']);
    alertsService = jasmine.createSpyObj('AlertsService', ['questionModal', 'success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    shDataService.getHeroes.and.returnValue(of(MOCK_HEROES_LIST));
    shDataService.filterByName.and.returnValue(of(MOCK_HEROES_LIST));
    shDataService.deleteHero.and.returnValue(of(true));
    modalService.openViewHeroModal.and.returnValue(of(true));
    alertsService.questionModal.and.returnValue(of(true));
    alertsService.success.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, SuperHeroesPageComponent, BrowserAnimationsModule],
      declarations: [],
      providers: [
        { provide: ShDataService, useValue: shDataService },
        { provide: ModalService, useValue: modalService },
        { provide: AlertsService, useValue: alertsService },
        { provide: Router, useValue: router },
        TranslateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load heroes', () => {
    spyOn(component, 'getHeroes');

    component.ngOnInit();
    fixture.detectChanges();

    expect(shDataService.getHeroes).toHaveBeenCalled();
    expect(component.superHeroesList).toEqual(MOCK_HEROES_LIST);
  });


  it('should select hero and open modal', () => {
    modalService.openViewHeroModal.and.returnValue(of(true));
    component.selectedHero(MOCK_HEROES_LIST[0]);

    expect(modalService.openViewHeroModal).toHaveBeenCalledWith(MOCK_HEROES_LIST[0].id);
  });


  it('should filter heroes by name', () => {
    const mock_filter = MOCK_HEROES_LIST[0];
    shDataService.filterByName.and.returnValue(of([mock_filter]));
    component.filteredByName('batman');

    expect(shDataService.filterByName).toHaveBeenCalledWith('batman');
    expect(component.superHeroesList).toEqual([mock_filter]);
  });


  it('should return heroes list if not have a filter', () => {
    shDataService.getHeroes.and.returnValue(of(MOCK_HEROES_LIST));
    component.valueFilter = '';
    component.filteredByName('');
    fixture.detectChanges();

    expect(shDataService.filterByName).not.toHaveBeenCalled();
    expect(shDataService.getHeroes).toHaveBeenCalled();
    expect(component.superHeroesList).toEqual(MOCK_HEROES_LIST);
  });


  it('should navigate to create hero', () => {
    component.creatHero();

    expect(router.navigate).toHaveBeenCalledWith([ROUTES_CONST.CREATE]);
  });


  it('should navigate to edit hero', () => {
    component.editHero(MOCK_HEROES_LIST[0]);

    expect(router.navigate).toHaveBeenCalledWith([ROUTES_CONST.EDIT(MOCK_HEROES_LIST[0].id)]);
  });


  it('should delete hero', () => {
    alertsService.questionModal.and.returnValue(of(true));
    shDataService.deleteHero.and.returnValue(of(true));
    component.deleteHero(MOCK_HEROES_LIST[0]);

    expect(alertsService.questionModal).toHaveBeenCalled();
    expect(shDataService.deleteHero).toHaveBeenCalledWith(MOCK_HEROES_LIST[0].id);
  });


  it('should confirm delete and reload heroes', () => {
    spyOn(component, 'getHeroes');

    shDataService.deleteHero.and.returnValue(of(true));
    alertsService.success.and.returnValue(of(true));
    component.confirmDelete(MOCK_HEROES_LIST[0].id);

    expect(shDataService.deleteHero).toHaveBeenCalledWith(MOCK_HEROES_LIST[0].id);
    expect(component.getHeroes).toHaveBeenCalled();
  });


  it('should enter because of the error', () => {
    component.showAlert(false);

    expect(alertsService.error).toHaveBeenCalled();
  });


  it('should clean and destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
