const fetch = require('node-fetch');
require('dotenv').config()
const tornAPIKey = process.env.APIKEY;
const stockURL = "https://api.torn.com/torn/";

async function getStocks(stock){
    const stockRaw = stock.join();
    const stocksList = ["tcse", 'tsbc', "tcb", "sys", "slag", "iou", "grn", "tchs", "yaz", "tct", "cnc", "msg", "tmi", "tcp", "iil", "fhg", "sym", "lsc", "prn", "ewm", "tcm", "elbt", "hrg", "tgp", "placeholder", "wssb", "istc", "bag", "evl", "mcs", "wlt", "tcc"];
    let output = [];

    if(stocksList.includes(stockRaw)){
        const stockID = stocksList.indexOf(stockRaw);
        const urlToFetch = `${stockURL}${stockID}?selections=stocks&key=${tornAPIKey}`;

        try{
            const response = await fetch(urlToFetch);
            if(response.ok){
                const jsonResponse = await response.json();

                //push the initial stock ID so we can check if the output is the malformed ID 0 stock and change the embed format
                output.push(stockID);

                //relevant stock info
                output.push(jsonResponse.stocks[stockID].name);
                output.push(jsonResponse.stocks[stockID].acronym);
                output.push(jsonResponse.stocks[stockID].director);
                output.push(jsonResponse.stocks[stockID].current_price);
                output.push(jsonResponse.stocks[stockID].available_shares);
                output.push(jsonResponse.stocks[stockID].forecast);
                output.push(jsonResponse.stocks[stockID].demand);
                
                //if the user looks up the TCSE stock the entire json object is malformed. we need to only look for these fields if it's not TCSE.
                if(stockID != 0){                  
                    //benefit block info
                    output.push(jsonResponse.stocks[stockID].benefit.requirement);
                    output.push(jsonResponse.stocks[stockID].benefit.description);

                    //historical stock info
                    output.push(jsonResponse.stocks[stockID].history[0].display_time);
                    output.push(jsonResponse.stocks[stockID].history[0].price);
                    output.push(jsonResponse.stocks[stockID].history[0].change);
                }
                console.log(`STOCK MARKET SEARCH: ${stockRaw}`);
                return output;

            } else {
                return "Error!";
            }
        } catch (error) {
            console.log(error);
        }

    } else {
        output.push("not-found");
        return output;
    }
}

exports.getStocks = getStocks;