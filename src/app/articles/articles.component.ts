import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/services/article.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ArticleformComponent } from '../articleform/articleform.component';
import { Publication } from 'src/modéles/Publication';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  dataSource1!: MatTableDataSource<any>;
  tabarticle: Publication[] = [];
  displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'sourcepdf', 'date', 'icon'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogRef!: MatDialogRef<any>;
  formArticle!: FormGroup;
  activatedroute: any;
  idcourant!: string;

  constructor(private AR: ArticleService, private dialog: MatDialog, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.getAllData();
  }



  update(id:string): void {
    if (id) {
      console.log('ID:', id); // Affiche l'ID dans la console
      this.AR.getArticleById(id).subscribe(articleToUpdate => {
        console.log('Article:', articleToUpdate); // Affiche l'article dans la console
        const configDialogue = new MatDialogConfig();
        configDialogue.disableClose = true;
        configDialogue.autoFocus = true;
  
        // Passer l'article complet et l'ID au dialogue
        configDialogue.data = {
          id: id,
          article: articleToUpdate
        };
  
        this.dialogRef = this.dialog.open(ArticleformComponent, configDialogue);
      
        this.dialogRef.afterClosed().subscribe((data: any) => {
          if (data) {
            this.AR.updateArticle(id, data).subscribe(() => {
              this.getAllData(); // Refresh the data after update
            });
          }
        });
      });
    }
  }

  delete(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AR.ONDELETE(id).subscribe(() => { // Utilisez la méthode deleteArticle
          this.getAllData();
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

    const dialogRef = this.dialog.open(ArticleformComponent, configDialogue);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.AR.addArticle(data).subscribe(() => {
          this.getAllData();
        });
      }
    });
  }

  getAllData(): void {
    this.AR.GETALL().subscribe((data: Publication[]) => { // Utilisez la méthode getAllArticles
      this.tabarticle = data;
      this.dataSource1 = new MatTableDataSource(this.tabarticle);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    });
  }



}
