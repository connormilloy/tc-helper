const fetch = require('node-fetch');
require('dotenv').config()
const tornAPIKey = process.env.APIKEY;
const userURL = "https://api.torn.com/user/";
const tornURL = "https://api.torn.com/torn/";

async function getNetworth(userID){
    let output = [];
    const urlToFetch = `${userURL}${userID}?selections=profile&key=${tornAPIKey}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();

            if(!jsonResponse.error){
                output.push(jsonResponse.name);
                output.push(jsonResponse.level);
                output.push(jsonResponse.property);
                output.push(`${jsonResponse.job.position} at ${jsonResponse.job.company_name}`);
                output.push(jsonResponse.status.description);
    
                output.push(jsonResponse.faction.faction_name);
                console.log(`!!! PLAYER PROFILE SEARCH: ${userID} !!!`);
            } else {
                output.push("n/a")
            }
            return output;

        } else {
            return "Error!";
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getNetworth = getNetworth;