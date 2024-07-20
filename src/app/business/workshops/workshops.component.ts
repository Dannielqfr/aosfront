import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { HttpResult, TypeWorkshop } from '../../interfaces/types';
import { WorkshopService } from '../../services/workshop.service';
import { ModalComponentWorkshop } from '../../shared/components/modalworkshop/modal.component';

export interface PeriodicElement {
  alumno: string;
  position: number;
  fecha: string;
  talleres: string;
}

@Component({
  selector: 'app-workshops',
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
  ],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css',
})
export class WorkshopsComponent {
  //public workshopsResults$: Observable<HttpResult>;
  displayedColumns: string[] = [
    'idworkshop',
    'workshopname',
    'workdescription',
    'costfirst',
    'costsecond',
    'costthird',
    'workshopschedule',
    'startsin',
    'endsin',
    'capacity',
    'inscription_count',
    'available_capacity',
    'state',
    'position',
  ];
  dataSource: TypeWorkshop[] = [];
  filterValue: string = '';
  originalDataSource: TypeWorkshop[] = [];
  filteredDataSource: TypeWorkshop[] = [];

  constructor(public dialog: MatDialog, private service: WorkshopService) {}
  ngOnInit() {
    this.service.getWorkshops().subscribe(
      (result: HttpResult) => {
        if (result.success) {
          this.dataSource = result.data;
          this.originalDataSource = result.data;
          this.filteredDataSource = result.data;
        } else {
          console.log('error aqui');
        }
      },
      (error) => {
        console.error('Error fetching people:', error);
      }
    );
  }

  openDialog(n: TypeWorkshop | null): void {
    const dialogRef = this.dialog.open(ModalComponentWorkshop, {
      data: { workshop: n },
      width: '40%',
      minWidth: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filterValue = filterValue;

    if (this.filterValue) {
      this.filteredDataSource = this.originalDataSource.filter(
        (workshop) =>
          workshop.workshopname.toLowerCase().includes(this.filterValue) ||
          workshop.workdescription?.toLowerCase().includes(this.filterValue) ||
          workshop.state.toLowerCase().includes(this.filterValue)
      );
    } else {
      this.filteredDataSource = this.originalDataSource;
    }
  }
}
