import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL1 } from 'src/app/app_config';
import { Publication } from 'src/modéles/Publication';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(private httpClient: HttpClient){}

  addArticle(article: any): Observable<Publication> {
    return this.httpClient.post<Publication>("http://localhost:3000/publication", article);
  }

  ONSAVE(articleTosave: any): Observable<Publication> {
    return this.httpClient.post<Publication>("http://localhost:3000/publication", articleTosave);
  }

  ONDELETE(id:string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/publication/${id}`);
  }

  getArticleById(id:string): Observable<Publication> {
    return this.httpClient.get<Publication>(`http://localhost:3000/publication/${id}`);
  }

  updateArticle(id: string, formArticle:any): Observable<Publication> {
    console.log('ID:', id);
    return this.httpClient.put<Publication>(`http://localhost:3000/publication/${id}`, formArticle);
  }

  GETALL(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>("http://localhost:3000/publication");
  }
}