import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/modéles/Evenement';
import { EvenmentService } from 'src/services/evenment.service';

@Component({
  selector: 'app-formevent',
  templateUrl: './formevent.component.html',
  styleUrls: ['./formevent.component.css']
})
export class FormeventComponent implements OnInit {

  idcourant!: string;

  constructor(
    private ES: EvenmentService, 
    private router: Router,
    private activatedroute: ActivatedRoute,
    public dialogRef: MatDialogRef<FormeventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.idcourant = data.id;}

  formEvent!: FormGroup;

  ngOnInit(): void {
    if (this.data && this.data.event) {
      console.log('ID:', this.data.id);
      console.log('Event:', this.data.event);
      this.initForm2(this.data.event);
    } else {
      this.initForm1();
    }
  }

  initForm1(): void {
    this.formEvent = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null, [Validators.required])
    });
  }

  initForm2(event: Evenement): void {
    this.formEvent = new FormGroup({
      titre: new FormControl(event.titre, [Validators.required]),
      date: new FormControl(event.date, [Validators.required]),
      lieu: new FormControl(event.lieu, [Validators.required])
    });
  }

  save(): void {
    if (this.idcourant) {
      console.log('ID:', this.idcourant);
      // Update existing event
      this.ES.updateEvenement(this.idcourant,this.formEvent.value).subscribe(() => {
        console.log('Event updated successfully.');
        
        this.closeAndRedirect();
      });
    } else {
      // Add new event
      this.ES.addEvenement(this.formEvent.value).subscribe(() => {
        console.log('Event added successfully.');
        this.closeAndRedirect();
      });
    }
  }
  
  closeAndRedirect(): void {
    this.dialogRef.close();
    this.router.navigate(['/events']);
  }

  close(): void {
    this.dialogRef.close();
  }

 
}