import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  public palabras: string[] = [];
  public niveles: String[] = [];
  private jugadorId: number | null = null;

  constructor(public http: HttpClient) { }

  getPalabras() {
    return this.http.get('http://localhost:3000/palabras');
  }

  getNiveles() {
    return this.http.get('http://localhost:3000/niveles');
  }

  saveJugador(jugador: { nombre: string; correo: string }) {
    return this.http.post(`http://localhost:3000/jugadores`, jugador);
  }

  setJugadorId(id: number) {
    this.jugadorId = id;
  }

  saveJuego(datosJuego: { tiempo: number; intentos: number }) {
    if (this.jugadorId !== null) {
      return this.http.patch(`http://localhost:3000/jugadores/${this.jugadorId}`, datosJuego);
    } else {
      throw new Error('Jugador ID no está definido.');
    }
  }

  deleteJugador() {
    if (this.jugadorId !== null) {
      return this.http.delete(`http://localhost:3000/jugadores/${this.jugadorId}`);
    } else {
      throw new Error('Jugador ID no está definido.');
    }
  }
  getJugadores() {
    return this.http.get('http://localhost:3000/jugadores');
  }



}



