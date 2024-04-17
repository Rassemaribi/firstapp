import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Evenement } from 'src/modéles/Evenement';
import { EvenmentService } from 'src/services/evenment.service';
import { FormeventComponent } from '../formevent/formevent.component';
import { VisibleComponent } from '../visible/visible.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  evenements!: MatTableDataSource<Evenement>;
  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu', 'action'];

  constructor(private evenmentService: EvenmentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEvenements();
  }

  getEvenements(): void {
    this.evenmentService.getEvenements().subscribe(evenements => {
      this.evenements = new MatTableDataSource(evenements);
    });
  }

  deleteEvenement(id: number): void {
    this.evenmentService.deleteEvenement(id).subscribe(() => {
      this.getEvenements();
    });
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(FormeventComponent, {
      width: '250px',
      data: { event: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEvenements();
    });
  }

  updateEvent(id: number): void {
    const event = this.evenements.data.find(evenement => evenement.id === id);

    const dialogRef = this.dialog.open(FormeventComponent, {
      width: '250px',
      data: { id: id, event: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEvenements();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.evenements.filter = filterValue.trim().toLowerCase();
  }
  openVisible(id: string): void {
    this.evenmentService.getEvenementById(Number(id)).subscribe(event => {
      const dialogRef = this.dialog.open(VisibleComponent, {
        width: '250px',
        data: { event: event }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Do something with the result
      });
    });
  }
}