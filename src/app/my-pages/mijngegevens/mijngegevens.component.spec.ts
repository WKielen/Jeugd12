import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MijngegevensComponent } from './mijngegevens.component';

describe('MijngegevensComponent', () => {
  let component: MijngegevensComponent;
  let fixture: ComponentFixture<MijngegevensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MijngegevensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MijngegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
