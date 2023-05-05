import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStorageComponent } from './room-storage.component';

describe('RoomStorageComponent', () => {
  let component: RoomStorageComponent;
  let fixture: ComponentFixture<RoomStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
