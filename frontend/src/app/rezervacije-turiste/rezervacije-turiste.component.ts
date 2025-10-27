import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacija';
import { UserService } from '../services/user.service';
import { VikendiceService } from '../services/vikendice.service';

@Component({
  selector: 'app-rezervacije-turiste',
  standalone: true,
  imports: [FormsModule,RouterOutlet],
  templateUrl: './rezervacije-turiste.component.html',
  styleUrl: './rezervacije-turiste.component.css'
})
export class RezervacijeTuristeComponent implements OnInit{
  
  private router = inject(Router)
  private rezervacijaService = inject(RezervacijeService)
  private vikendicaService = inject(VikendiceService)
  private userService = inject(UserService)
  rezervacije: Rezervacija[] = []
  rezervacijeArhiva: Rezervacija[] = []
  rezervacijeAktivne: Rezervacija[] = []
  danas = new Date()
  ngOnInit(): void {

    this.danas = new Date()
    let u = localStorage.getItem("loggedUser")
    if(u){
      this.userService.getUser(u).subscribe(data=>{
        this.rezervacijaService.getRezervacijeTuriste(u).subscribe(data=>{
          if(data.body){
            this.rezervacije = data.body
            this.rezervacijeAktivne = []
            this.rezervacijeArhiva = []
            for(let r of this.rezervacije){
              this.vikendicaService.getVikendica(r.idV).subscribe(data=>{
                if(data.body){
                  r.nazivV = data.body.naziv
                  r.mestoV = data.body.mesto
                  r.uslov = (this.danas > new Date(r.datumKraja))
                }
                let p = new Date(r.datumPocetka).getTime()
                if(p > this.danas.getTime()){
                  r.datumPocetka1 = new Date(r.datumPocetka)
                  this.rezervacijeAktivne.push(r)
                }else{
                  r.datumPocetka1 = new Date(r.datumPocetka)
                  this.rezervacijeArhiva.push(r)
                  this.rezervacijeArhiva.sort((a,b) =>
                  b.datumPocetka1.getTime() - a.datumPocetka1.getTime())

                }
              })
            }
          }
        })
      })
    }
  }

  oceni(r: Rezervacija){
    localStorage.setItem("rezervacija", JSON.stringify(r))
    this.router.navigate(["oceniRezervaciju"])
  }
  
  otkazi(r: Rezervacija){
    this.rezervacijaService.obrisiRezervaciju(r.idR).subscribe(data=>{
      alert(data.message)
      this.ngOnInit()
    })
  }

}
