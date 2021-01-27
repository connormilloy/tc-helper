require('dotenv').config()
require("./torn.js");
const stocklist = require("./json/stocklist.json");
const {prefix, bot_info} = require('./json/config.json');
const fetch  = require('node-fetch');
const tornAPIKey = process.env.APIKEY;
const networth = require("./torn");
const stocks = require("./stockmarket");
const items = require("./itemmarket");
//const torn = new Torn({API_Key: process.env.APIKEY});
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.once('ready', () => {
    console.log(`${bot_info.name} (v${bot_info.version}) loaded..`);
})

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command==="ping"){
        console.log(args);   
    }

    if(command ==="stockslist"){
        let content = "";
        for(let i=0; i<stocklist.length; i++){
            content +=  `${stocklist[i].id} -- ${stocklist[i].info} \n`
        }
                
        const msg = "```" + content + "```";
        message.author.send(`Here's a list of the valid stock IDs. \n${msg}`);
    }

    if(command ==="player"){
        if(!args.length){
            return message.channel.send(`You didn't provide any arguments. The correct syntax for this command is $networth (userID)`);
        }

        let userNetworth = networth.getNetworth(args);
        userNetworth.then(result => {
                const embedResult = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Player Information for ID: ${args}`)
                .setURL(`https://www.torn.com/profiles.php?XID=${args}`)
                .setThumbnail('https://pbs.twimg.com/profile_images/1074619539797749760/szawZLm8_400x400.jpg')
                .addFields(
                    {name: 'Player Name', value: result[0]},
                    {name: 'Level', value: result[1]},
                    {name: 'Property', value: result[2]},
                    {name: 'Current Job', value: result[3]},
                    {name: 'Status:', value: result[4]}
                )
                .setFooter('Bot created and maintained by @dirgetheundying', 'https://pbs.twimg.com/profile_images/1074619539797749760/szawZLm8_400x400.jpg')
                message.channel.send(embedResult);

            console.log(result);

        });
    }

    if(command === "stocks"){
        let currentStocks = stocks.getStocks(args);
        currentStocks.then(result => {
            if(result[0] != "not-found"){
                if(result[0] != 0){
                    const embedResult = new Discord.MessageEmbed()
                    .setColor('#ff00ff')
                    .setDescription(`Information accurate as of latest stock update at ${result[10]}.`)
                    .setTitle(`Stock information for Stock ID: ${result[2]}`)
                    .setURL("https://www.torn.com/stockexchange.php")
                    .setThumbnail(`https://www.torn.com/images/v2/stock/logos/${result[2]}_logo.png?v=1528808940574`)
                    .addFields(
                        {name: 'Stock Name', value: `${result[1]} (${result[2]})`},
                        {name: 'Director', value: result[3]},
                        {name: 'Available Stock', value: result[5]},
                        {name: 'Current Price', value: `$${result[4]}`, inline: true},
                        {name: 'Change from Last Update', value: result[12], inline: true},
                        {name: '-----------------', value: '----------------'},
                        {name: 'Forecast', value: result[6], inline: true},
                        {name: 'Demand', value: result[7], inline: true},
                        {name: `${result[8]} Shares Needed for Benefit`, value: `${result[9]}.`}
                    )
                    message.channel.send(embedResult);
                } else {
                    const embedResult = new Discord.MessageEmbed()
                    .setColor('#ff00ff')
                    .setDescription(`Information accurate as of latest stock update.`)
                    .setTitle(`Stock information for Stock ID: ${result[2]}`)
                    .setURL("https://www.torn.com/stockexchange.php")
                    .setThumbnail(`https://www.torn.com/images/v2/stock/logos/${result[2]}_logo.png?v=1528808940574`)
                    .addFields(
                        {name: 'Stock Name', value: `${result[1]} (${result[2]})`},
                        {name: 'Available Stock', value: result[5]},
                        {name: 'Current Price', value: `$${result[4]}`, inline: true},
                        {name: 'Forecast', value: result[6], inline: true},
                        {name: 'Demand', value: result[7], inline: true},
                    )
                    message.channel.send(embedResult);
                }
            } else {
                message.channel.send("I could not find that stock ID. Please check you've entered it correctly or type $stockslist and I'll send you a PM with a list of them.")
            }
                
        })
    }

    if(command === "market"){
        let itemSearch = items.searchMarket(args);
        itemSearch.then(result => {
            if(result[0] === "n/a"){
                message.channel.send("No results found. Please check you've entered your search correctly.")
            } else {
                const embedResult = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`Market Information for ${result[0]}`)
                .setURL(`https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname=${result[3]}`)
                .setThumbnail(`${result[2]}`)
                .addField('Market Value', `${result[1]}`)
                message.channel.send(embedResult);
            }
            
        })
    }
})