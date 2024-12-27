document.addEventListener('DOMContentLoaded', getData);

async function getData(){
    const response = await fetch("CO2_Unternehmen.json");
    const json = await response.json();

    const tableBody = document.querySelector('#co2_tabelle tbody')
    tableBody.innerHTML = '';

  
    json.forEach(entry => {
        console.log("Verarbeite Eintrag:", entry); // Zeigt den aktuellen Eintrag an
        if (!entry.Land || !entry.Unternehmen || !entry["CO2-Ausstoß"]) {
            console.warn("Fehlende Felder in Eintrag:", entry); // Warnung bei fehlenden Feldern
            return;
        }

        const row = document.createElement('tr');

        const landCell = document.createElement('td');
        landCell.textContent = entry.Land;

        const unternehmenCell = document.createElement('td');
        unternehmenCell.textContent = entry.Unternehmen;

        const co2Cell = document.createElement('td');
        co2Cell.textContent = entry["CO2-Ausstoß"] + ' Millionen Tonnen';

        row.appendChild(landCell);
        row.appendChild(unternehmenCell);
        row.appendChild(co2Cell);

        tableBody.appendChild(row);
    });
}

