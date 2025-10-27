import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  constructor() { }

  private httpClient = inject(HttpClient)

  getRezervacije(){
    return this.httpClient.get<Rezervacija[]>("http://localhost:4000/rezervacije/getRezervacije")
  }

  dodajRezervaciju(r: Rezervacija){
    return this.httpClient.post<Message>("http://localhost:4000/rezervacije/dodajRezervaciju", r)
  }

  obrisiRezervaciju(idR: number){
    return this.httpClient.post<Message>("http://localhost:4000/rezervacije/obrisiRezervaciju", {idR})
  }
  
  getRezervacijeTuriste(user: string){
    return this.httpClient.get<Rezervacija[]>(`http://localhost:4000/rezervacije/getRezervacijeTuriste/${user}`, {observe: 'response'});
  }

  promeniRezervaciju(idR: number,komentar: string, ocena: number){
    return this.httpClient.post<Message>("http://localhost:4000/rezervacije/promeniRezervaciju",{idR:idR, komentar: komentar, ocena: ocena} )
  }

  getRezervacijeVikendice(idV: number){
    return this.httpClient.get<Rezervacija[]>(`http://localhost:4000/rezervacije/getRezervacijeVikendice/${idV}`, {observe: 'response'});
  }


    promenaRezervacijeVlasnik(idR: number,komentarVlasnika: string, status: string){
    return this.httpClient.post<Message>("http://localhost:4000/rezervacije/promenaRezervacijeVlasnik",{idR:idR, komentarVlasnika: komentarVlasnika, status: status} )
  }

  
}
