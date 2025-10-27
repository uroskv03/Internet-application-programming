import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        korIme: String,
        lozinka: String,
        ime: String,
        prezime: String,
        tip: String,
        pol: String,
        adresa: String,
        telefon: String,
        mejl: String,
        brojKredinteKartice: Number,
        slika: String,
        aktivan: Boolean

    },{
      versionKey:false  
    }
);

export default mongoose.model('UserModel', userSchema, 'korisnici');