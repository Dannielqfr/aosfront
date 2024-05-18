import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

export interface PeriodicElement {
  alumno: string;
  position: number;
  fecha: string;
  talleres: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, alumno: 'Carlos', fecha: '01/05/24', talleres: '1' },
  { position: 2, alumno: 'Stephany', fecha: '01/05/24', talleres: '1' },
  { position: 3, alumno: 'Raquel', fecha: '01/05/24', talleres: '1' },
  { position: 4, alumno: 'Pedro', fecha: '01/05/24', talleres: '1' },
  { position: 5, alumno: 'Tomas', fecha: '01/05/24', talleres: '1' },
  { position: 6, alumno: 'Guillermo', fecha: '01/05/24', talleres: '1' },
  { position: 7, alumno: 'Sofia', fecha: '01/05/24', talleres: '1' },
  { position: 8, alumno: 'Susana', fecha: '01/05/24', talleres: '1' },
  { position: 9, alumno: 'Pepe', fecha: '01/05/24', talleres: '1' },
  { position: 10, alumno: 'Neon', fecha: '01/05/24', talleres: '1' },
];

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    FormsModule,
    MatTableModule,
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent {
  displayedColumns: string[] = ['alumno', 'fecha', 'talleres', 'position'];
  dataSource = ELEMENT_DATA;


  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { name: "this.name", animal: "this.animal" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}