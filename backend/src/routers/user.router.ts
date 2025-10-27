import express from 'express'
import { UserController } from '../controllers/user.controller';
import multer from 'multer';

const userRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage });

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/postjiKornsik').post(
    (req, res)=>new UserController().postjiKornsik(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route("/getUser/:user").get(
    (req,res)=>new UserController().getUser(req,res)
)

userRouter.route('/loginAdmin').post(
    (req, res)=>new UserController().loginAdmin(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res)=>new UserController().promeniLozinku(req, res)
)

userRouter.route('/promeni').post(
    upload.single('slika'),
    (req, res)=>new UserController().promeni(req, res)
)

userRouter.route('/aktiviraj').post(
    (req, res)=>new UserController().aktiviraj(req, res)
)

userRouter.route('/deaktiviraj').post(
    (req, res)=>new UserController().deaktiviraj(req, res)
)

userRouter.route('/getVlasnike').get(
    (req, res)=>new UserController().getVlasnike(req, res)
)

userRouter.route('/getTuriste').get(
    (req, res)=>new UserController().getTuriste(req, res)
)

export default userRouter;