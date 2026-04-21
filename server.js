const http = require('http');

const port = 3000;

// Deze functie bevat jouw opmaak en menu. Zo hoef je dit niet voor elke pagina opnieuw te typen!
function genereerPagina(titel, specifiekeInhoud) {
  return `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titel}</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: #1e1e2e; 
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
                border-top: 5px solid #a6e3a1; 
            }
            h1, h2 { color: #89b4fa; } 
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
            a.nav-link {
                color: #cdd6f4; 
                text-decoration: none; 
                font-weight: bold;
            }
            a.nav-link:hover {
                color: #a6e3a1; /* Groen effectje als je eroverheen muist */
            }
        </style>
    </head>
    <body>
        <header>
            <nav>
                <ul style="list-style: none; display: flex; justify-content: center; gap: 20px; padding: 0; margin-bottom: 30px;">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li><a href="/over" class="nav-link">Over Ons</a></li>
                    <li><a href="/diensten" class="nav-link">Diensten</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                </ul>
            </nav>
        </header>

        <div class="container">
            <h2>${titel}</h2>
            ${specifiekeInhoud}
        </div>
    </body>
    </html>
  `;
}

// Hier definiëren we de inhoud voor de verschillende pagina's
const homeInhoud = `
    <section class="status-section">
        <div class="slider-container">
            <div id="slider" class="slider">
                <div id="slide1" class="slide active">
                    <p>We maken uw workflow meer efficiënt en uw bedrijf toekomstbestendig. Onze expertise in cloudoplossingen en applicatiedeployment stelt ons in staat om op maat gemaakte oplossingen te bieden die aansluiten bij uw unieke behoeften. Of u nu een startup bent die snel wil schalen of een gevestigd bedrijf dat zijn IT-infrastructuur wil moderniseren, wij hebben de kennis en ervaring om u te helpen slagen.</p>
                </div>
                <div id="slide2" class="slide">
                    <p>Onze diensten omvatten onder andere cloudmigratie, DevOps-implementatie, en continue integratie en levering (CI/CD). We werken nauw samen met onze klanten om hun doelen te begrijpen en oplossingen te ontwikkelen die niet alleen technisch robuust zijn, maar ook kosteneffectief en schaalbaar.</p>
                </div>
                <div id="slide3" class="slide">
                    <p>Jouw betrouwbare partner voor naadloze AI-integratie.</p>
                </div>
            </div>
        </div>
    </section>
    <section class="status-section" style="margin-top: 20px;">
        <p><strong>Meet our partners:</strong> Vives</p>
    </section>
    <aside style="margin-top: 20px; border-top: 1px solid #cdd6f4; padding-top: 10px;">
        <p>Tevreden klanten: <span class="status-badge">1</span></p>
        <p>Projecten: <span class="status-badge">1</span></p>
    </aside>
`;

const overInhoud = `
    <p>Wij zijn DevPro4, een ambitieuze Practice Enterprise gespecialiseerd in DevOps, Cloud Infrastructuur en AI-oplossingen.</p>
    <p>Ons team werkt met moderne technologieën zoals NGINX, Ansible, Docker en Terraform.</p>
`;

const dienstenInhoud = `
    <ul style="text-align: left; font-size: 1.2em; line-height: 1.6;">
        <li>Infrastructure as Code (IaC) met Terraform</li>
        <li>Configuratiemanagement met Ansible</li>
        <li>Containerisatie met Docker</li>
        <li>CI/CD pipelines en SonarQube kwaliteitscontroles</li>
        <li>AI Model integratie</li>
    </ul>
`;

const contactInhoud = `
    <p>Klaar om uw infrastructuur naar een hoger niveau te tillen?</p>
    <p>Neem contact met ons op via info@devpro4.be</p>
    <a href="mailto:info@devpro4.be" class="status-badge">Stuur een e-mail</a>
`;

// De daadwerkelijke webserver en routing
const server = http.createServer((req, res) => {
    // Standaard header instellen voor HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); 

    // Routing logica: Kijk welke URL is opgevraagd
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200);
        res.end(genereerPagina('DevPro4 - Cloudoplossingen en applicatiedeployment', homeInhoud));
    } 
    else if (req.url === '/over') {
        res.writeHead(200);
        res.end(genereerPagina('Over Ons', overInhoud));
    } 
    else if (req.url === '/diensten') {
        res.writeHead(200);
        res.end(genereerPagina('Onze Diensten', dienstenInhoud));
    } 
    else if (req.url === '/contact') {
        res.writeHead(200);
        res.end(genereerPagina('Neem Contact Op', contactInhoud));
    } 
    else {
        // Wat we laten zien als de pagina niet bestaat (404 Error)
        res.writeHead(404);
        res.end(genereerPagina('404 - Pagina niet gevonden', '<p>Oeps! Deze pagina bestaat helaas niet.</p>'));
    }
});

server.listen(port, () => {
    console.log(`Server draait op poort ${port}. Ga naar http://localhost:3000 in je browser!`);
});