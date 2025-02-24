import { Component, OnInit } from '@angular/core';
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
import { JsonServiceService } from '../../service/json-service.service';

@Component({
  selector: 'app-add-book',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private jsonSer: JsonServiceService) {}
  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(){
    this.addForm = new FormGroup({
      titolo: new FormControl(null, Validators.required),
      autore: new FormControl(null, Validators.required),
      genere: new FormControl(),
      data_pub: new FormControl(),
    });
  }

  onSubmit() {
    let formData = this.addForm.value ;

    if (formData.data_pub) {
      formData.data_pub = new Date(formData.data_pub)
        .toISOString()
        .split('T')[0];
    }

    this.jsonSer.postLibro(formData).subscribe((res) => {
      console.log(res);
      this.addForm.reset();
      this.addForm.updateValueAndValidity();
    });
    //TODO: osservazione
  }
}

export interface Frutto {
  name: string,
  sapore: string,
}

export interface SpecialFrutto {
  name: string;
  sapore: string,
  semi: boolean,
  peso: number
}