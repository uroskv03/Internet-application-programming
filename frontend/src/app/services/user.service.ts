import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private httpClient = inject(HttpClient)

  login(u: string, p: string){
    const data={
      korIme: u,
      lozinka: p, 
    }
    return this.httpClient.post<User>("http://localhost:4000/users/login", data)
  }

  loginAdmin(u: string, p: string){
    const data={
      korIme: u,
      lozinka: p, 
    }
    return this.httpClient.post<User>("http://localhost:4000/users/loginAdmin", data)
  }

  register(u: User){
    return this.httpClient.post<Message>("http://localhost:4000/users/register", u)
  }

  aktiviraj(u: User){
    return this.httpClient.post<Message>("http://localhost:4000/users/aktiviraj", u)
  }

  deaktiviraj(u: User){
    return this.httpClient.post<Message>("http://localhost:4000/users/deaktiviraj", u)
  }

  getUser(user: string){
    return this.httpClient.get<User>(`http://localhost:4000/users/getUser/${user}`, {observe: 'response'});
  }

  promeniLozinku(korIme: String, lozinka: String){
    return this.httpClient.post<Message>("http://localhost:4000/users/promeniLozinku",{korIme: korIme, lozinka: lozinka});
  }

  promeni(u: User){
    const formData = new FormData()
    formData.append('korIme', u.korIme)
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
    return this.httpClient.post<Message>("http://localhost:4000/users/promeni",formData);
  }

  getVlasnike(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/getVlasnike")
  }

  getTuriste(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/getTuriste")
  }
}
