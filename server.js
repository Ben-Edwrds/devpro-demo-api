const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8'); 
  
  const htmlPagina = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevPro4 - Status</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: #1e1e2e; /* Donkere, moderne achtergrond */
                color: #cdd6f4; 
                text-align: center; 
                padding: 50px; 
                margin: 0;
            }
            .container { 
                background-color: #313244; 
                border-radius: 15px; 
                padding: 40px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
                max-width: 650px; 
                margin: auto; 
                border-top: 5px solid #a6e3a1; /* Groen accent */
            }
            h1 { color: #89b4fa; } /* Blauwe titel */
            p { font-size: 1.2em; line-height: 1.6; }
            .status-badge { 
                display: inline-block; 
                padding: 10px 25px; 
                background-color: #a6e3a1; 
                color: #11111b; 
                border-radius: 8px; 
                margin-top: 25px; 
                font-weight: bold;
                font-size: 1.1em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 DevPro4 Server Online</h1>
            <p>Welkom! De automatische CI/CD pipeline is succesvol doorlopen. Alles wat in GitHub wordt gepusht, staat nu live.</p>
            <p><strong>Huidige Missie:</strong> Sprint 4 - Infrastructuur automatiseren met Ansible & Terraform.</p>
            <div class="status-badge">✅ Systeem Gezond & Verbonden</div>
        </div>
    </body>
    </html>
  `;

  res.end(htmlPagina);
});

server.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});
