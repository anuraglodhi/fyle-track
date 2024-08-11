import { Component, computed, inject, signal } from '@angular/core';
import {
  Workout,
  WorkoutDataService,
} from '../workout-data/workout-data.service';
import { ScrollerModule } from 'primeng/scroller';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [ScrollerModule, ChartModule, ListboxModule],
  templateUrl: './workout-chart.component.html',
})
export class WorkoutChartComponent {
  workoutDataService = inject(WorkoutDataService);

  selectedData = signal<Workout[]>([]);

  chartData = computed(() => {
    return {
      labels: this.selectedData().map((workout) => workout.type),
      datasets: [
        {
          label: 'Minutes',
          data: this.selectedData().map((workout) => workout.minutes),
        },
      ],
    };
  });

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
          font: {
            weight: 500,
          },
        },
        grid: {
          color: '#aaa',
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: '#000',
        },
        grid: {
          color: '#aaa',
          drawBorder: false,
        },
      },
    },
  };

  allUsers() {
    return this.workoutDataService.userWorkoutData().map((userWorkoutData) => userWorkoutData.name);
  }
}
