const express = require('express');
const cors = require('cors');
const mongoose = require('./app/database/index')
const userGraphQLController = require('./app/controllers/userGraphQLController');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 4000;

// Aqui você habilita o CORS
app.use(cors({
  origin: 'http://localhost:3000', // coloca o endereço do seu front-end
  credentials: true
}));

 require('./app/controllers/index')(app);
//app.use('/graphql', userGraphQLController);

app.listen(PORT, () => {
  console.log(`-------------------------------------------------------`);
   console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
});
mongoose.connection.once('open', () => {
  console.log(' Conectado ao MongoDB ');
});