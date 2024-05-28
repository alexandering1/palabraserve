import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PalabraService } from 'src/app/services/palabra.service';
import { PalabraComponent } from 'src/app/components/palabra/palabra.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.sass']
})
export class TableroComponent implements OnInit {

  @ViewChildren(PalabraComponent) palabraComponents!: QueryList<PalabraComponent>;

  public numfilas: number[] = [];
  public id: number = 0;
  public palabras: string[] = [];
  public iteracion: any[] = [];
  public palabra: string = '';
  public turno = 0;
  public palabraIngresada: string = '';
  public letras: string[] = [''];
  public nivel: any = '';
  private startTime: number = 0;  // Tiempo de inicio
  public intentos: number = 0;

  constructor(public activedRoute: ActivatedRoute, public palabraSer: PalabraService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.palabraSer.getNiveles().subscribe((niveles: any) => {
      this.nivel = niveles.find((item: any) => item.id == this.id);
      this.numfilas = Array(this.nivel.opc).fill(0).map((x, i) => i);
    });

    this.palabraSer.getPalabras().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.palabras.push(element.palabra);
      });

      this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      this.iteracion = new Array(this.nivel.opc).fill('');
      this.startTime = Date.now();
    });
  }

  comprobarPalabra() {
    if (this.turno < this.palabraComponents.length) {
      const currentPalabraComponent = this.palabraComponents.toArray()[this.turno];

      if (currentPalabraComponent.allLettersFilled()) {
        if (currentPalabraComponent.comprobarPalabra()) {
          this.intentos++;
          const endTime = Date.now();
          const timeTaken = (endTime - this.startTime) / 1000;

          alert(`¡Palabra correcta! Tiempo total: ${timeTaken} segundos. Intentos realizados: ${this.intentos}.`);

          const datosJuego = {
            tiempo: timeTaken,
            intentos: this.intentos
          };

          this.palabraSer.saveJuego(datosJuego).subscribe(() => {
            this.router.navigate(['/inicio']);
          });
          return;
        } else {
          this.intentos++;
          this.turno++;
        }
      } else {
        alert('Por favor, llena todas las letras antes de comprobar.');
      }
    }

    if (this.turno >= this.palabraComponents.length) {
      const endTime = Date.now();
      const timeTaken = (endTime - this.startTime) / 1000;

      alert(`Se han agotado todos los intentos. Tiempo total: ${timeTaken} segundos. Intentos realizados: ${this.intentos}. Volviendo al inicio.`);

      const datosJuego = {
        tiempo: timeTaken,
        intentos: this.intentos
      };

      this.palabraSer.saveJuego(datosJuego).subscribe(() => {
        this.palabraSer.deleteJugador().subscribe(() => {
          this.router.navigate(['/inicio']);
        });
      });
    }
  }
}









 
    