import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class VikendiceService {

  constructor() { }

  private httpClient = inject(HttpClient)

  getVikendice(){
    return this.httpClient.get<Vikendica[]>("http://localhost:4000/vikendice/getVikendice")
  }

  getVikendica(idV: Number){
    return this.httpClient.get<Vikendica>(`http://localhost:4000/vikendice/getVikendica/${idV}`, {observe: 'response'});
  }

  dodajOcenuVikendici(idV: number, ocena: number){
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/dodajOcenuVikendici",{
      idV: idV,
      ocena: ocena
    })
  }
  
  dodajKomentarVikendici(idV: number, komentar: String){
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/dodajKomentarVikendici",{
      idV: idV,
      komentar: komentar
    })
  }

  getVikendiceVlasnika(vlasnik: String){
    return this.httpClient.get<Vikendica[]>(`http://localhost:4000/vikendice/getVikendiceVlasnika/${vlasnik}`, {observe: 'response'});
  }

  obrisiVikendicu(idV: number){
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/obrisiVikendicu", {idV})
  }

  promeniVikendicu(v: Vikendica){
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/promeniVikendicu",v )
  }

  blokiraj(v: Vikendica){
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/blokiraj",v )
  }
  

  ukloniSliku(idV: number, slika: String){
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/ukloniSliku",{
      idV: idV,
      slika: slika
    })
  }

  dodajSliku(idV: number, slika: string){
    const formData = new FormData()
    formData.append('idV', idV.toString())
    if (slika) {
      console.log(slika)
      formData.append('slika', slika);
    }
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/dodajSliku",formData)
  }

  dodajVikendicu(v:Vikendica){
    const formData = new FormData()
    formData.append('naziv', v.naziv)
    formData.append('mesto', v.mesto)
    formData.append('usluge', v.usluge)
    formData.append('telefon', v.telefon)
    formData.append('koordinate', v.koordinate.lat.toString())
    formData.append('koordinate', v.koordinate.lng.toString())
    console.log(v.koordinate)
    formData.append('vlasnik', v.vlasnik)
    for(let c of v.cenovnik){
      formData.append("cenovnik",c.toString())
    }

    if (v.galerija && v.galerija.length > 0) {
      for(let i =0; i< v.galerija.length; i++){
        formData.append('slike', v.galerija[i]);
      }
    } 
    return this.httpClient.post<Message>("http://localhost:4000/vikendice/dodajVikendicu", formData)
  }
  
}
