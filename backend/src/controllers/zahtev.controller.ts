import express from 'express'
import ZahtevM from '../models/zahtev'
import bcrypt from 'bcrypt';

export class ZahtevController{

    dodajZahtev = async (req: express.Request, res: express.Response)=>{
        let korIme = req.body.korIme;
        let lozinka = req.body.lozinka;  
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let tip = req.body.tip;
        let pol = req.body.pol;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let mejl = req.body.mejl;
        let brojKredinteKartice = req.body.brojKredinteKartice;
        let slika = req.file ? req.file.filename : 'icon.png';

        const hashed = await bcrypt.hash(lozinka, 10);

        let zahtev = {
            korIme: korIme,
            lozinka: hashed,
            ime: ime,
            prezime: prezime,
            tip: tip,
            pol: pol,
            adresa: adresa,
            telefon: telefon,
            mejl: mejl,
            brojKredinteKartice: brojKredinteKartice,
            slika: slika,
            odbijeno: false
        }

        new ZahtevM(zahtev).save().then(ok=>{
            res.json({message: "Uspesno dodat zahtev"})
        }).catch(err=>{
            console.log(err)
            res.json({message: "Neuspesno dodavanje zahteva"})
        })
    }


    obrisiZahtev = (req: express.Request, res: express.Response)=>{
        ZahtevM.deleteOne({korIme: req.body.korIme}).then(zahtev=>{
            res.json({message: "Zahtev obrisan"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greska"})
        })
    }

    odbiZahtev = (req: express.Request, res: express.Response)=>{      
            ZahtevM.updateOne({korIme: req.body.korIme},
                {odbijeno: true }).then(u=>{
                res.json({message: "Promeljeno je"})
            }).catch((err)=>{
                console.log(err)
                res.json({message: "Nije promeljeno"})
            })
        }

    getZahteve = (req: express.Request, res: express.Response)=>{
        ZahtevM.find({}).then(z=>{
            res.json(z)
        }).catch((err)=>{
            console.log(err)
        })
    }

}