import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-azuriraj',
  standalone: true,
  imports: [FormsModule,RouterOutlet],
  templateUrl: './azuriraj.component.html',
  styleUrl: './azuriraj.component.css'
})
export class AzurirajComponent implements OnInit{
  user: User = new User()
  userNov: User = new User()
  private userSerivce = inject(UserService)
  private router = inject(Router)
  ngOnInit(): void {
    let u = localStorage.getItem("azuriraj")
    if(u){
      this.userSerivce.getUser(u).subscribe(data=>{
        if(data.body)
          this.user = data.body
        this.userNov.adresa = this.user.adresa
        this.userNov.korIme = this.user.korIme
        this.userNov.lozinka = this.user.lozinka
        this.userNov.ime = this.user.ime
        this.userNov.prezime = this.user.prezime 
        this.userNov.telefon = this.user.telefon
        this.userNov.mejl = this.user.mejl
        this.userNov.slika = this.user.slika
        this.userNov.brojKredinteKartice = this.user.brojKredinteKartice
      })
    }
  }

  message = ""
  kartica = ""

    promenaKaritce(){
    const DinersPrefiks =['300', '301', '302', '303', '36', '38']
    const MasterPrefiks =['51', '52', '53', '54', '55']
    const VisaPrefiks = ['4539', '4556', '4916', '4532', '4929', '4485', '4716']
    let brKarticeStr = this.user.brojKredinteKartice.toString()
    if(brKarticeStr.length == 15 && DinersPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))){
      this.kartica = "diners"
    } else if (brKarticeStr.length == 16 && MasterPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))){
      this.kartica= "master"
    }  else if(brKarticeStr.length == 16 && VisaPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))){
      this.kartica = "visa"
    } else {
      this.kartica = ""
    }
  }

  validirajSliku(event: any){
    const file = event.target.files[0]
    if(!file) return
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      this.message = 'Neodgovarajuca format slike'
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width < 100 || img.height < 100 || img.width > 300 || img.height > 300) {
        this.message = 'Neodgovarajuca velicina slike'
        return
      } else {
        this.message = ''
        this.userNov.slika = file;
      }
    };
  img.src = URL.createObjectURL(file);
  }

  promeni(){
    const DinersPrefiks =['300', '301', '302', '303', '36', '38']
    const MasterPrefiks =['51', '52', '53', '54', '55']
    const VisaPrefiks = ['4539', '4556', '4916', '4532', '4929', '4485', '4716']
    let brKarticeStr = this.userNov.brojKredinteKartice.toString()
    if((brKarticeStr.length == 15 && DinersPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))) ||
    (brKarticeStr.length == 16 && MasterPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))) ||
    (brKarticeStr.length == 16 && VisaPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))) ||
    (this.user.brojKredinteKartice == this.userNov.brojKredinteKartice)){
      this.userSerivce.promeni(this.userNov).subscribe(data=>{
        this.odustani()
      })
    } else {
      alert("Neispravan format kartice")
    }
  }
  odustani(){
    localStorage.removeItem("azuriraj")
    this.router.navigate(["administrator"])
  }

}
