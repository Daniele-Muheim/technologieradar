import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Technologie } from '../components/models/Technologies';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private apiUrl = `http://localhost:4566/technologies`;

  constructor(private http: HttpClient) { }

  createTechnologie(technologie: Technologie): Observable<Technologie> {
    technologie.creationDate = this.setDateAndTime();
    return this.http.post<Technologie>(`${this.apiUrl}`, technologie)
      .pipe(
        tap(_ => this.log(`created content item with id ${technologie._id}`)),
      );
  }

  getTechnologies(): Observable<Technologie[]> {
    return this.http.get<Technologie[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched technologies')),
      );
  }

  getTechnologiesByID(id: string): Observable<Technologie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Technologie>(url)
      .pipe(
        tap(_ => this.log('fetched technologies')),
      );
  }

  getTechnologiesByStatus(status: Boolean): Observable<Technologie[]> {
    const url = `http://localhost:4566/getAllStatus/${status}`;
    return this.http.get<Technologie[]>(url)
      .pipe(
        tap(_ => this.log('publish technologies')),
      );
  }

  publishTechnologiesByID(id: string, technologie: Technologie): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    technologie.status = true;
    technologie.publicationDate = this.setDateAndTime();
    return this.http.put<Technologie>(url, technologie)
      .pipe(
        tap(_ => this.log(`updated technologies`)),
      );
  }

  editTechnologiesByID(id: string, technologie: Technologie): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Technologie>(url, technologie)
      .pipe(
        tap(_ => this.log(`updated technologies`)),
      );
  }

  deleteTechnologie(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Technologie>(url)
      .pipe(
        tap(_ => this.log(`updated technologies`)),
      );

  }

  private setDateAndTime() {
    var date = new Date();
    const dateTimeStamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    return dateTimeStamp;
  }

  private log(message: string) {
    console.log(message);
  }
}
