import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cancion } from '../../models/cancion.model';

@Component({
  selector: 'app-cancion',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css'
})

export class CancionComponent {

  @Input() cancion!: Cancion;
  @Output() eventoModificar: EventEmitter<Cancion> = new EventEmitter<Cancion>();
  @Output() eventoEliminar: EventEmitter<Cancion> = new EventEmitter<Cancion>();

  public modificar(cancion: Cancion): void {
    this.eventoModificar.emit();
  }

  public eliminar(cancion: Cancion): void {
    this.eventoEliminar.emit();
  }

}