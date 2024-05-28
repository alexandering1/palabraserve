// records.component.ts
import { Component, OnInit } from '@angular/core';
import { PalabraService } from 'src/app/services/palabra.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.sass']
})
export class RecordsComponent implements OnInit {
  public mejoresTiempos: any[] = [];

  constructor(private palabraService: PalabraService) { }

  ngOnInit(): void {
    this.palabraService.getJugadores().subscribe((data: any) => {
      this.mejoresTiempos = this.getTop5MejoresTiempos(data);
    });
  }

  getTop5MejoresTiempos(jugadores: any[]): any[] {
    return jugadores
      .sort((a, b) => a.tiempo - b.tiempo)
      .slice(0, 5);
  }
}


