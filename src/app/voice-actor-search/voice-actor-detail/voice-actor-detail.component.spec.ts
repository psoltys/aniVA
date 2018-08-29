import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceActorDetailComponent } from './voice-actor-detail.component';

describe('VoiceActorDetailComponent', () => {
  let component: VoiceActorDetailComponent;
  let fixture: ComponentFixture<VoiceActorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceActorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceActorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
