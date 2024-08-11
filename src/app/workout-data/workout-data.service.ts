import {
  Inject,
  Injectable,
  InjectionToken,
  signal,
} from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface UserWorkoutData {
  id: number;
  name: string;
  workouts: Workout[];
}

export const STORAGE = new InjectionToken<Storage>('STORAGE');
export const INITIAL_DATA = new InjectionToken<UserWorkoutData[]>(
  'INITIAL_DATA',
);

const LOCAL_STORAGE_KEY = 'workoutData';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  userWorkoutData = signal<UserWorkoutData[]>([]);

  constructor(
    @Inject(STORAGE) private storage: Storage,
    @Inject(INITIAL_DATA)
    private initialData: UserWorkoutData[],
  ) {
    let data = this.storage.getItem(LOCAL_STORAGE_KEY);
    if (!data || data === 'undefined') {
      data = JSON.stringify(this.initialData);
      this.storage.setItem(LOCAL_STORAGE_KEY, data);
    }

    this.userWorkoutData.set(JSON.parse(data));
  }

  addWorkout(name: string, type: string, minutes: number) {
    let userWorkoutData = this.userWorkoutData();
    const index = userWorkoutData.findIndex((user) => user.name === name);

    if (index === -1) {
      userWorkoutData.push({
        id: userWorkoutData.length + 1,
        name,
        workouts: [{ type, minutes }],
      });
    } else {
      userWorkoutData = userWorkoutData.map((user) => {
        if (user.name === name) {
          const index = user.workouts.findIndex(
            (workout) => workout.type === type,
          );
          if (index !== -1) {
            user.workouts[index].minutes += minutes;
          } else {
            user.workouts.push({ type, minutes });
          }
        }
        return user;
      });
    }

    this.userWorkoutData.set([...userWorkoutData]);
    this.storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userWorkoutData));
  }
}
