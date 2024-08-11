import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutDataTableComponent } from './workout-data-table.component';
import { WorkoutDataService } from '../workout-data/workout-data.service';
import { FilterService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('WorkoutDataTableComponent', () => {
  let component: WorkoutDataTableComponent;
  let fixture: ComponentFixture<WorkoutDataTableComponent>;
  let mockWorkoutDataService: jasmine.SpyObj<WorkoutDataService>;
  let mockFilterService: jasmine.SpyObj<FilterService>;

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
    mockFilterService = jasmine.createSpyObj('FilterService', ['register']);

    await TestBed.configureTestingModule({
      imports: [
        WorkoutDataTableComponent,
        TableModule,
        InputTextModule,
        DropdownModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: WorkoutDataService, useValue: mockWorkoutDataService },
        { provide: FilterService, useValue: mockFilterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize workoutData', () => {
    expect(component.workoutData()).toEqual(mockWorkoutData);
  });

  it('should register custom filter', () => {
    expect(mockFilterService.register).toHaveBeenCalledWith(
      'customFilter',
      jasmine.any(Function),
    );
  });

  it('should convert workouts to string', () => {
    const workouts = [
      { type: 'Running', minutes: 30 },
      { type: 'Swimming', minutes: 45 },
    ];
    expect(component.workoutsToString(workouts)).toBe('Running, Swimming');
  });

  it('should calculate total minutes', () => {
    const workouts = [
      { type: 'Running', minutes: 30 },
      { type: 'Swimming', minutes: 45 },
    ];
    expect(component.totalMinutes(workouts)).toBe(75);
  });

  it('should get input event value', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'test' } });
    expect(component.inputEventValue(event)).toBe('test');
  });

  it('should get select event value', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 'Running' } });
    expect(component.selectEventValue(event)).toBe('Running');
  });

  it('should have workoutTypes defined', () => {
    expect(component.workoutTypes).toBeDefined();
    expect(Array.isArray(component.workoutTypes)).toBeTruthy();
  });

  describe('customFilter', () => {
    let customFilter: (value: any[], filter: string) => boolean;

    beforeEach(() => {
      customFilter = (
        mockFilterService.register as jasmine.Spy
      ).calls.mostRecent().args[1];
    });

    it('should return true when filter is empty', () => {
      expect(customFilter([{ type: 'Running' }], '')).toBe(true);
    });

    it('should return false when value is empty', () => {
      expect(customFilter([], 'Running')).toBe(false);
    });

    it('should return true when workout type matches filter', () => {
      expect(
        customFilter([{ type: 'Running' }, { type: 'Swimming' }], 'running'),
      ).toBe(true);
    });

    it('should return false when no workout type matches filter', () => {
      expect(
        customFilter([{ type: 'Running' }, { type: 'Swimming' }], 'Cycling'),
      ).toBe(false);
    });
  });
});
