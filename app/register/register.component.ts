import { Component, inject, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
    this.userService.getTuriste().subscribe(data=>{
      this.turisti = data
    })
    this.userService.getVlasnike().subscribe(data=>{
      this.vlasnici = data
    })

    this.zahtevService.getZahteve().subscribe(data=>{
      this.zahtevi = data
    })
  }
  vlasnici: User[] = []
  turisti: User[] = []
  zahtevi: User[] = []
  private userService = inject(UserService)  
  private zahtevService = inject(ZahtevService)
  user: User = new User()
  message = ""
  kartica = ""
  msg = ""
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  private router = inject(Router)

  promenaKaritce(){
    const DinersPrefiks =['300', '301', '302', '303', '36', '38']
    const MasterPrefiks =['51', '52', '53', '54', '55']
    const VisaPrefiks = ['4539', '4556', '4916', '4532', '4929', '4485', '4716']
    let brKarticeStr = "0"
    if(this.user.brojKredinteKartice){
      brKarticeStr = this.user.brojKredinteKartice.toString()
    }
    if(brKarticeStr.length == 15 && DinersPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))){
      this.kartica = "diners"
    } else if (brKarticeStr.length == 16 && MasterPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))){
      this.kartica= "master"
    }  else if(brKarticeStr.length == 16 && VisaPrefiks.some(prefiks => brKarticeStr.startsWith(prefiks))){
      this.kartica = "visa"
    } else {
      this.kartica = ""
    }

    /*const karticaRegex = /^(30[0-3]\d{12}|(36|38)\d{13})$/
    if(karticaRegex.test(this.user.brojKredinteKartice.toString())){
      alert("Diners")
    }*/
  }
  register(){
    if(this.user.korIme == "" || this.user.lozinka == "" || this.user.ime == "" 
      || this.user.prezime == "" || this.user.pol == "" || this.user.adresa == "" 
      || this.user.telefon == ""   || this.user.mejl == "" || 
      this.user.brojKredinteKartice == 0 || this.user.tip == ""
    ) {
      this.message = "Unesi sve podatke"
      return
    } else if (this.zahtevi.some(z=> z.korIme == this.user.korIme) || this.vlasnici.some(v=> v.korIme == this.user.korIme) 
      || this.turisti.some(t=> t.korIme == this.user.korIme) ){
        this.message = "Već postoji nalog sa unetim korisničkim imenom"
        return
    } else if(this.zahtevi.some(z=> z.mejl == this.user.mejl) || this.vlasnici.some(v=> v.mejl == this.user.mejl) 
      || this.turisti.some(t=> t.mejl == this.user.mejl)){
        this.message = "Već postoji nalog sa unetom mejl adresom."
        return        
    }

    const passwordRegex = /(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[0-9])(?=.*[^A-Za-z0-9])^[A-Za-z].{5,9}$/
    if(!passwordRegex.test(this.user.lozinka)){
      this.message = "Neispravan format lozinke"
      return
    } 

    if(this,this.kartica == ""){
      this.message = "Los format kartice"
      return
   }

    this.zahtevService.dodajZahtev(this.user).subscribe(data=>{
      this.message = data.message
      this.router.navigate([""])
    })
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
      this.user.slika = file;
      /*const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);*/
    }
  };
  img.src = URL.createObjectURL(file);
  }
}
