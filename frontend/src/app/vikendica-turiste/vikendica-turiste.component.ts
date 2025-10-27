import { Component, inject, OnInit } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { VikendiceService } from '../services/vikendice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vikendica-turiste',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './vikendica-turiste.component.html',
  styleUrl: './vikendica-turiste.component.css'
})
export class VikendicaTuristeComponent implements OnInit{

    private router = inject(Router)
    private vikendiceService = inject(VikendiceService)

  sveVikendice: Vikendica[] = []
  Vikendice: Vikendica[] = []


  ngOnInit(): void {
    this.vikendiceService.getVikendice().subscribe(data=>{
      this.sveVikendice = data
      for(let v of this.sveVikendice){
        v.ocena = 0
        if(v.ocene.length > 0){
          for(let o of v.ocene){
          v.ocena += o
        }
        v.ocena/= v.ocene.length
        }

      }
      this.Vikendice = this.sveVikendice
    })

  }


  nazivParam = ""
  mestoParam = ""
  nazivSmer = false
  mestoSmer = false



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

  getZvezde(ocena: number):string[]{
    const zvezde: string[] = []
    const o = Math.round(ocena*2)/2

    for(let i = 1; i<6; i++){
      if(i<=o){
      zvezde.push('fa-star');
      } else if(o+0.5 >= i) { 
        zvezde.push('fa-star-half-o');
      }
      else {
        zvezde.push('fa-star-o')
      }
    }
    return zvezde
  }

}
