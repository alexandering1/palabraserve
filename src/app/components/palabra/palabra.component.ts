import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LetraComponent } from '../letra/letra.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.sass']
})
export class PalabraComponent implements OnInit {

  @Input() letra!: string;
  @Input() palabra!: string;
  @Input() cont!: number;
  @Input() turno!: number;
  public letras!: string[];

  @ViewChildren(LetraComponent) letraComponents!: QueryList<LetraComponent>;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.letras = this.palabra.split('');
    console.log(this.letras);
  }

  comprobarPalabra() {
    let palabraIngresada = this.letraComponents.map(comp => comp.getOpcion()).join('');

    if (palabraIngresada.length < this.palabra.length) {
      return false; // No hacer nada si no se han ingresado todas las letras
    }

    this.letraComponents.forEach((comp, index) => {
      setTimeout(() => {
        comp.onComprobar();
      }, index * 500); // Añadir un retraso para cada letra
    });

    if (palabraIngresada === this.palabra) {
      return true;
    } 
    return false;
  }

  get isCurrentTurn(): boolean {
    return this.cont === this.turno;
  }

  allLettersFilled(): boolean {
    return this.letraComponents.toArray().every(comp => comp.getOpcion().length > 0);
  }
}





