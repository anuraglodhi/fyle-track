import { workoutTypes } from './../constants';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { WorkoutDataService } from '../workout-data/workout-data.service';

@Component({
  selector: 'app-add-workout-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
  ],
  templateUrl: './add-workout-dialog.component.html',
})
export class AddWorkoutDialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  workoutDataService = inject(WorkoutDataService);

  workoutTypes = workoutTypes;

  addWorkoutForm = new FormGroup({
    name: new FormControl(''),
    workoutType: new FormControl(''),
    minutes: new FormControl(0),
  });

  addWorkout() {
    const { name, workoutType, minutes } = this.addWorkoutForm.value;
    if (!name || !workoutType || !minutes) {
      return;
    }
    this.workoutDataService.addWorkout(name, workoutType, minutes);
    this.closeDialog();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
