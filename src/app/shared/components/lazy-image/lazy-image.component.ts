import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {
  ngOnInit(): void {
    if (!this.urlImage) throw new Error('UrlImage es requerido');
  }

  public hasLoader: boolean = false

  //? recibir la url de la imagen:
  @Input()
  public urlImage!: string

  //? recibir el texto alternativo:
  @Input()
  public altImage: string = ''

  onLoad() {
    console.log('Imagen cargada')
    this.hasLoader = true
  }
}
