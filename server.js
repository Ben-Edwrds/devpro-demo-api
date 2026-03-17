const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Verbinden met de MongoDB container via het interne Docker-netwerk
mongoose.connect('mongodb://ext_mongodb:27017/demodb')
  .then(() => console.log('✅ Verbonden met MongoDB!'))
  .catch(err => console.error('❌ Fout bij verbinden:', err));

app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? '🟢 Actief en verbonden' : '🔴 Niet verbonden';
  
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1>🚀 DevPro4 CI/CD Pipeline Succesvol!</h1>
      <p>Deze pagina wordt automatisch geüpdatet via GitHub Actions.</p>
      <h3>Database Status (MongoDB): ${dbStatus}</h3>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Demo app luistert op poort ${port}`);
});
