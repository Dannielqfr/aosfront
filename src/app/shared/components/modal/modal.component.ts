import { Component, ElementRef, Inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { PeopleService } from '../../../services/people.service';
import { HttpResult, TypePerson } from '../../../interfaces/types';


export interface DialogData {
  animal: string;
  name: string;
  template: TemplateRef<any>;
}

interface FormData {
  iddocumenttype: string;
  documentnumber: string;
  personname: string;
  personlastname: string;
  birthdate: Date;
  phonenumber: string;
  address: string;
  username: string;
  userpass: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDivider,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ModalComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private http: HttpClient,
    private peopleService:PeopleService
  ) {
    this.form = this.fb.group({
      iddocumenttype: ['', Validators.required],
      documentnumber: ['', Validators.required],
      personname: ['', Validators.required],
      personlastname: ['', Validators.required],
      username: ['', Validators.required],
      userpass: ['', Validators.required],
      birthdate: [''],
      phonenumber: [''],
      address: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clicking(): void {
    console.log("🚀 ~ ModalComponent ~ clicking ~ formData:", this.form.value.birthdate.getUTCMonth())
    if (this.form.valid) {
      const formData: FormData = this.form.value;
      this.peopleService.postPeople({
        ...formData,
        iddocumenttype:1,
        birthdate:`${formData.birthdate.getFullYear()}-${formData.birthdate.getUTCMonth()}-${formData.birthdate.getUTCDate()}`
      }).subscribe(
        (result: HttpResult)=>{
          if (result.success) {
            this.dialogRef.close();
          } else {
            console.error('Error al enviar el formulario:', result.message);
          }
        }
      )
      //console.log("🚀 ~ ModalComponent ~ clicking ~ formData:", formData.birthdate.getUTCMonth() //getUTCDate getUTCMonth getFullYear()
      // Lógica para enviar el formulario al servidor
      // this.http.post('URL_DEL_API', formData)
      //   .subscribe(
      //     (response) => {
      //       console.log('Respuesta del servidor:', response);
      //       this.dialogRef.close();
      //     },
      //     (error) => {
      //       console.error('Error al enviar el formulario:', error);
      //     }
      //   );
    }
  }
}
