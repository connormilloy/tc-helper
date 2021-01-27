const fetch = require('node-fetch');
const fs = require('fs');
const itemList = require('./json/items.json');
const { IntegrationApplication } = require('discord.js');
require('dotenv').config()
const tornAPIKey = process.env.APIKEY;


async function searchMarket(item){
   
    for(let i = 0; i < item.length; i++){
        item[i] = item[i][0].toUpperCase() + item[i].substring(1);
        if(item[i] === "Of"){
            item[i] = "of";
        }
    }
    const searchQuery = item.join(" ");
    //const searchQuery = itemStr.charAt(0).toUpperCase() + itemStr.slice(1);

    //dirty code to clean the search query up and capitalise the first letter of each word.
    console.log(`!!! ITEM MARKET SEARCH: ${searchQuery} !!!`);
    let itemExport = [];
    let itemID;
    const maxSize = Object.keys(itemList.items).length + 3;

    for(let i = 1; i < maxSize; i++){

        if(i === 999){
            i++;
        } else if (i===1000){
            i++;
        } else {
            let temp = itemList.items[i].name;
            
            if(searchQuery === temp.substring(0, searchQuery.length)){
                itemID = i;
                break;
            } else {
                itemID = 99999999;
            }
        }
    }

    const itemURL = `https://api.torn.com/torn/${itemID}?selections=items&key=${tornAPIKey}`;

    try{
        const response = await fetch(itemURL);
        if(response.ok){
            const jsonResponse = await response.json();
            if(itemID != 99999999){
                itemExport.push(jsonResponse.items[itemID].name);
                itemExport.push(formatCurrency(jsonResponse.items[itemID].market_value));
                itemExport.push(jsonResponse.items[itemID].image);
                itemExport.push(itemID);
                itemExport.push(jsonResponse.items[itemID].description);
            } else {
                itemExport.push("n/a");
            }

            return itemExport;
        } else {
            return "Error.";
        }
    } catch(e) {
        console.log(e);
    }
}

function formatCurrency(price){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(price);
}

function cleanNumbers(val){
    const formatter = new Intl.NumberFormat('en-US', {
        format: 'number'
    })
}
exports.searchMarket = searchMarket;