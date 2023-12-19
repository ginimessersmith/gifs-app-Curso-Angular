import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs-services.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input
  type="text"
  class="form-control"
  placeholder="Buscar Gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})

export class SearchBoxComponent {

  //? aqui se elige el input
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value
    this.gifsService.searchTag(newTag)
    //? limpiando la caja de texto:
    this.tagInput.nativeElement.value = ''
  }

}
