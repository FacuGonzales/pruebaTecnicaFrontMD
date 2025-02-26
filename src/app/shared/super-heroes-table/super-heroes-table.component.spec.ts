import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesTableComponent } from './super-heroes-table.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MOCK_SUPER_HEROES } from '../../../assets/mocks/mocks';

describe('SuperHeroesTableComponent', () => {
  let component: SuperHeroesTableComponent;
  let fixture: ComponentFixture<SuperHeroesTableComponent>;
  let translate: TranslateService;

 beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SuperHeroesTableComponent,
        TranslateModule.forRoot(),
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatMenuModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesTableComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize dataSource with empty array', () => {
    expect(component.dataSource.data).toEqual([]);
  });


  it('should set default language to Spanish', () => {
    expect(translate.getDefaultLang()).toBe('es');
    expect(translate.currentLang).toBe('es');
  });


  it('should update dataSource when superHeroesList input changes', () => {
    component.superHeroesList = MOCK_SUPER_HEROES;
    component.ngOnChanges({ superHeroesList: { currentValue: MOCK_SUPER_HEROES, previousValue: [], firstChange: false, isFirstChange: () => false } });
    expect(component.dataSource.data).toEqual(MOCK_SUPER_HEROES);
  });


  it('should update dataSource on ngOnInit', () => {
    component.superHeroesList = MOCK_SUPER_HEROES;
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(MOCK_SUPER_HEROES);
  });


  it('should set paginator to dataSource on ngAfterViewInit', () => {
    component.superHeroesList = MOCK_SUPER_HEROES;
    component.ngOnInit();
    fixture.detectChanges();
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBeTruthy();
  });


  it('should emit edit event when onEditHero is called', () => {
    const emitSpy = spyOn(component.emitEditHero, 'emit');
    component.onEditHero(MOCK_SUPER_HEROES[0]);
    expect(emitSpy).toHaveBeenCalledWith(MOCK_SUPER_HEROES[0]);
  });


  it('should emit delete event when onDeleteHero is called', () => {
    const emitSpy = spyOn(component.emitDeleteHero, 'emit');
    component.onDeleteHero(MOCK_SUPER_HEROES[0]);
    expect(emitSpy).toHaveBeenCalledWith(MOCK_SUPER_HEROES[0]);
  });


  it('should emit select event and set selectedHero when viewItem is called', () => {
    const emitSpy = spyOn(component.selectHero, 'emit');
    component.viewItem(MOCK_SUPER_HEROES[0]);
    expect(emitSpy).toHaveBeenCalledWith(MOCK_SUPER_HEROES[0]);
    expect(component.selectedHero).toEqual(MOCK_SUPER_HEROES[0]);
  });


  it('should render hero names in table rows', () => {
    component.superHeroesList = MOCK_SUPER_HEROES;
    component.ngOnInit();
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
    tableRows.forEach((row: any, index: any) => {
      const nameCell = row.querySelector('mat-cell:nth-child(2)');
      expect(nameCell.textContent.trim()).toBe(MOCK_SUPER_HEROES[index].name);
    });
  })
})
