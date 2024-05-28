
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent implements OnInit {
  @Input() palabra!: string;
  @Input() letra!: string;
  @Input() disabled: boolean = true;  // Nuevo input para manejar el estado deshabilitado
  public flip: boolean = false;
  public opcion: string = '';
  public css: string = ''; // 1. igual Verde. 2. naranja. 3. gris
  @Output() opcionCambiada = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  onComprobar() {
    if (this.opcion === this.letra) {
      this.css = 'acierto';
    } else if (this.palabra.includes(this.opcion) && this.opcion !== this.letra) {
      this.css = 'casi';
    } else {
      this.css = 'fallo';
    }
    this.flip = true; // Activar la animación
    setTimeout(() => this.flip = false, 500)
  }

  getOpcion() {
    return this.opcion;
  }



  
}



  

  
  











