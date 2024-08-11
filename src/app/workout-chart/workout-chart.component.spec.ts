import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { WorkoutDataService } from '../workout-data/workout-data.service';
import { ScrollerModule } from 'primeng/scroller';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  let mockWorkoutDataService: jasmine.SpyObj<WorkoutDataService>;

  const mockWorkoutData = [
    {
      id: 1,
      name: 'John',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Swimming', minutes: 45 },
      ],
    },
    { id: 2, name: 'Jane', workouts: [{ type: 'Cycling', minutes: 60 }] },
  ];

  beforeEach(async () => {
    mockWorkoutDataService = jasmine.createSpyObj('WorkoutDataService', [], {
      userWorkoutData: signal(mockWorkoutData),
    });

    await TestBed.configureTestingModule({
      imports: [
        WorkoutChartComponent,
        ScrollerModule,
        ChartModule,
        ListboxModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: WorkoutDataService, useValue: mockWorkoutDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedData as an empty array', () => {
    expect(component.selectedData()).toEqual([]);
  });

  it('should compute chartData based on selectedData', () => {
    component.selectedData.set([
      { type: 'Running', minutes: 30 },
      { type: 'Swimming', minutes: 45 },
    ]);

    const chartData = component.chartData();

    expect(chartData.labels).toEqual(['Running', 'Swimming']);
    expect(chartData.datasets[0].data).toEqual([30, 45]);
  });

  it('should have options defined', () => {
    expect(component.options).toBeDefined();
    expect(component.options.maintainAspectRatio).toBeFalse();
    expect(component.options.aspectRatio).toBe(0.8);
  });

  it('should return all user names', () => {
    const users = component.allUsers();
    expect(users).toEqual(['John', 'Jane']);
  });

  it('should update chartData when selectedData changes', () => {
    component.selectedData.set([{ type: 'Cycling', minutes: 60 }]);

    const chartData = component.chartData();

    expect(chartData.labels).toEqual(['Cycling']);
    expect(chartData.datasets[0].data).toEqual([60]);
  });

  it('should have correct chart options', () => {
    expect(component.options.scales.x.ticks.color).toBe('#000');
    expect(component.options.scales.y.grid.color).toBe('#aaa');
    expect(component.options.plugins.legend.labels.color).toBe('#000');
  });
});
