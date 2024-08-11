import { AddWorkoutDialogComponent } from './add-workout-dialog/add-workout-dialog.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { WorkoutDataTableComponent } from './workout-data-table/workout-data-table.component';
import { CommonModule } from '@angular/common';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    AddWorkoutDialogComponent,
    DialogModule,
    PanelModule,
    WorkoutDataTableComponent,
    CommonModule,
    WorkoutChartComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'fyle-track';

  addWorkoutDialogVisible = false;

  showAddWorkoutDialog() {
    this.addWorkoutDialogVisible = true;
  }
}
