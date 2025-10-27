import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Rezervacija } from '../models/rezervacija';
import { CommonModule } from '@angular/common';
import { RezervacijeService } from '../services/rezervacije.service';
import { VikendiceService } from '../services/vikendice.service';

@Component({
  selector: 'app-oceni-rezervaciju',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './oceni-rezervaciju.component.html',
  styleUrl: './oceni-rezervaciju.component.css'
})
export class OceniRezervacijuComponent implements OnInit {

  rezervacija: Rezervacija = new Rezervacija()
  private router = inject(Router)
  private rezervacijaService = inject(RezervacijeService)
  private vikendicaService = inject(VikendiceService)

  ocene: number[] = [1, 2, 3, 4, 5]; 
  ngOnInit(): void {
    let r = localStorage.getItem("rezervacija")
    if(r)
      this.rezervacija = JSON.parse(r)
    
  }

  postaviOcenu(br: number){
    this.rezervacija.ocena = br
  }

  popunjena(br: number){
    return br < this.rezervacija.ocena
  }

  odustani(){
    localStorage.removeItem("rezervacija")
    this.router.navigate(["turista/rezervacije"])
  }
  potvrdi(){
    if(this.rezervacija.ocena == 0){
      alert("Daj neku ocenu ili pritisni dugme Odustani")
    }
    this.rezervacijaService.promeniRezervaciju(this.rezervacija.idR,this.rezervacija.komentar,this.rezervacija.ocena).subscribe(data=>{
      this.vikendicaService.dodajOcenuVikendici(this.rezervacija.idV, this.rezervacija.ocena).subscribe(data=>{

      })
      if(this.rezervacija.komentar != ""){
        this.vikendicaService.dodajKomentarVikendici(this.rezervacija.idV, this.rezervacija.komentar).subscribe(data=>{
          
        })
      }

    })
    localStorage.removeItem("rezervacija")
    this.router.navigate(["turista/rezervacije"])
  }

    getZvezde(ocena: number):string[]{
    const zvezde: string[] = []
    for(let i = 1; i<6; i++){
      if(i<=ocena){
      zvezde.push('fa-star');
      } else {
        zvezde.push('fa-star-o')
      }
    }
    return zvezde
  }

}
