import { Component, inject, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { RezervacijeService } from '../services/rezervacije.service';
import { VikendiceService } from '../services/vikendice.service';
import { UserService } from '../services/user.service';
import { Rezervacija } from '../models/rezervacija';
import { Vikendica } from '../models/vikendica';

import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-rezervacije-vlasnika',
  standalone: true,
  imports: [FormsModule,RouterOutlet],
  templateUrl: './rezervacije-vlasnika.component.html',
  styleUrl: './rezervacije-vlasnika.component.css'
})
export class RezervacijeVlasnikaComponent implements OnInit{
  
    private router = inject(Router)
    private rezervacijaService = inject(RezervacijeService)
    private vikendicaService = inject(VikendiceService)
    private userService = inject(UserService)
    rezervacije: Rezervacija[] = []
    rezervacijeKalendar: Rezervacija[] = []
    vikendice: Vikendica[] = []
    danas = new Date().toISOString()

    @ViewChild('calendar') calendarRef!: ElementRef;
    private calendar!: Calendar;
  ngOnInit(): void {
    let br = 0
    this.danas = new Date().toISOString()
    this.rezervacije = []
    this.rezervacijeKalendar = []
    let u = localStorage.getItem("loggedUser")
    if(u){
      this.userService.getUser(u).subscribe(data=>{
        this.vikendicaService.getVikendiceVlasnika(u).subscribe(data=>{
          if(data.body)
            this.vikendice = data.body
          let br = this.vikendice.length
          let x = 0
            for(let v of this.vikendice){
              x++
              this.rezervacijaService.getRezervacijeVikendice(v.idV).subscribe(data=>{
                if(data.body){
                  let br2 = data.body.length
                  let y = 0
                  for(let r of data.body){
                    y++
                    this.vikendicaService.getVikendica(r.idV).subscribe(data=>{
                  if(data.body){
                    r.nazivV = data.body.naziv
                    r.mestoV = data.body.mesto
                  }
                  })
                  if(r.status == "Na cekanju" || r.status == "Odobrena")
                  this.rezervacijeKalendar.push(r)
                    if(this.danas < new Date(r.datumPocetka).toISOString() && r.status == "Na cekanju"){
                      this.rezervacije.push(r)
                      this.rezervacije = this.rezervacije.sort((w1,w2) => {
                        if(new Date(w1.datumPocetka).toISOString() < new Date(w2.datumPocetka).toISOString()){
                          return -1 
                        } else  {
                          if(w1 == w2 ){
                            return 0
                          } else {
                            return 1
                          }
                        }
                      })
                    }
                    //if(x==br && y==br2)
                    setTimeout(() => this.prikaziKalendar(), 300);
                  }
                }
              })
            }

        })
      })
    }
  }

  private prikaziKalendar(): void {
    if (this.calendar) this.calendar.destroy();

    const events = this.rezervacijeKalendar.map(r => ({
      title: `${r.nazivV}`,
      start: new Date(r.datumPocetka).toISOString().split('T')[0],
      end: new Date(r.datumKraja).toISOString().split('T')[0],
      backgroundColor: r.status === "Na cekanju" ? '#f7d400' : '#32CD32',
      borderColor: 'black',
      textColor: 'black',
      extendedProps: { rezervacija: r }
    }));

    this.calendar = new Calendar(this.calendarRef.nativeElement, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      height: 600,
      events: events,
      eventClick: (info) => this.otvoriDijalog(info.event.extendedProps['rezervacija'])
    });

    this.calendar.render();
  }

otvoriDijalog(r: Rezervacija): void {
    if(new Date(this.danas) > new Date(r.datumPocetka)){
    alert("Datum je pre danasnjeng")
    return
  }
  
  if (r.status !== "Na cekanju") {
    alert("Rezervacija je već je odobrena.");
    return;
  }

  const potvrda = confirm(
    `Vikendica:${r.nazivV}:\n` +
    `Početak: ${r.datumPocetka}\n 
    Kraj: ${r.datumKraja}\n 
    Status: ${r.status}\n\n` +
    `Klikni OK da prihvatiš, ili Cancel da odbijes.`
  );

  if (potvrda) {
    this.prihvati(r);
  } else {
    const komentar = prompt("OBAVEZNO unesite komentar za odbijanje rezervacije. \n"+
    `Klikni OK da potvrdiš odbijanje, ili Cancel za odustajanje.`);

    if(komentar == null){
      //Cancel
    } else if(komentar.trim().length > 0) {
      r.komentarVlasnika = komentar.trim(); 
      this.odbi(r);
    } else {
      alert("Morate da ostavite kometar pri odbijanju");
    }
  }
}

  odbi(r:Rezervacija){
    if(r.komentarVlasnika == ""){
      alert("Morate da ostavite kometar pri odbijanju")
    } else {
      r.status = "Odbijena"
      this.rezervacijaService.promenaRezervacijeVlasnik(r.idR,r.komentarVlasnika,r.status).subscribe(data=>{
        this.ngOnInit()
      })
    }
  }

  prihvati(r:Rezervacija){
    r.status = "Odobrena"
    /*this.vikendicaService.getVikendica(r.idV).subscribe(data=>{
      if(data.body)
      if(new Date(data.body.blokirana).getTime() > new Date(this.danas).getTime()){
        alert("blokirana je")
        //i sve ovo dole prodje ovde
      }
    }) */
    this.rezervacijaService.promenaRezervacijeVlasnik(r.idR,r.komentarVlasnika,r.status).subscribe(data=>{
      let dk = new Date(r.datumKraja).getTime()
      let dp = new Date(r.datumPocetka).getTime()
      for(let p of this.rezervacije){
        if(new Date(p.datumPocetka).getTime() < dk && new Date(p.datumKraja).getTime() > dp 
        && p.idV == r.idV && p.idR != r.idR){
          p.status = "Odbijena"
          p.komentarVlasnika = "Prihvatili smo drugu osobu u tom terminu"
          this.rezervacijaService.promenaRezervacijeVlasnik(p.idR,p.komentarVlasnika,p.status).subscribe(data=>{

          })
        }
      }
      setTimeout(() => this.ngOnInit(), 100);
    })
  }
}
