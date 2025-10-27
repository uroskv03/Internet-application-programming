import express from 'express'
import { VikendicaController } from '../controllers/vikendica.controller';

const vikendicaRouter = express.Router()

import multer from 'multer' 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage });

vikendicaRouter.route('/getVikendice').get(
    (req, res)=>new VikendicaController().getVikendice(req, res)
)

vikendicaRouter.route("/getVikendica/:idV").get(
    (req,res)=>new VikendicaController().getVikendica(req,res)
)

vikendicaRouter.route("/getVikendiceVlasnika/:vlasnik").get(
    (req,res)=>new VikendicaController().getVikendiceVlasnika(req,res)
)

vikendicaRouter.route('/dodajOcenuVikendici').post(
    (req, res)=>new VikendicaController().dodajOcenuVikendici(req, res)
)

vikendicaRouter.route('/dodajKomentarVikendici').post(
    (req, res)=>new VikendicaController().dodajKomentarVikendici(req, res)
)

vikendicaRouter.route('/obrisiVikendicu').post(
    (req, res)=>new VikendicaController().obrisiVikendicu(req, res)
)

vikendicaRouter.route('/dodajVikendicu').post(
    upload.array('slike'),
    (req, res)=>new VikendicaController().dodajVikendicu(req, res)
)

vikendicaRouter.route('/promeniVikendicu').post(
    (req, res)=>new VikendicaController().promeniVikendicu(req, res)
)

vikendicaRouter.route('/dodajSliku').post(
    upload.single('slika'),
    (req, res)=>new VikendicaController().dodajSliku(req, res)
)

vikendicaRouter.route('/ukloniSliku').post(
    (req, res)=>new VikendicaController().ukloniSliku(req, res)
)

vikendicaRouter.route('/blokiraj').post(
    (req, res)=>new VikendicaController().blokiraj(req, res)
)

export default vikendicaRouter;