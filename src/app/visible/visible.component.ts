import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormeventComponent } from '../formevent/formevent.component';

@Component({
  selector: 'app-visible',
  templateUrl: './visible.component.html',
  styleUrls: ['./visible.component.css']
})
export class VisibleComponent {

  constructor(public dialog: MatDialog) { }


  openDialog(): void {
    const dialogRef = this.dialog.open(FormeventComponent, {
      width: '250px',
      data: { /* data to pass to the dialog */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
