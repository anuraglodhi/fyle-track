import { TestBed } from '@angular/core/testing';

import { INITIAL_DATA, STORAGE, UserWorkoutData, WorkoutDataService } from './workout-data.service';

describe('WorkoutDataServiceService', () => {
  let service: WorkoutDataService;
  let mockLocalStorage = jasmine.createSpyObj<Storage>('localStorage', ['getItem', 'setItem']);

  const initialData: UserWorkoutData[] = [
    { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: STORAGE, useValue: mockLocalStorage },
        { provide: INITIAL_DATA, useValue: initialData}
      ]
    });
    service = TestBed.inject(WorkoutDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize data from localStorage', () => {
    expect(service.userWorkoutData()).toEqual(initialData);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('workoutData');
  });

  it('should save data to localStorage', () => {
    service.addWorkout('John', 'Swimming', 45);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify([
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Swimming', minutes: 45 }] },
    ]));
  });

  it('should update existing workout', () => {
    service.addWorkout('John', 'Running', 15);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify([
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 45 }] },
    ]));
  });

  it('should add new user', () => {
    service.addWorkout('Alice', 'Running', 15);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify([
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Alice', workouts: [{ type: 'Running', minutes: 15 }] },
    ]));
  });

  it('should add new workout', () => {
    service.addWorkout('John', 'Swimming', 45);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify([
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Swimming', minutes: 45 }] },
    ]));
  })

  it('should add new workout to existing user', () => {
    service.addWorkout('John', 'Swimming', 45);
    service.addWorkout('John', 'Running', 15);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workoutData', JSON.stringify([
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 45 }, { type: 'Swimming', minutes: 45 }] },
    ]));
  });
});
