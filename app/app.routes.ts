import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { TuristaComponent } from './turista/turista.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PromeniLoznikuComponent } from './promeni-lozniku/promeni-lozniku.component';
import { ProfilTuristeComponent } from './profil-turiste/profil-turiste.component';
import { VikendicaTuristeComponent } from './vikendica-turiste/vikendica-turiste.component';
import { RezervacijeTuristeComponent } from './rezervacije-turiste/rezervacije-turiste.component';
import { VikendicaComponent } from './vikendica/vikendica.component';
import { OceniRezervacijuComponent } from './oceni-rezervaciju/oceni-rezervaciju.component';
import { ProfilVlasnikaComponent } from './profil-vlasnika/profil-vlasnika.component';
import { VikendicaVlasnikaComponent } from './vikendica-vlasnika/vikendica-vlasnika.component';
import { RezervacijeVlasnikaComponent } from './rezervacije-vlasnika/rezervacije-vlasnika.component';
import { StatistikaVlasnikaComponent } from './statistika-vlasnika/statistika-vlasnika.component';
import { AzurirajComponent } from './azuriraj/azuriraj.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "adminLogin", component: AdminLoginComponent},
    {path: "vlasnik", component: VlasnikComponent, 
        children:[
            {path: 'profil', component:ProfilVlasnikaComponent},
            {path: "vikendice", component: VikendicaVlasnikaComponent},
            {path: "rezervacije", component: RezervacijeVlasnikaComponent},
            {path: "statistika", component: StatistikaVlasnikaComponent}
        ]
    },
    {path: "turista", component: TuristaComponent,
        children:[
            {path: 'profil', component:ProfilTuristeComponent},
            {path: "vikendice", component: VikendicaTuristeComponent},
            {path: "rezervacije", component: RezervacijeTuristeComponent}
        ]
    },
    {path: "administrator", component: AdministratorComponent},
    {path: "promeniLozinku", component: PromeniLoznikuComponent},
    {path: "vikendica/:id", component: VikendicaComponent},
    {path: "oceniRezervaciju", component: OceniRezervacijuComponent},
    {path: "Azuriranje", component: AzurirajComponent}
];
