import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs-services.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.css']
})
export class HomePagesComponent {
  //? inyectar los datos obtenidos de la api de gifphy
  //? de esta forma se pueden usar en otros componentes,
  //? como el arreglo de se obtiene en search y ese arreglo mostrarlo en card-list

  constructor(private gifsService: GifsService) {

  }

  get gifsListFromService(): Gif[] {
    return this.gifsService.gifsList;
  }


}
