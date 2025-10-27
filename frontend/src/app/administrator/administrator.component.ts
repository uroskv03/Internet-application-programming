import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../models/user';
import { ZahtevService } from '../services/zahtev.service';
import { UserService } from '../services/user.service';
import { Vikendica } from '../models/vikendica';
import { VikendiceService } from '../services/vikendice.service';

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent implements OnInit {
  zahtevi: User[] = []
  private zahtevService = inject(ZahtevService)
  private userService = inject(UserService)
  private vikendicaService = inject(VikendiceService)
  vlasnici: User[] = []
  turisti: User[] = []
  private router = inject(Router)
  sveVikendice: Vikendica[] = []

  ngOnInit(): void {
    this.zahtevService.getZahteve().subscribe(data=>{
      this.zahtevi = data
    })

    this.userService.getTuriste().subscribe(data=>{
      this.turisti = data
    })

    this.userService.getVlasnike().subscribe(data=>{
      this.vlasnici = data
    })
    
    this.vikendicaService.getVikendice().subscribe(data=>{
      this.sveVikendice = data
    })
  }

  odbi(z: User){
    this.zahtevService.odbiZahtev(z).subscribe(data=>{
      this.ngOnInit()
    })
  }
  
  prihvati(u: User){
    this.userService.register(u).subscribe(data=>{
      this.zahtevService.obrisiZahtev(u.korIme).subscribe(data=>{
      this.ngOnInit()
    })
    })
  }

  izmeni(u: User){
    localStorage.setItem("azuriraj",u.korIme)
    this.router.navigate(["Azuriranje"])
  }

  aktiviraj(u: User){
    this.userService.aktiviraj(u).subscribe(data=>{
      this.ngOnInit()
    })
  }

  deaktiviraj(u: User){
    this.userService.deaktiviraj(u).subscribe(data=>{
      this.ngOnInit()
    })
  }

  odjava(){
    localStorage.removeItem("loggedUser")
    this.router.navigate(["adminLogin"])
  }

  blokiraj(v:Vikendica){
    let datum = new Date()
    datum.setHours(datum.getHours()+48)
    let d = datum.toISOString() 
    v.blokirana = d
    this.vikendicaService.blokiraj(v).subscribe(data=>{
      this.ngOnInit()
      alert(data.message)
    })
  }
}
