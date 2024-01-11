import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent implements OnInit {
  ngOnInit(): void {
    if(!this.gifCard) throw new Error('el gif es requerido')
  }
  //! on init, metodo que se va ejecutar cuando el commponente se esta inicializando
  @Input()
  public gifCard!: Gif
}
