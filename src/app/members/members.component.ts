import { Component } from '@angular/core';
import { GLOBAL } from '../app_config';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent  {

  constructor(private MS:MemberService, private dialog:MatDialog){}

delete(id:string): void {
  //1 ovrir la boite de dialogue
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '300px',
  });
  //2 attendre le resultat 
  dialogRef.afterClosed().subscribe(result => {
   if(result)
    this.MS.ONDELETE(id).subscribe(()=>{
      this.dataSource=this.MS.tab
  });
  //3 if clic sur confirme en exicite delete meyhode 
  
})
}

dataSource:any[]=this.MS.tab
displayedColumns: string[] = ['id', 'cin', 'name', 'type','cv','date','icon'];

}



