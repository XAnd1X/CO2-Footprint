const co2 = getData();

async function getData(){
    const response = await fetch("CO2_Unternehmen.json");
    const json = await response.json();

    json;
}