import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, Subject, of, catchError} from "rxjs";
import { NewDoctor } from "../../../../common/tables/NewDoctor";
import { Doctor } from "../../../../common/tables/Doctor"

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}
  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  public getAllDoctors() {
    return this.http.get(`${this.BASE_URL}/doctors`).pipe(catchError(this.handleError('getAllDoctors')));
  }

  public getAllServices() {
    return this.http.get(`${this.BASE_URL}/services`).pipe(catchError(this.handleError('getAllServices')));
  }

  public postDoctor(doctor: NewDoctor) {
    return this.http.post(`${this.BASE_URL}/doctors`, { doctor }, {observe: 'response', responseType: 'json'});
  }

  public putDoctor(doctor: Doctor) {
    return this.http.put(`${this.BASE_URL}/doctors`, { doctor }, {observe: 'response', responseType: 'json'});
  }

  public deleteDoctor(id: number) {
    return this.http.delete(`${this.BASE_URL}/doctors/${id}`);
  }

  public getDoctorAppointments(id: number) {
    return this.http.get(`${this.BASE_URL}/appointments/doctor/${id}`, {observe: 'response', responseType: 'json'});
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
