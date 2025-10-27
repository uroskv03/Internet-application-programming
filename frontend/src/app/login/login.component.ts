import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { RezervacijeService } from '../services/rezervacije.service';
import { VikendiceService } from '../services/vikendice.service';
import { Vikendica } from '../models/vikendica';
import { Rezervacija } from '../models/rezervacija';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  private userService = inject(UserService)
  private router = inject(Router)
  private rezervacijeService = inject(RezervacijeService)
  private vikendiceService = inject(VikendiceService)

  sveVikendice: Vikendica[] = []
  Vikendice: Vikendica[] = []
  sveRezervacije: Rezervacija[] = []
  sviVlasnici: User[] = []
  sviTuristi: User[] = []
  brRez1 = 0
  brRez7 = 0
  brRez30 = 0
  msDan = 24*60*60*1000

  ngOnInit(): void {
    this.rezervacijeService.getRezervacije().subscribe(data=>{
      this.sveRezervacije = data
      this.brRez1 = 0
      this.brRez7 = 0
      this.brRez30 = 0
      let danas = new Date().getTime()
      for(let r of this.sveRezervacije){
        let p = danas-new Date(r.datumKreiranja).getTime()
        //if(r.status == "Odobrena"){}
        if(p < this.msDan){
          this.brRez1++
        } 
        if (p < this.msDan*7){
          this.brRez7++
        }
        if (p < this.msDan*30){
          this.brRez30++
        }
      }
    })

    this.vikendiceService.getVikendice().subscribe(data=>{
      this.sveVikendice = data
      this.Vikendice = this.sveVikendice
    })
    this.userService.getTuriste().subscribe(data=>{
      this.sviTuristi = data
    })
    this.userService.getVlasnike().subscribe(data=>{
      this.sviVlasnici = data
    })
  }

  korIme = ""
  lozinka = ""
  message = ""
  nazivParam = ""
  mestoParam = ""
  nazivSmer = false
  mestoSmer = false

  login(){
    this.userService.login(this.korIme, this.lozinka).subscribe(data=>{
      if(data){
        if(data.aktivan){
          this.message = ""
          localStorage.setItem("loggedUser", data.korIme)
          this.router.navigate([""])
          if(data.tip == "vlasnik" ){
            this.router.navigate(["vlasnik/profil"])
          } else{
            this.router.navigate(["turista/profil"])
          }
        } else {
          this.message = "Nalog je deaktiviran"
        }
      }
      else{
        this.message = "Pogresno korisnicko ime ili lozinka"
      }
    })
  }

  sortirajNaziv(){
    this.nazivSmer = !this.nazivSmer
    this.Vikendice = this.Vikendice.sort((v1,v2) => {
      if(v1.naziv < v2.naziv){
        return 1 
      } else  {
        if(v1.naziv > v2.naziv){
          return -1
        } else {
          return 0
        }
      }
    })
    if(this.nazivSmer){
      this.Vikendice.reverse()
    }
  }

  sortirajMesto(){
    this.mestoSmer = !this.mestoSmer
    this.Vikendice = this.Vikendice.sort((v1,v2) => {
      if(v1.mesto < v2.mesto){
        return 1 
      } else  {
        if(v1.mesto > v2.mesto){
          return -1
        } else {
          return 0
        }
      }
    })
    if(this.mestoSmer){
      this.Vikendice.reverse()
    }
  }

  traziNaziv(){
    this.Vikendice = this.sveVikendice.filter(v => v.naziv.includes(this.nazivParam))
  }

  traziMesto(){
    this.Vikendice = this.sveVikendice.filter(v => v.mesto.includes(this.mestoParam))
  }

  trazi(){
    this.Vikendice = this.sveVikendice.filter(v => v.naziv.includes(this.nazivParam) && v.mesto.includes(this.mestoParam))
  }

}
