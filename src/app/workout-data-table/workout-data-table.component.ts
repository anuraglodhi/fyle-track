import { workoutTypes } from '../constants';
import { Component, computed, inject } from '@angular/core';
import {
  Workout,
  WorkoutDataService,
} from '../workout-data/workout-data.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FilterService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-workout-data-table',
  standalone: true,
  imports: [TableModule, InputTextModule, DropdownModule],
  templateUrl: './workout-data-table.component.html',
})
export class WorkoutDataTableComponent {
  workoutDataService = inject(WorkoutDataService);
  workoutData = computed(() => this.workoutDataService.userWorkoutData());
  workoutTypes = workoutTypes;

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.register(
      'customFilter',
      (value: Workout[], filter: string): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null || value.length === 0) {
          return false;
        }

        return value.some(
          (workout) => workout.type.toLowerCase() === filter.toLowerCase(),
        );
      },
    );
  }

  workoutsToString(workouts: Workout[]) {
    return workouts.map((workout) => workout.type).join(', ');
  }

  totalMinutes(workouts: Workout[]) {
    return workouts.reduce((acc, workout) => acc + workout.minutes, 0);
  }

  inputEventValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  selectEventValue(event: Event) {
    return (event.target as HTMLSelectElement).value;
  }
}
