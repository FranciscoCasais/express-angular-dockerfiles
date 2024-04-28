import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CancionComponent } from '../cancion/cancion.component';
import cancionModel, { Cancion } from '../../models/cancion.model';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    CancionComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  protected canciones: Cancion[] = [];
  public cancionService = inject(CancionService);
  public blur: boolean = false;
  public agregando: boolean = false;
  public modificando: boolean = false;
  public eliminando: boolean = false;
  public cancionActual: Cancion = {
    id: -1,
    nombre: '',
    artista: '',
    album: '',
    minutos: -1,
    segundos: -1
  };

  constructor() {
    this.actualizarDatos();
  }

  public actualizarDatos(): void {
    this.cancionService.obtenerCanciones().subscribe((jsonCanciones: any) => {
      this.canciones = this.jsonToArregloCancion(jsonCanciones);
    });
  }

  public jsonToArregloCancion(jsonCanciones: any): Cancion[] {
    let canciones: Cancion[] = [];
    for(let i = 0; i < jsonCanciones.canciones.length; i++) {
      let cancion: Cancion = cancionModel.new();
      cancion.id = jsonCanciones.canciones[i].id;
      cancion.nombre = jsonCanciones.canciones[i].nombre;
      cancion.artista = jsonCanciones.canciones[i].artista;
      cancion.album = jsonCanciones.canciones[i].album;
      cancion.minutos = jsonCanciones.canciones[i].minutos;
      cancion.segundos = jsonCanciones.canciones[i].segundos;
      canciones.push(cancion);
    }
    return canciones;
  }

  public agregar() {
    this.blur = true;
    this.agregando = true;
  }

  public modificar(cancion: Cancion): void {
    this.blur = true;
    this.modificando = true;
    this.cancionActual = cancion;
  }

  public eliminar(cancion: Cancion): void {
    this.blur = true;
    this.eliminando = true;
    this.cancionActual = cancion;
  }

  public resultadoAccion(resultado: string) {
    
    this.blur = false;
    this.agregando = false;
    this.modificando = false;
    this.eliminando = false;

    if(resultado === 'agregar') {

      this.cancionService.agregarCancion(cancionModel.new(
        (<HTMLInputElement>document.getElementById("addedName")).value,
        (<HTMLInputElement>document.getElementById("addedArtist")).value,
        (<HTMLInputElement>document.getElementById("addedAlbum")).value,
        Number((<HTMLInputElement>document.getElementById("addedMinutes")).value),
        Number((<HTMLInputElement>document.getElementById("addedSeconds")).value)
      )).subscribe(() => {
        this.actualizarDatos();
      });

    } else if(resultado === 'modificar') {

      let nuevaCancion = cancionModel.new(
        (<HTMLInputElement>document.getElementById("newName")).value,
        (<HTMLInputElement>document.getElementById("newArtist")).value,
        (<HTMLInputElement>document.getElementById("newAlbum")).value,
        Number((<HTMLInputElement>document.getElementById("newMinutes")).value),
        Number((<HTMLInputElement>document.getElementById("newSeconds")).value),
        this.cancionActual.id
      );

      if(nuevaCancion.nombre === '') nuevaCancion.nombre = this.cancionActual.nombre;
      if(nuevaCancion.artista === '') nuevaCancion.artista = this.cancionActual.artista;
      if(nuevaCancion.album === '') nuevaCancion.album = this.cancionActual.album;
      if(nuevaCancion.minutos === 0) nuevaCancion.minutos = this.cancionActual.minutos;
      if(nuevaCancion.segundos === 0) nuevaCancion.segundos = this.cancionActual.segundos;

      this.cancionService.modificarCancion(nuevaCancion).subscribe(() => {
        this.actualizarDatos();
      });

    } else if(resultado === 'eliminar') {
      this.cancionService.eliminarCancion(this.cancionActual.id).subscribe(() => {
        this.actualizarDatos();
      });
    }

  }

}