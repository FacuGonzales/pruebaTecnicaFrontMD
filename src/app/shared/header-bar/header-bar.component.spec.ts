import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarComponent } from './header-bar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBarComponent, TranslateModule.forRoot()],
      declarations: [],
      providers: [ TranslateService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
