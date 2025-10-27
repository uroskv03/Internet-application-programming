import express from 'express'
import UserM from '../models/user'
import bcrypt from 'bcrypt';

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let u = req.body.korIme;
        let p = req.body.lozinka;
        UserM.findOne({korIme: u, tip:{$ne: "administrator"}}).then(async (user)=>{
            if(user && user.lozinka){
                if(await bcrypt.compare(p, user.lozinka)){
                    res.json(user)
                } else {
                    res.json(null)
                }
            } else {
                res.json(null)
            }

        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    postjiKornsik = (req: express.Request, res: express.Response)=>{
        let u = req.body.korIme;
        let p = req.body.lozinka;

        UserM.findOne({korIme: u}).then(async (user)=>{
            if(user && user.lozinka){
                if(await bcrypt.compare(p, user.lozinka)){
                    res.json(user)
                } else {
                    res.json(null)
                }
            } else {
                res.json(null)
            }
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    loginAdmin = (req: express.Request, res: express.Response)=>{
        let u = req.body.korIme;
        let p = req.body.lozinka;

        UserM.findOne({korIme: u, tip: "administrator"}).then(async (user)=>{
            if(user && user.lozinka){
                if(await bcrypt.compare(p, user.lozinka)){
                    res.json(user)
                } else {
                    res.json(null)
                }
            } else {
                res.json(null)
            }
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
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
        let slika = req.body.slika

        let user = {
            korIme: korIme,
            lozinka: lozinka,
            ime: ime,
            prezime: prezime,
            tip: tip,
            pol: pol,
            adresa: adresa,
            telefon: telefon,
            mejl: mejl,
            brojKredinteKartice: brojKredinteKartice,
            slika: slika,
            aktivan: true
        }

        new UserM(user).save().then(ok=>{
            res.json({message: "Uspesno registrovanje"})
        }).catch(err=>{
            console.log(err)
            res.json({message: "Neuspesno registrovanje"})
        })
    }

    getUser = (req: express.Request, res: express.Response)=>{
        let korIme = req.params.user
        UserM.findOne({korIme: korIme}).then(user=>{
                res.json(user).status(200)
        }).catch(err=>{
                res.json({message: "Greska"}).status(400)
        })
    }

    promeniLozinku = async (req: express.Request, res: express.Response)=>{
        let lozinka = req.body.lozinka
        const hashed = await bcrypt.hash(lozinka, 10);
        UserM.updateOne({korIme: req.body.korIme}, 
            {lozinka: hashed}).then(u=>{
            res.json({message: "Lozinka promeljena"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Lozinka nije promeljena"})
        })
    }

    promeni = (req: express.Request, res: express.Response)=>{
        let slika = req.file ? req.file.filename : req.body.slika;
        UserM.updateOne({korIme: req.body.korIme},
            {ime: req.body.ime,prezime: req.body.prezime,adresa:req.body.adresa, 
                telefon: req.body.telefon,mejl: req.body.mejl,brojKredinteKartice:req.body.brojKredinteKartice,
                slika:slika
            }).then(u=>{
            res.json({message: "Promeljeno je"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Nije promeljeno"})
        })
    }

    getVlasnike = (req: express.Request, res: express.Response)=>{
            UserM.find({tip:"vlasnik"}).then(user=>{
                res.json(user)
            }).catch((err)=>{
                console.log(err)
            })
        }

    getTuriste = (req: express.Request, res: express.Response)=>{
            UserM.find({tip:"turista"}).then(user=>{
                res.json(user)
            }).catch((err)=>{
                console.log(err)
            })    
    }

    aktiviraj = (req: express.Request, res: express.Response)=>{      
        UserM.updateOne({korIme: req.body.korIme},
            {aktivan: true }).then(u=>{
            res.json({message: "Promeljeno je"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Nije promeljeno"})
        })
    }

    deaktiviraj = (req: express.Request, res: express.Response)=>{      
        UserM.updateOne({korIme: req.body.korIme},
            {aktivan: false }).then(u=>{
            res.json({message: "Promeljeno je"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Nije promeljeno"})
        })
    }
}