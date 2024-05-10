import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from 'src/modéles/Evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenmentService {
  private apiUrl = 'http://localhost:3000/evenements'; // Remplacez avec votre endpoint API

  constructor(private http: HttpClient) { }

  // Create
  addEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.apiUrl, evenement);
  }

  // Read
  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  getEvenementById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }

  // Update
  updateEvenement(id: string, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.apiUrl}/${id}`, evenement);
  }

  // Delete
  deleteEvenement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get All (implémentation de la méthode GETALL)
  GETAll(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }
}
