import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PeopleService } from '../../services/people.service';
import { Observable } from 'rxjs';
import { HttpResult, TypePerson } from '../../interfaces/types';
import { AsyncPipe } from '@angular/common'

export interface PeriodicElement {
  alumno: string;
  position: number;
  fecha: string;
  talleres: string;
}

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    FormsModule,
    MatIcon,
    MatTableModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AsyncPipe,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent {
  public peopleResult$!: Observable<HttpResult>
  displayedColumns: string[] = ['personname', 'personlastname', 'address', 'phonenumber', 'position'];
  dataSource: TypePerson[] = [];

  constructor(public dialog: MatDialog, private service: PeopleService) { }

  ngOnInit() {
    // this.peopleResult$ = this.service.getPeople().pipe(
    //   map((response: HttpResult) => response) // Asegúrate de que response.data es un array de TypePerson
    // );
    this.service.getPeople().subscribe(
      (result: HttpResult) => {
        if (result.success) {
          this.dataSource = result.data;
        } else {
          console.log("error aqui")
        }
      },
      (error) => {
        console.error('Error fetching people:', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { name: 'this.name', animal: 'this.animal' },
      width: '40%',
      minWidth: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed',result);
    });

  }

}
