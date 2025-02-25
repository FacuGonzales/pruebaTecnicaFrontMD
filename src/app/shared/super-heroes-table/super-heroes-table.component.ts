import { AfterViewInit, Component, Input, ViewChild, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SuperHero } from '../../models/super-hero-model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-super-heroes-table',
  standalone: true,
  imports: [ CommonModule, TranslateModule, MatTableModule, MatPaginatorModule, MatIconModule, MatMenuModule ],
  templateUrl: './super-heroes-table.component.html',
  styleUrl: './super-heroes-table.component.scss'
})
export class SuperHeroesTableComponent implements OnInit, OnChanges, AfterViewInit  {
  @Input() superHeroesList: SuperHero[] = [];
  @Output() emitEditHero = new EventEmitter();
  @Output() emitDeleteHero = new EventEmitter();
  @Output() selectHero = new EventEmitter();

  public selectedHero?: SuperHero;
  public displayedColumns: string[] = ['image', 'name', 'options'];
  public dataSource = new MatTableDataSource<SuperHero>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public translate: TranslateService
              ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  public ngAfterViewInit(): void {
    if(this.paginator) this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['superHeroesList'] && this.superHeroesList) {
      this.completData();
    }
  }

  public ngOnInit(): void {
    this.completData();
  }

  public completData(): void {
    this.dataSource = new MatTableDataSource<SuperHero>(this.superHeroesList);
    if(this.paginator) this.dataSource.paginator = this.paginator;
  }

  public onEditHero(hero: SuperHero): void {
    this.emitEditHero.emit(hero);
  }

  public onDeleteHero(hero: SuperHero): void {
    this.emitDeleteHero.emit(hero);
  }

  public viewItem(hero: SuperHero): void {
    this.selectedHero = hero;
    this.selectHero.emit(hero);
  }
}
