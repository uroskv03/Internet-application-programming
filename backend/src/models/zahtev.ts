import mongoose from 'mongoose'

const zahtevSchema = new mongoose.Schema(
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
        odbijeno: Boolean

    },{
      versionKey:false  
    }
);

export default mongoose.model('ZahteviModel', zahtevSchema, 'zahtevi');