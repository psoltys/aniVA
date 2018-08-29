import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceActorSearchComponent } from './voice-actor-search.component';

describe('VoiceActorSearchComponent', () => {
  let component: VoiceActorSearchComponent;
  let fixture: ComponentFixture<VoiceActorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceActorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceActorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
