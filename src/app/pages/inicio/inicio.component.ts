import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PalabraService } from 'src/app/services/palabra.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  public nivel: number = 0;
  public jugador: string = '';
  public correo: string = '';
  public opciones: any[] = [];
  private jugadorId: number | null = null;

  constructor(
    public router: Router,
    private palabraService: PalabraService
  ) { }

  ngOnInit() {
    this.palabraService.getNiveles().subscribe((niveles: any) => {
      this.opciones = niveles;
    });
  }

  onSelectNivel(id: number) {
    const jugadorData = {
      nombre: this.jugador,
      correo: this.correo,
    };

    this.palabraService.saveJugador(jugadorData).subscribe((response: any) => {
      this.jugadorId = response.id; // Guardar el ID del jugador
      if (this.jugadorId !== null) {
        this.palabraService.setJugadorId(this.jugadorId); // Pasar el ID al servicio
        this.router.navigate(['/tablero', id]);
      } else {
        console.error('Error al guardar el jugador.');
      }
    });
  }
}

