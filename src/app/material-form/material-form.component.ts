import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatSliderModule, MatRadioModule, MatDatepickerModule, 
    MatNativeDateModule, ReactiveFormsModule, FormsModule, MatSlideToggleModule, MatSelectModule,
    MatCardModule, MatTooltipModule, MatDividerModule, MatSnackBarModule
  ],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent implements OnInit {
  darkMode = false;
  submitted = false;

  formdata: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z0-9]{7,}$/)]),
    birthDate: new FormControl(null, [Validators.required, this.validateDOB]),
    gender: new FormControl('', Validators.required),
    satisfaction: new FormControl('', Validators.required),
    recommendationLevel: new FormControl(3), // Default value
    comments: new FormControl(''),
    agreeTerms: new FormControl(false, Validators.requiredTrue)
  });

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    this.darkMode = savedTheme;
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
    }
  }

  validateDOB(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value) return null; 
    const selectedDate = new Date(control.value);
    return selectedDate.getFullYear() <= 2006 ? null : { invalidDOB: true };
  }

  toggleTheme(event: any) {
    this.darkMode = event.checked;
    localStorage.setItem('darkMode', this.darkMode.toString());
    document.body.classList.toggle('dark-theme', this.darkMode);
  }

  onClickSubmit(data: any) {
    if (this.formdata.valid) {
      console.log("Survey Submitted!", this.formdata.value);
      this.submitted = true;
      this.snackBar.open('Survey submitted successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else {
      this.formdata.markAllAsTouched();
      console.log('Survey is not valid!');
      this.snackBar.open('Please fix the errors in the form', 'OK', {
        duration: 3000
      });
    }
  }
}