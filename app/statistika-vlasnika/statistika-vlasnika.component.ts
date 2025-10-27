import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { VikendiceService } from '../services/vikendice.service';
import { RezervacijeService } from '../services/rezervacije.service';
import { Vikendica } from '../models/vikendica';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-statistika-vlasnika',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './statistika-vlasnika.component.html',
  styleUrl: './statistika-vlasnika.component.css'
})
export class StatistikaVlasnikaComponent implements OnInit, AfterViewInit {

  private vikendicaService = inject(VikendiceService)
  private rezervacijaService = inject(RezervacijeService)

  vikendice: Vikendica[] = []
  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    if(u)
    this.vikendicaService.getVikendiceVlasnika(u).subscribe(data=>{
      if(data.body)
      this.vikendice = data.body
    let l = 0
      for(let v of this.vikendice){
        this.rezervacijaService.getRezervacijeVikendice(v.idV).subscribe(data=>{
          v.rezervacije = data.body || []
          //v.rezervacije = v.rezervacije.filter(v=> v.status == "Odobrena" && new Date(v.datumKraja) < new Date() )
          l++
          if(l == this.vikendice.length){
            setTimeout(() => this.crtajGrafikone(), 0);
          }
        })
      }
  })
  }

  ngAfterViewInit(): void {
    if (this.vikendice.length > 0) {
      setTimeout(() => this.crtajGrafikone(), 0);
    }
  }

   private crtajGrafikone() {
    for (let v of this.vikendice) {
      const meseciData = this.meseci(v);
      const vikendiData = this.vikendi(v);

      // --- Bar chart ---
      const barCanvas = document.getElementById(`barChart-${v.idV}`) as HTMLCanvasElement;
      if (barCanvas) {
        new Chart(barCanvas, {
          type: 'bar',
          data: {
            labels: [
              'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
              'Jul', 'Avgust', 'Sepetmbar', 'Oktobar', 'Novembar', 'Decembar'
            ],
            datasets: [{
              label: 'Broj rezervacija po mesecima',
              data: meseciData,
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales:{
              y:{
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      }

      // --- Pie chart ---
      const pieCanvas = document.getElementById(`pieChart-${v.idV}`) as HTMLCanvasElement;
      if (pieCanvas) {
        new Chart(pieCanvas, {
          type: 'pie',
          data: {
            labels: ['Vikend', 'Radni dani'],
            datasets: [{
              data: vikendiData,
            }]
          }
        });
      }
    }
  }

  meseci(v: Vikendica): number[]{
    let m = [0,0,0,0,0,0,0,0,0,0,0,0]
    for(let r of v.rezervacije){
      m[new Date(r.datumPocetka).getMonth()] += 1
    }
    return m
  }

  vikendi(v: Vikendica): number[]{
    let m = [0,0]
    for(let r of v.rezervacije){
      let poc = new Date(r.datumPocetka)
      let kraj = new Date(r.datumKraja)
      while(poc.getTime()<kraj.getTime()){
        if(poc.getDay() == 0 || poc.getDay() == 6){
          m[0]++
        } else {
          m[1]++
        }
        poc.setDate(poc.getDate()+1)
      }

    }
    return m
  }


}


