import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Vikendica } from '../models/vikendica';
import { VikendiceService } from '../services/vikendice.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacija';
import { MapaComponent } from '../mapa/mapa.component';
import { Koordinate } from '../models/koordinate';

@Component({
  selector: 'app-vikendica',
  standalone: true,
  imports: [FormsModule,RouterOutlet,RouterModule, MatStepperModule, ReactiveFormsModule, MapaComponent,MatInputModule,
    MatStepperModule, MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,CommonModule
  ],
  templateUrl: './vikendica.component.html',
  styleUrl: './vikendica.component.css'
})
export class VikendicaComponent implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  vikendica: Vikendica = new Vikendica()
  private vikendiceService = inject(VikendiceService)
  private userService = inject(UserService)
  private rezervacijeService = inject(RezervacijeService)
  sveRezervacijeVikendice: Rezervacija[] = []
  rezervacija: Rezervacija = new Rezervacija()
  private formBuilder = inject(FormBuilder)
  datumPocetka = new Date()
  datumKraja = new Date()
  danas = new Date()
  cena: number = 0
  user: User = new User()
  
  nazad(){
    this.router.navigate(["/turista/vikendice"])
  }

  ngOnInit(): void {
    this.danas = new Date()
    let x = 0
    let id = this.route.snapshot.paramMap.get('id');
    if(id)
    this.vikendiceService.getVikendica(JSON.parse(id)).subscribe(data=>{
      if(data.body)
      this.vikendica = data.body
    })
    let u = localStorage.getItem("loggedUser")
    if(u)
      this.userService.getUser(u).subscribe(data=>{
        if(data.body)
          this.user = data.body
              this.druga.patchValue({
                brojKredinteKartice: this.user.brojKredinteKartice.toString(), 
      });
      })
      if(id)
    this.rezervacijeService.getRezervacijeVikendice(JSON.parse(id)).subscribe(data=>{
      if(data.body)
      this.sveRezervacijeVikendice = data.body
    })
  }

    prva = this.formBuilder.group({
    datumPocetka: ['', Validators.required],
    datumKraja: ['', Validators.required],
    odrasli: [1, [Validators.required, Validators.min(1)]],
    deca: [0, [Validators.min(0)]]
  });

  druga = this.formBuilder.group({
    brojKredinteKartice: [this.user.brojKredinteKartice.toString(),[Validators.required]],
    komentar: ['',Validators.maxLength(500)]
  });

  proveraPrva(stepper: MatStepper){
    if(!this.prva.valid){
      alert("Unesi sve podatke")
      return;
    }
    const poc = this.prva.value.datumPocetka
    const kraj = this.prva.value.datumKraja

    if(!poc || !kraj){
      alert("Nedostaje datum")
      return
    }
    this.datumPocetka = new Date(poc)
    this.datumKraja = new Date(kraj)

    if(this.datumPocetka>=this.datumKraja){
      alert("Kraj ne sme biti pre početka")
      return
    }
    if(this.datumPocetka.getHours() < 14){
      alert("Ulazak je moguć tek od 14 časova")
      return
    }

    if(this.datumKraja.getHours() > 10){
      alert("Izlazak je moguć do 10 časova")
      return
    }

    if(this.danas > this.datumPocetka){
      alert("Datum početka mora biti u budućnosti")
      return
    } 

    for(let r of this.sveRezervacijeVikendice){
      if(r.status == "Odobrena" && (new Date(r.datumPocetka).getTime() < this.datumKraja.getTime()) &&
      (new Date(r.datumKraja).getTime() > this.datumPocetka.getTime())){
        alert("Zauzeto je tad")
        return
      }
    }
    if(this.vikendica.blokirana != "" && new Date(this.vikendica.blokirana).getTime() > this.danas.getTime()){
      alert("Vikendica je blokirana za rezervacije")
      return
    }
    let datum2 = new Date(this.datumKraja)
    let datum1 = new Date(this.datumPocetka)
    const odrasli =this.prva.value.odrasli
    const deca =this.prva.value.deca 
    let brOsoba = 0
    if(deca) brOsoba += deca
    if(odrasli) brOsoba += odrasli
    this.cena = 0
    while(datum1 < datum2){
      const letnjiMeseci = [4, 5, 6, 7];
      if(letnjiMeseci.includes(datum1.getMonth())){
        this.cena += Number(this.vikendica.cenovnik[0])
      } else {
        this.cena += Number(this.vikendica.cenovnik[1])
      }
      datum1.setDate(datum1.getDate()+1)
    }
    //this.cena = brOsoba*this.cena
    stepper.next()
  }

  proveraDruga(stepper: MatStepper){
    const DinersPrefiks =['300', '301', '302', '303', '36', '38']
    const MasterPrefiks =['51', '52', '53', '54', '55']
    const VisaPrefiks = ['4539', '4556', '4916', '4532', '4929', '4485', '4716']
    let brKarticeStr = this.druga.value.brojKredinteKartice!.toString()
    if(brKarticeStr.length == 15 && DinersPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks)) ||
    brKarticeStr.length == 16 && MasterPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks)) ||
    brKarticeStr.length == 16 && VisaPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))
    ){
    }else{
      alert("Los format kartice")
      return
    }

    if(this.druga.value.komentar!.length > 500){
      alert("Predug komentar")
      return
    }
  else {
      this.rezervacija.datumKraja = this.datumKraja.toLocaleString()
      this.rezervacija.datumPocetka = this.datumPocetka.toLocaleString()
      this.rezervacija.status = "Na cekanju"
      this.rezervacija.turista = this.user.korIme
      this.rezervacija.idV = this.vikendica.idV
      this.rezervacija.komentarPre = this.druga.value.komentar!.toString()
      this.rezervacija.datumKreiranja = new Date().toISOString()
      this.rezervacija.cena = this.cena
      this.rezervacija.komentar = ""
      this.rezervacijeService.dodajRezervaciju(this.rezervacija).subscribe(data=>{
        //stepper.next()
        alert(data.message)
        this.nazad()
      })
    }
  }
}
