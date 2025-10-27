import mongoose from 'mongoose'

const rezervacijaSchema = new mongoose.Schema(
    {
        idR: Number,
        datumPocetka: String,
        datumKraja: String,
        datumKreiranja: String,
        idV: Number,
        komentar: String,
        ocena: Number,
        turista: String,
        status: String,
        komentarVlasnika: String,
        cena: Number,
        komentarPre: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('RezervacijaModel', rezervacijaSchema, 'rezervacije');