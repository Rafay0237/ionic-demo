import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StopwatchPage } from './stopwatch.page';

describe('StopwatchPage', () => {
  let component: StopwatchPage;
  let fixture: ComponentFixture<StopwatchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopwatchPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StopwatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
