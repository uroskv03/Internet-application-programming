import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor() { }

  private httpClient = inject(HttpClient)

  dodajZahtev(u: User){
    const formData = new FormData()
    formData.append('korIme', u.korIme)
    formData.append('lozinka', u.lozinka)  
    formData.append('ime', u.ime)
    formData.append('prezime', u.prezime)
    formData.append('tip', u.tip)
    formData.append('pol', u.pol)
    formData.append('adresa', u.adresa)
    formData.append('telefon', u.telefon)
    formData.append('mejl', u.mejl)
    formData.append('brojKredinteKartice', u.brojKredinteKartice.toString());
    if (u.slika) {
      formData.append('slika', u.slika);
    } 
    return this.httpClient.post<Message>("http://localhost:4000/zahtevi/dodajZahtev", formData)
  }

  obrisiZahtev(korIme: String){
    return this.httpClient.post<Message>("http://localhost:4000/zahtevi/obrisiZahtev", {korIme})
  }

  getZahteve(){
    return this.httpClient.get<User[]>("http://localhost:4000/zahtevi/getZahteve")
  }

  odbiZahtev(u: User){
    return this.httpClient.post<Message>("http://localhost:4000/zahtevi/odbiZahtev", u)
  }

}
