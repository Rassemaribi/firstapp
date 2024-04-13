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
    public dialogRef: MatDialogRef<ArticleformComponent>
  ) { }

  formArticle!: FormGroup;

  ngOnInit(): void {
    this.idcourant = this.activatedroute.snapshot.params['id'];

    if (!!this.idcourant) {
      this.AR.getArticleById(this.idcourant).subscribe((article: Publication) => {
        this.initForm2(article);
      });
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
    // Fermer la boîte de dialogue et envoyer les données du formulaire
    this.dialogRef.close(this.formArticle.value);

    // Ajouter les éléments du formulaire au tableau
    this.AR.ONSAVE(this.formArticle.value).subscribe(() => {
      console.log('Article ajouté avec succès.');
      this.router.navigate(['/article']);
      // Rediriger l'utilisateur vers une autre page ou faire une autre action si nécessaire
      this.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
