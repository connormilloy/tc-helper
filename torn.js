const fetch = require('node-fetch');
require('dotenv').config()
const tornAPIKey = process.env.APIKEY;
const userURL = "https://api.torn.com/user/";
const tornURL = "https://api.torn.com/torn/";

async function getNetworth(userID){

    const urlToFetch = `${userURL}${userID}?selections=profile&key=${tornAPIKey}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            let output = [];

            output.push(jsonResponse.name);
            output.push(jsonResponse.level);
            output.push(jsonResponse.property);
            output.push(`${jsonResponse.job.position} at ${jsonResponse.job.company_name}`);
            output.push(jsonResponse.status.description);
            console.log(output);
            return output;

        } else {
            return "Error!";
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getNetworth = getNetworth;