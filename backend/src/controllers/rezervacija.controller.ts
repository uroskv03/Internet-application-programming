import express from 'express'
import RezervacijaM from '../models/rezervacija'

export class RezervacijaController{
    getRezervacije = (req: express.Request, res: express.Response)=>{
        RezervacijaM.find({}).then(z=>{
            res.json(z)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajRezervaciju = (req: express.Request, res: express.Response)=>{
        RezervacijaM.findOne({}, {}, { sort: { 'idR': -1 } }).then(maxRezervacija => {
            let noviIdR = maxRezervacija ? maxRezervacija.idR! + 1 : 1;
            let rezervacija = {
                idR: noviIdR,
                datumKreiranja: req.body.datumKreiranja,
                datumPocetka: req.body.datumPocetka,
                datumKraja: req.body.datumKraja,
                idV: req.body.idV,
                komentar: req.body.komentar,
                ocena: req.body.ocena,
                turista: req.body.turista,
                status: req.body.status,
                komentarVlasnika: "",
                cena: req.body.cena,
                komentarPre: req.body.komentarPre,
            }
    
            new RezervacijaM(rezervacija).save().then(ok=>{
                res.json({message: "Rezervacija je dodata"})
            }).catch(err=>{
                console.log(err)
                res.json({message: "Neuspesno dodavanje rezervacije"})
            })
        })
    }

    getRezervacijeTuriste = (req: express.Request, res: express.Response)=>{
        RezervacijaM.find({turista: req.params.user}).sort({datumPocetka: -1}).then(z=>{
            res.json(z)
        }).catch((err)=>{
            console.log(err)
        })
    }

    getRezervacijeVikendice = (req: express.Request, res: express.Response)=>{
        RezervacijaM.find({idV: req.params.idV}).then(z=>{
            res.json(z)
        }).catch((err)=>{
            console.log(err)
        })
    }

    promeniRezervaciju = (req:express.Request, res:express.Response) => {

        RezervacijaM.updateOne({idR: req.body.idR}, {ocena: req.body.ocena,komentar: req.body.komentar }).then(ok=>{
            res.json({message: "Rezervacija promenjena"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspesna promena"})
        })
    }

    promenaRezervacijeVlasnik = (req:express.Request, res:express.Response) => {
        RezervacijaM.updateOne({idR: req.body.idR}, {status: req.body.status,komentarVlasnika: req.body.komentarVlasnika }).then(ok=>{
            res.json({message: "Rezervacija promenjena"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspesna promena"})
        })
    }

    obrisiRezervaciju = (req: express.Request, res: express.Response)=>{
        RezervacijaM.deleteOne({idR: req.body.idR}).then(v=>{
            res.json({message: "Rezervacija obrisana"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Greska"})
        })
    }

}