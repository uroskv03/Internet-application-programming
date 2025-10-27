import { Koordinate } from "./koordinate"
import { Rezervacija } from "./rezervacija"

export class Vikendica{
    idV = 0
    naziv = ""
    mesto = ""
    galerija: Array<string> = []
    usluge = ""
    cenovnik = [0,0]
    telefon = ""
    komentari: Array<String> = []
    ocene: Array<number> = []
    koordinate = new Koordinate()
    koordinate1 = new Koordinate()
    ocena = 0
    vlasnik = ""
    Nnaziv = ""
    Nmesto = ""
    Ntelefon = ""
    cenovnik1 = [0,0]
    usluge1 = ""
    blokirana = ""
    rezervacije: Array<Rezervacija> = []
}