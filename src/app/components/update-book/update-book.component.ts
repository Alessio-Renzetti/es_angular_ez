import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { Libro } from '../../service/json-service.service';

@Component({
  selector: 'app-update-book',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Libro
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      titolo: new FormControl(this.data.titolo, Validators.required),
      autore: new FormControl(this.data.autore, Validators.required),
      genere: new FormControl(this.data.genere),
      data_pub: new FormControl(
        this.data.data_pub
          ? new Date(this.data.data_pub).toISOString().split('T')[0]
          : null
      ),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.editForm.valid) {
      let formData = { ...this.editForm.value };
  
      if (formData.data_pub) {
        formData.data_pub = new Date(formData.data_pub)
          .toISOString()
          .split('T')[0];
      }
  
  
      this.data = { ...this.data, ...formData };
  
      this.dialogRef.close(this.data);
    } else {
      console.error('Form is invalid');
    }
  }
}
