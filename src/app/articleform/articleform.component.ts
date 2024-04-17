import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/modéles/Publication';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.css']
})
export class ArticleformComponent implements OnInit {

  idcourant!: string;

  constructor(
    private AR: ArticleService, 
    private router: Router,
    private activatedroute: ActivatedRoute,
    public dialogRef: MatDialogRef<ArticleformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {this.idcourant = data.id;}

  formArticle!: FormGroup;

  ngOnInit(): void {
    if (this.data) {
      console.log('ID:', this.data.id);
      console.log('Article:', this.data.article);
      this.initForm2(this.data.article);
    } else {
      this.initForm1();
    }
  }

  initForm1(): void {
    this.formArticle = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      titre: new FormControl(null, [Validators.required]),
      lien: new FormControl(null, [Validators.required]),
      sourcepdf: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required])
    });
  }

  initForm2(article: Publication): void {
    this.formArticle = new FormGroup({
      type: new FormControl(article.type, [Validators.required]),
      titre: new FormControl(article.titre, [Validators.required]),
      lien: new FormControl(article.lien, [Validators.required]),
      sourcepdf: new FormControl(article.sourcepdf, [Validators.required]),
      date: new FormControl(article.date, [Validators.required])
    });
  }

  save(): void {
    if (this.idcourant) {
      console.log('ID:', this.idcourant);
      // Update existing article
      this.AR.updateArticle(this.idcourant, this.formArticle.value).subscribe(() => {
        console.log('Article mis à jour avec succès.');
        
        this.closeAndRedirect();
      });
    } else {
      // Add new article
      this.AR.ONSAVE(this.formArticle.value).subscribe(() => {
        console.log('Article ajouté avec succès.');
        this.closeAndRedirect();
      });
    }
  }
  
  closeAndRedirect(): void {
    this.dialogRef.close();
    this.router.navigate(['/article']);
  }

  close(): void {
    this.dialogRef.close();
  }

  // Vous pouvez ajouter d'autres méthodes ici selon les besoins de votre application
}
