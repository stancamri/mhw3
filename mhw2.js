
const bottone = document.querySelector("#accediLink");
bottone.addEventListener("click", cliccato);

function cliccato(){
    modale.style.display ="block"
}

const imgChiudiModale = document.createElement("img");
imgChiudiModale.src ="fotox-1.jpeg";
imgChiudiModale.classList.add("img-chiudi-modale");
imgChiudiModale.addEventListener("click", chiudix);
function chiudix(){
    modale.style.display ="none"
}
document.getElementById("chiudiModaleContainer").appendChild(imgChiudiModale)


const apriModaleCerca = document.getElementById('apriModaleCerca');
const modaleCerca = document.getElementById('modaleCerca');
const chiudiModaleCerca=document.getElementById("chiudiModaleCerca");


apriModaleCerca.addEventListener("click", cliccat);
function cliccat(){
    modaleCerca.style.display="block";
}
chiudiModaleCerca.addEventListener("click", clic);
function clic(){
    modaleCerca.style.display="none"
}

const nav = document.querySelector('nav');
const navPosition=nav.offsetTop;
const flexContaine3 = document.querySelector("#flex-containe3");
const logo = document.querySelector('#logo');

window.addEventListener('scroll', scendi);
   
function scendi(){
    if (window.scrollY > navPosition) {
      nav.classList.add('scrolled');
      flexContaine3.style.display="none";
      logo.classList.add('logo-nav');

    } else {
      nav.classList.remove('scrolled');    
      flexContaine3.style.display="";
      logo.classList.remove('logo-nav');
    }
  }


  document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('map');

    tomtom.search('giarre')
        .go()
        .then(response => {
            const location = response.results[0].position;

            const map = tomtom.L.map(mapElement, {
                key: 'TUA_CHIAVE_API',
                basePath: '/sdk',
                source: 'vector',
                center: location,
                zoom: 15
            });

            tomtom.L.marker(location).addTo(map)
                .bindPopup('via veneto 91')
                .openPopup();
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });
});



document.addEventListener('DOMContentLoaded', function() {
    // Definisci la chiave API, il codice del paese e l'anno
    const apiKey = 'cQDwPu0Aj9p9TGP46TwLEN9xVSi3Tuol';
    const countryCode = 'IT'; 
    const year = 2024;
    const language = 'it';
    // Costruisci l'URL della richiesta 
    const url = 'https://calendarific.com/api/v2/holidays?api_key=cQDwPu0Aj9p9TGP46TwLEN9xVSi3Tuol&country=IT&year=2024&language=it';
  
   
// Effettua la richiesta GET all'API di Calendarific
fetch(url)
.then(response => {
  // Controlla se la risposta è OK (200)
  if (!response.ok) {
    throw new Error('Errore nella richiesta API: ' + response.status);
  }
  // Parsifica la risposta come JSON
  return response.json();
})
.then(data => {
  // Gestisci i dati ricevuti
  console.log('Risposta API:', data);

  // Esempio di come si potrebbero manipolare i dati
  const holidays = data.response.holidays
  
  // Visualizza tutti i giorni festivi 
  displayHolidays(holidays);
})
.catch(error => {
  // Gestisci gli errori di rete o dell'API
  console.error('Si è verificato un errore:', error);
});

// Definisci la funzione per aggiungere i giorni festivi al DOM
function displayHolidays(holidays) {
// Seleziona l'elemento HTML dove vuoi visualizzare i giorni festivi
const holidayList = document.getElementById('holiday-list');
// Svuota la lista prima di aggiungere gli elementi
holidayList.innerHTML = '';
// Itera attraverso ogni giorno festivo e crea un elemento HTML per ciascuno
holidays.forEach(holiday => {
  const holidayItem = document.createElement('li');
  holidayItem.innerHTML = `
    <strong class="holiday">Holiday name:</strong> ${holiday.name}<br>
    <strong class="holiday">Date:</strong>  ${holiday.date.iso}<br>
    <strong class="holiday">Description:</strong>${holiday.description}<br>
  `;
  holidayList.appendChild(holidayItem);
});
}
});

document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
      loginBtn.addEventListener('click', function() {
          window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23lizhmpJ7G29rXgby&redirect_uri=https://github.com/stancamri&scope=public_repo';
      });
  } else {
      console.error('Elemento con ID "login-btn" non trovato.');
  }
});

// Funzione per ottenere il codice di autorizzazione dalla query string dell'URL
function getCodeFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('code');
}

// Funzione per scambiare il codice di autorizzazione con un token di accesso
async function exchangeCodeForToken() {
  const code = getCodeFromUrl();
  if (!code) {
      console.error('Codice di autorizzazione non trovato nella query string dell\'URL.');
      return;
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          client_id: 'Ov23lizhmpJ7G29rXgby',
          client_secret: '8d7aeaee71ea15ba522acfb0f9b768a1d5636608',
          code: code
      })
  });

  const data = await response.json();
  const accessToken = data.access_token;
  // Ora che abbiamo il token di accesso, possiamo fare richieste all'API di GitHub per ottenere informazioni sull'utente
  getUserInfo(accessToken);
}

// Funzione per ottenere informazioni sull'utente utilizzando il token di accesso
async function getUserInfo(accessToken) {
  const response = await fetch('https://api.github.com/user', {
      headers: {
          'Authorization': 'Bearer ' + accessToken
      }
  });

  const userData = await response.json();
  console.log(userData);
}

// Chiamiamo la funzione per scambiare il codice di autorizzazione con un token di accesso al caricamento della pagina
window.onload = exchangeCodeForToken;