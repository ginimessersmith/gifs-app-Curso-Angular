import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = []
  private _tagHistory: string[] = []
  private api_key = environment.gif_api_key
  private serviceUrl = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    //? cargar los datos del localstore si es que hay
    this.loadLocalStore()
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()
    if (this._tagHistory.includes(tag)) {
      //? retorna un arreglo sin el tag, en caso que este exista
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagHistory.unshift(tag)
    this._tagHistory = this._tagHistory.splice(0, 10)
    //? llamar a la funcion saveLocalStore
    this.saveLocalStore()
  }

  private saveLocalStore(): void {
    //? guardando el historial en el local store
    localStorage.setItem('historial', JSON.stringify(this._tagHistory))
  }

  private loadLocalStore(): void {
    //? si no hay datos en 'historial' no hacer nada
    if (!localStorage.getItem('historial')) return
    //? si hay datos mostrar lo que hay en el local store:
    this._tagHistory = JSON.parse(localStorage.getItem('historial')!)
    if (this._tagHistory.length > 0) {
      this.searchTag(this._tagHistory[0])
    }
  }

  get tagsHistory() {
    //? mandando la copia del tag history
    return [...this._tagHistory]
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return
    this.organizeHistory(tag)


    //? llamadas a una api, requerimientos:
    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', tag)
    //?usar http, primero en el app module, importar httpclient y luego importar aqui: import { HttpClient, HttpParams } from '@angular/common/http'
    //? previamente crear la interface respectiva de la respuesta <SearchResponse>, con quicktype.io , usar postman para obtener el jsons
    //?el this.http.get y todas las peticiones http son genericos por tanto se le dice que tipo de dato sera mediante una interface:
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(response => {
        this.gifsList = response.data
        console.log(this.gifsList)
      })

  }


}
