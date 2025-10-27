import express from 'express'
import VikendicaM from '../models/vikendica'

export class VikendicaController{

    getVikendice = (req: express.Request, res: express.Response)=>{
        VikendicaM.find({}).then(z=>{
            res.json(z)
        }).catch((err)=>{
            console.log(err)
        })
    }

    getVikendica = (req: express.Request, res: express.Response)=>{
        let idV = req.params.idV
        VikendicaM.findOne({idV: idV }).then(v=>{
                res.json(v).status(200)
        }).catch(err=>{
                res.json({message: "Greska"}).status(400)
        })
    }
    
    dodajOcenuVikendici = (req:express.Request, res:express.Response) => {
        VikendicaM.updateOne({idV: req.body.idV},{$push:{ocene:req.body.ocena}}).then(ok => {
        res.json({message: "Dodata ocena"})
    }).catch((err) => {
        console.log(err)
        res.json({message: "Neuspesno dodavanje ocene"})
    })
    }

    dodajKomentarVikendici = (req:express.Request, res:express.Response) => {
        VikendicaM.updateOne({idV: req.body.idV},{$push:{komentari:req.body.komentar}}).then(ok => {
        res.json({message: "Dodat komentar"})
    }).catch((err) => {
        console.log(err)
        res.json({message: "Neuspesno dodavanje komentara"})
    })
    }

    getVikendiceVlasnika = (req: express.Request, res: express.Response)=>{
        VikendicaM.find({vlasnik: req.params.vlasnik}).then(v=>{
            res.json(v)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajVikendicu = (req: express.Request, res: express.Response)=>{
        let imenaSlika: String[] = []; 
        const uploadedFiles = req.files as Express.Multer.File[];
        if (req.files && uploadedFiles.length > 0) {
            imenaSlika = uploadedFiles.map(file => {
                return file.filename; 
            });
        } 
        VikendicaM.findOne({}, {}, { sort: { 'idV': -1 } }).then(maxRezervacija => {
        let noviIdV = maxRezervacija ? maxRezervacija.idV! + 1 : 1;
            let k = {lat:req.body.koordinate[0],lng:req.body.koordinate[1]}
            let vikendica = {
                idV: noviIdV,
                naziv: req.body.naziv,
                mesto: req.body.mesto,
                galerija: imenaSlika,
                usluge: req.body.usluge,
                cenovnik: req.body.cenovnik,
                telefon: req.body.telefon,
                komentari: [], 
                ocene: [], 
                vlasnik: req.body.vlasnik,
                koordinate: k 
            }
            new VikendicaM(vikendica).save().then(ok=>{
                res.json({message: "Vikendica dodata"})
            }).catch(err=>{
                console.log(err)
                res.json({message: "Neuspesno dodavanje vikendice"})
            })
        })
        }

    promeniVikendicu = (req:express.Request, res:express.Response) => {
        let cenovnik = req.body.cenovnik
            VikendicaM.updateOne({idV: req.body.idV}, {naziv: req.body.naziv,mesto: req.body.mesto,usluge:req.body.usluge, 
                cenovnik: cenovnik,telefon: req.body.telefon, koordinate: req.body.koordinate}).then(ok => {
            res.json({message: "Promenjene informacije za vikendicu"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspesna promena"})
        })
    }

    blokiraj = (req:express.Request, res:express.Response) => {
            VikendicaM.updateOne({idV: req.body.idV}, {blokirana:req.body.blokirana}).then(ok => {
            res.json({message: "Vikendica je blokirana"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspesna blokada"})
        })
    }

    dodajSliku = (req:express.Request, res:express.Response) => {
        let slika
        if(req.file){
            slika = req.file.filename;
        } else{
            console.log("Greska")
            return
        }
        VikendicaM.updateOne({idV: req.body.idV},{$push:{galerija:slika}}).then(ok => {
            res.json({message: "Dodata slika"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspesno dodavanje slike"})
        })
    }

    ukloniSliku = (req:express.Request, res:express.Response) => {
            VikendicaM.updateOne({idV: req.body.idV},{$pull:{galerija:req.body.slika}}).then(ok => {
            res.json({message: "Dodata slika"})
        }).catch((err) => {
            console.log(err)
            res.json({message: "Neuspesno dodavanje slike"})
        })
    }

    obrisiVikendicu = (req: express.Request, res: express.Response)=>{
            VikendicaM.deleteOne({idV: req.body.idV}).then(v=>{
                res.json({message: "Vikendica obrisana"})
            }).catch((err)=>{
                console.log(err)
                res.json({message: "Greska"})
            })
        }
}