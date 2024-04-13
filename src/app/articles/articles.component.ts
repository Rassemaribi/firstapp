import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from 'src/services/article.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ArticleformComponent } from '../articleform/articleform.component';
import { Publication } from 'src/modéles/Publication';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  dataSource1!: MatTableDataSource<any>;
  tabarticle:Publication[]=[];
  displayedColumns: string[] = ['id', 'type', 'titre','lien','sourcepdf', 'date', 'icon'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogRef!: MatDialogRef<any>;

  constructor(private AR: ArticleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getallData();
  }

  delete(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AR.ONDELETE(id).subscribe(() => {
          this.getallData();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  openDialog() {
    const configDialogue = new MatDialogConfig();
  
    configDialogue.disableClose = true;
    configDialogue.autoFocus = true;
  
    this.dialogRef = this.dialog.open(ArticleformComponent, configDialogue);
  
    this.dialogRef.afterClosed().subscribe((data: any) => { 
      if (data) {
        this.AR.addArticle(data).subscribe(() => {
          this.getallData();
        });
      }
    });
  }
  
  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getallData(): void {
    this.AR.GETALL().subscribe((r) => {
      this.tabarticle = r;
      this.dataSource1 = new MatTableDataSource<any>(this.tabarticle);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    });
  }
}