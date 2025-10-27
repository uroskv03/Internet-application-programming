import express from 'express'
import { ZahtevController } from '../controllers/zahtev.controller';
const zahtevRouter = express.Router()
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

zahtevRouter.route('/dodajZahtev').post(
    upload.single('slika'),
    (req, res)=>new ZahtevController().dodajZahtev(req, res)
)

zahtevRouter.route('/obrisiZahtev').post(
    (req, res)=>new ZahtevController().obrisiZahtev(req, res)
)

zahtevRouter.route('/getZahteve').get(
    (req, res)=>new ZahtevController().getZahteve(req, res)
)

zahtevRouter.route('/odbiZahtev').post(
    (req, res)=>new ZahtevController().odbiZahtev(req, res)
)

export default zahtevRouter;
