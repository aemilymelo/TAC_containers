const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const culturaSchema = new Schema({
  nome: { type: String, required: true }, // nome da cultura (milho, soja, tomate, etc.)
  variedade: { type: String, required: false }, // variedade específica da cultura
  dataPlantio: { type: Date, required: true },
  dataColheitaPrevista: { type: Date, required: false },
  dataColheitaReal: { type: Date, required: false },
  area: { type: Number, required: true }, // área plantada em hectares
  status: { 
    type: String, 
    required: true,
    enum: ['plantado', 'germinando', 'crescimento', 'floração', 'colhido', 'perdido'],
    default: 'plantado'
  },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  propriedade: { type: Schema.Types.ObjectId, ref: 'Propriedade', required: true },
  observacoes: { type: String, required: false }
}, {
  timestamps: true // adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Cultura', culturaSchema);