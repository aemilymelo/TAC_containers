const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dadoClimaticoSchema = new Schema({
  tipo: { type: String, required: true }, // temperatura, umidade, chuva
  valor: { type: Number, required: true },
  dataHora: { type: Date, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  estacao: { type: Schema.Types.ObjectId, ref: 'Estacao', required: true }
});

module.exports = mongoose.model('DadoClimatico', dadoClimaticoSchema);
