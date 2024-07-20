import { Component } from '@angular/core';
import { HttpResult, TypeInscription } from '../../interfaces/types';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { InscriptionService } from '../../services/inscription.service';
import { ModalComponentInscription } from '../../shared/components/modalinscription/modal.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-inscriptions',
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
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css',
})
export class InscriptionsComponent {
  displayedColumns: string[] = [
    'personname',
    'personlastname',
    'workshopname',
    'position'
  ];
  dataSource: TypeInscription[] = [];
  filterValue: string = '';
  originalDataSource: TypeInscription[] = [];
  filteredDataSource: TypeInscription[] = [];

  constructor(public dialog: MatDialog, private service: InscriptionService) {}

  ngOnInit() {
    this.service.getInscriptions().subscribe(
      (result: HttpResult) => {
        if (result.success) {
          console.log(result)
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

  openDialog(n: TypeInscription | null): void {
    const dialogRef = this.dialog.open(ModalComponentInscription, {
      data: { inscription: n },
      width: '40%',
      minWidth: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filterValue = filterValue;

    if (this.filterValue) {
      this.filteredDataSource = this.originalDataSource.filter(
        (inscription) =>
          inscription.state.toLowerCase().includes(this.filterValue)
        // inscription.address?.toLowerCase().includes(this.filterValue) ||
        // inscription.phonenumber?.toLowerCase().includes(this.filterValue)
      );
    } else {
      this.filteredDataSource = this.originalDataSource;
    }
  }
}
