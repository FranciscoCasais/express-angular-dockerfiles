import cancionModel, { Cancion } from '../models/cancion.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CancionService {
  
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public obtenerCanciones() {
    return this.http.get(this.baseUrl);
  }

  public agregarCancion(cancion: Cancion) {
    return this.http.post(this.baseUrl, cancionModel.toJSON(cancion));
  }

  public modificarCancion(cancion: Cancion) {
    return this.http.put(this.baseUrl, cancionModel.toJSON(cancion));
  }

  public eliminarCancion(id: number) {
    return this.http.delete(`${ this.baseUrl }/${ id }`);
  }

}