import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AddWorkoutDialogComponent } from './add-workout-dialog.component';
import { WorkoutDataService } from '../workout-data/workout-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddWorkoutDialogComponent', () => {
  let component: AddWorkoutDialogComponent;
  let fixture: ComponentFixture<AddWorkoutDialogComponent>;
  let mockWorkoutDataService: jasmine.SpyObj<WorkoutDataService>;

  beforeEach(async () => {
    mockWorkoutDataService = jasmine.createSpyObj('WorkoutDataService', [
      'addWorkout',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        AddWorkoutDialogComponent,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: WorkoutDataService, useValue: mockWorkoutDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.addWorkoutForm.value).toEqual({
      name: '',
      workoutType: '',
      minutes: 0,
    });
  });

  it('should not call addWorkout when form is invalid', () => {
    component.addWorkout();
    expect(mockWorkoutDataService.addWorkout).not.toHaveBeenCalled();
  });

  it('should call addWorkout when form is valid', () => {
    component.addWorkoutForm.setValue({
      name: 'John',
      workoutType: 'Running',
      minutes: 30,
    });
    component.addWorkout();
    expect(mockWorkoutDataService.addWorkout).toHaveBeenCalledWith(
      'John',
      'Running',
      30,
    );
  });

  it('should emit visibleChange event when closing dialog', () => {
    spyOn(component.visibleChange, 'emit');
    component.closeDialog();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should close dialog after adding workout', () => {
    spyOn(component, 'closeDialog');
    component.addWorkoutForm.setValue({
      name: 'John',
      workoutType: 'Running',
      minutes: 30,
    });
    component.addWorkout();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should have workoutTypes defined', () => {
    expect(component.workoutTypes).toBeDefined();
    expect(Array.isArray(component.workoutTypes)).toBeTruthy();
  });
});
