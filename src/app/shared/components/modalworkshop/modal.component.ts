import { Component, ElementRef, Inject, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { HttpResult, TypeWorkshop } from '../../../interfaces/types';
import { WorkshopService } from '../../../services/workshop.service';

// export interface DialogData {
//   animal: string;
//   name: string;
//   template: TemplateRef<any>;
// }
interface DialogData {
  workshop: TypeWorkshop | null;
}

interface FormData {
  idworkshop: number;
  workshopname: string;
  workdescription?: string;
  idinstructor: string;
  costfirst: number;
  costsecond: number;
  costthird: number;
  workshopschedule: string;
  startsin: Date;
  endsin: Date;
  capacity: string;
  state: string;
}

@Component({
  selector: 'app-modal-workshop',
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
    MatDialogModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ModalComponentWorkshop {
  form: FormGroup;
  isnew: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalComponentWorkshop>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private http: HttpClient,
    private workshopService: WorkshopService
  ) {
    if (data.workshop) {
      console.log('existe');
      this.isnew = false;
    } else {
      console.log('NO existe');
      this.isnew = true;
    }
    this.form = this.fb.group({
      idworkshop: [data.workshop?.idworkshop],
      workshopname: [data.workshop?.workshopname, Validators.required],
      workdescription: [data.workshop?.workdescription, Validators.required],
      costfirst: [data.workshop?.costfirst, Validators.required],
      costsecond: [data.workshop?.costsecond, Validators.required],
      costthird: [data.workshop?.costthird, Validators.required],
      workshopschedule: [data.workshop?.workshopschedule],
      startsin: [data.workshop?.startsin],
      endsin: [data.workshop?.endsin],
      capacity: [data.workshop?.capacity],
      state: [data.workshop?.state],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clicking(): void {
    if (typeof this.form.value?.startsin == 'string') {
      this.form.value.startsin = new Date(this.form.value.startsin);
    }
    if (typeof this.form.value?.endsin == 'string') {
      this.form.value.endsin = new Date(this.form.value.endsin);
    }
    if (this.isnew) {
      if (this.form.valid) {
        const formData: FormData = this.form.value;
        this.workshopService
          .postWorkshop({
            ...formData,
            //idworkshop: 1,
            idinstructor:"12345690",
            startsin: `${formData.startsin.getFullYear()}-${
              formData.startsin.getUTCMonth() + 1
            }-${formData.startsin.getUTCDate()}`,
            endsin: `${formData.endsin.getFullYear()}-${
              formData.endsin.getUTCMonth() + 1
            }-${formData.endsin.getUTCDate()}`,
          })
          .subscribe((result: HttpResult) => {
            if (result.success) {
              this.dialogRef.close();
            } else {
              console.error('Error al enviar el formulario:', result.message);
            }
          });
      }
    } else {
      if (this.form.valid) {
        
        const formData: FormData = this.form.value;
        this.workshopService
          .putWorkshop({
            ...formData,
            idinstructor:"12345690",
            startsin: `${formData.startsin.getFullYear()}-${
              formData.startsin.getUTCMonth() + 1
            }-${formData.startsin.getUTCDate()}`,
            endsin: `${formData.endsin.getFullYear()}-${
              formData.endsin.getUTCMonth() + 1
            }-${formData.endsin.getUTCDate()}`,
          })
          .subscribe((result: HttpResult) => {
            console.log(result)
            if (result.success) {
              this.dialogRef.close();
            } else {
              console.error('Error al enviar el formulario:', result.message);
            }
          });
      }
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
    window.location.reload();
  }
}
