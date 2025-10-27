import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { VikendiceService } from '../services/vikendice.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Vikendica } from '../models/vikendica';
import { Koordinate } from '../models/koordinate';

@Component({
  selector: 'app-vikendica-vlasnika',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './vikendica-vlasnika.component.html',
  styleUrl: './vikendica-vlasnika.component.css'
})
export class VikendicaVlasnikaComponent implements OnInit {

  private vikendiceService = inject(VikendiceService)
  private userService = inject(UserService)
  user: User = new User()
  vikendice: Vikendica[] = []
  slika = ""
  novaVikendica: Vikendica = new Vikendica()
  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    this.novaVikendica = new Vikendica()
    if(u)
      this.userService.getUser(u).subscribe(data=>{
        this.user = data.body!
        this.vikendiceService.getVikendiceVlasnika(this.user.korIme).subscribe(data=>{
          if(data.body){
          this.vikendice = data.body
          for(let v of this.vikendice){
            v.cenovnik1 = [0,0]
            v.koordinate1 = new Koordinate()
          }
          }
          
        })
      })
  }

  validirajSliku(event: any){
    const file = event.target.files[0]
    if(!file) return
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      alert('Neodgovarajuca format slike')
      return;
    }

    const img = new Image();
  img.onload = () => {

    this.slika = file;
    
  };
  img.src = URL.createObjectURL(file);
  }

  validirajSliku1(event: any){
    const file = event.target.files[0]
    if(!file) return
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      alert('Neodgovarajuca format slike')
      return;
    }

    const img = new Image();
    img.onload = () => {
    this.novaVikendica.galerija.push(file) 
    
  };
  img.src = URL.createObjectURL(file);
  }

  json(event: any) {
    
    const file = event.target.files[0];

    if (!file) return
        const reader = new FileReader();
        reader.onload = (e: any) => {
            try {
                const data = JSON.parse(e.target.result)
                this.novaVikendica.naziv = data.naziv || ''
                this.novaVikendica.mesto = data.mesto || ''
                this.novaVikendica.usluge = data.usluge || ''
                this.novaVikendica.telefon = data.telefon || ''
                this.novaVikendica.cenovnik = data.cenovnik || [0,0]
                this.novaVikendica.koordinate = data.koordinate || { lat: 0, lng: 0 }
            } catch (error) {
                alert('Greška pri parsiranju JSON fajla. Proverite format.');
                console.error('JSON Error:', error);
            }
        };  
        reader.readAsText(file);
}

  obrisi(v: Vikendica){
    this.vikendiceService.obrisiVikendicu(v.idV).subscribe(data=>{
      this.ngOnInit()
    })
  }

  ukloni(v: Vikendica, s: String){
    this.vikendiceService.ukloniSliku(v.idV, s).subscribe(data=>{
      this.ngOnInit()
    })
  }

  promeni(v: Vikendica){
    if(v.Nnaziv) v.naziv = v.Nnaziv
    if(v.Nmesto) v.mesto = v.Nmesto
    if(v.Ntelefon) v.telefon = v.Ntelefon
    if(v.cenovnik1[0] > 0) v.cenovnik[0] = v.cenovnik1[0] 
    if(v.cenovnik1[1] > 0) v.cenovnik[1] = v.cenovnik1[1] 
    if(v.usluge1) v.usluge = v.usluge1
    if(v.koordinate1.lat && v.koordinate1.lng){
      v.koordinate.lat = v.koordinate1.lat
      v.koordinate.lng = v.koordinate1.lng
    }
    this.vikendiceService.promeniVikendicu(v).subscribe(data=>{
      this.ngOnInit()
    })
  }

  dodajSliku(v: Vikendica){
    console.log(this.slika)
    if(this.slika){
      this.vikendiceService.dodajSliku(v.idV, this.slika).subscribe(data=>{
        this.ngOnInit()
      })
    } else {
      alert("Izaberi neku sliku")
    }
  }

  napraviVikendicu(){
    this.novaVikendica.vlasnik = this.user.korIme
    if(this.novaVikendica.naziv && this.novaVikendica.mesto  && this.novaVikendica.usluge
       && this.novaVikendica.telefon && this.novaVikendica.cenovnik[0] > 0 && this.novaVikendica.cenovnik[1] > 0 && 
       this.novaVikendica.koordinate && this.novaVikendica.koordinate.lat && this.novaVikendica.koordinate.lng //mozda ne mora za lat i lng
    ){
    this.vikendiceService.dodajVikendicu(this.novaVikendica).subscribe(data=>{
      this.ngOnInit()
    })
    } else {
      alert("Unesi sve podatke, cena mora biti veca od 0")
    }
  }

}
