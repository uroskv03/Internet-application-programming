import mongoose from 'mongoose'

const vikendicaSchema = new mongoose.Schema(
    {
        idV: Number,
        naziv: String,
        mesto: String,
        galerija: Array<String>,
        galerijaPom: Array<File>,
        usluge: String,
        cenovnik: Array<Number>,
        telefon: String,
        komentari: Array<String>,
        ocene: Array<Number>,
        vlasnik: String,
        blokirana: String,
        koordinate: {
          lat: Number,
          lng: Number
        }
    },{
      versionKey:false  
    }
);

export default mongoose.model('VikendicaModel', vikendicaSchema, 'vikendice');