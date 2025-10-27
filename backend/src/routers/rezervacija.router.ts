import express from 'express'
import { RezervacijaController } from '../controllers/rezervacija.controller';

const rezervacijaRouter = express.Router()

rezervacijaRouter.route('/getRezervacije').get(
    (req, res)=>new RezervacijaController().getRezervacije(req, res)
)

rezervacijaRouter.route('/dodajRezervaciju').post(
    (req, res)=>new RezervacijaController().dodajRezervaciju(req, res)
)

rezervacijaRouter.route("/getRezervacijeTuriste/:user").get(
    (req,res)=>new RezervacijaController().getRezervacijeTuriste(req,res)
)

rezervacijaRouter.route("/getRezervacijeVikendice/:idV").get(
    (req,res)=>new RezervacijaController().getRezervacijeVikendice(req,res)
)

rezervacijaRouter.route('/promeniRezervaciju').post(
    (req, res)=>new RezervacijaController().promeniRezervaciju(req, res)
)

rezervacijaRouter.route('/promenaRezervacijeVlasnik').post(
    (req, res)=>new RezervacijaController().promenaRezervacijeVlasnik(req, res)
)

rezervacijaRouter.route('/obrisiRezervaciju').post(
    (req, res)=>new RezervacijaController().obrisiRezervaciju(req, res)
)

export default rezervacijaRouter;