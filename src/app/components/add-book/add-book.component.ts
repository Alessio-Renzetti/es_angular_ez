import { Component,OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
    MatDatepickerModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private jsonSer : JsonServiceService) {}
  ngOnInit(): void {
    this.addForm = new FormGroup({
      Titolo: new FormControl(null, Validators.required),
      Autore: new FormControl(null, Validators.required),
      Genere: new FormControl(),
      Data: new FormControl()
    })
  }
  onSubmit(){
    // console.log(this.homeForm.value)
    this.jsonSer.postLibro(
      this.addForm.value
    ).subscribe(res => {
      console.log(res)
    })
    
  }
}
