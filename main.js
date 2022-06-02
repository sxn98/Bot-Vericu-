const Discord = require('discord.js');

let prefix = ","; //BOT PREFIX
var reply=0;
var joc=0;
var focuri=0;
var roleGame = {               // Numele jocurilor care Bot-ul le stie pentru a da rol persoanei care le joaca
        "fortnite": {
        id: "742091434907140258" //ROLE ID
    },
	    "playerunknown's battlegrounds": {
        id: "742091434907140258" //ROLE ID
    },
		"star wars™ jedi knight: jedi academy™": {
        id: "742090181309497480" //ROLE ID
    },
		"star wars™ battlefront™ ii": {
        id: "742090181309497480" //ROLE ID
    },
		"world of warcraft": {
        id: "744878987762991154" //ROLE ID
    },
		"valorant": {
        id: "742092300234129449" //ROLE ID
    },
	    "grand theft auto v": {
        id: "742089019789410464" //ROLE ID
    },
		"minecraft": {
        id: "742087045723193464" //ROLE ID
    },
		"league of legends": {
        id: "742083868701622334" //ROLE ID
    },
        "counter-strike: global offensive": {
        id: "742087471743107236" //ROLE ID
    },
	    "warframe": {
        id: "742084740710006879" //ROLE ID
    },
		"lost ark": {
        id: "951535399782723655" //ROLE ID
    },
};
var blackListWords = ["spotify", "custom", "status", "noxplayer"]; //BLACKLISTED ROLES
var client = new Discord.Client();

client.on("message", async message => {     // functie de "message" se apeleaza atunci cand botul vede ceva pe chat
	
    let mesaj=message.content.split(" ");
	let comanda= mesaj[0];
	
	if(message.author.bot) return;
	if(message.channel.type==="dm") return;
	if(!comanda.startsWith(prefix)) return;
  
    if (message.content === `${prefix}trezirea`) {   // o comanda de a da ping la toata lumea fara ca persoana respectiva sa aibe drepturi, deoarece botul o face
        reply=1;
        message.channel.send("sigur dau ping la toata lumea? (',da' sau ',nu')");
       // console.log(reply);
    }
    if (message.content === `${prefix}da` && reply===1){		
	    reply=0;
	    //console.log(reply);
	    message.channel.send("@everyone");
	    }else if (message.content === `${prefix}nu` && reply===1){		
	  	    reply=0;
	  	    message.channel.send("ok, nu le dau");
	  	    //console.log(reply);
	  }
	if(comanda === `${prefix}buletin`){        // Prima functie facuta botului, un simplu buletin al persoanei care il apeleaza
		let embed=new Discord.MessageEmbed()
		//.setAuthor(message.author.username)
		.setImage(message.author.displayAvatarURL())
		.setDescription("Acesta este buletinul tau!")
		.setColor("#274587")
		.addFields(
		{ name: "Nume", value: `${message.author.username}#${message.author.discriminator}` },
		{ name: "ID", value:message.author.id },
		{ name: "Nascut in data de", value: message.author.createdAt },
	)
		//.addFields("Nume",`${message.author.username}#${message.author.discriminator}`)
		//.addField("ID",message.author.id)
		//.addField("Nascut in data de", message.author.createdAt)

		.setTimestamp()
		.setFooter("Eliberat de NextGenSRL")
		message.channel.send(embed);
	}
	if(comanda === `${prefix}play`){           // Un joc de ruleta ruseasca in care pierzatorul este scos de pe server
		joc=1;
		message.channel.send("sigur vrei sa pornesti un joc de ruleta ruseasca? (',da' sau ',nu')");
	}
	if (message.content === `${prefix}da` && joc===1){		
	    joc=2;
	    //console.log(reply);
	    message.channel.send("ok, incepe jocul, trebuie doar sa scrii ',trage' pana cand cineva pierde, simplu, scrie ',stop' ca sa opresti jocul");
	    }else if (message.content === `${prefix}nu` && joc===1){		
	  	    joc=0;
	  	    message.channel.send("ok, se anuleaza jocul");
	  	    //console.log(reply);
	  }
	if(message.content === `${prefix}trage` && joc===2){
		var trage=Math.floor(Math.random()*(100-(focuri*16.66)))+1;
	    console.log(trage+" "+focuri+" "+(100-(focuri*16.66)).toFixed(2) +" "+(100-((1+focuri)*16.66)).toFixed(2));
		if(trage>100-((1+focuri)*16.66)){
			message.channel.send("F in chat pentru "+message.author.username);
			joc=0;
			focuri=0;
			message.member.kick("a pierdut la ruleta ruseasca").catch(console.error);
		    return;
	    }else if(focuri==4){
			message.channel.send("Felicitari, ai avut noroc si ai supravietuit");
			return;
		}
		focuri++;
		message.channel.send("ai scapat... ai avut "+(100-(parseInt(focuri))*16.66).toFixed(2).toString()+"% sanse sa scapi");

	}
	if(message.content === `${prefix}stop` && joc===2){
		message.channel.send("ok, se anuleaza jocul, nu te credeam asa fricos");
		joc=0;
		focuri=0;
	}
		
})
client.on("error", () => { client.login(token) });
client.on('presenceUpdate', (oldPresence, newPresence) => {
    //if (JSON.stringify(oldPresence) == 'undefined') {return};

    if (JSON.stringify(oldPresence) == undefined) {
        return
    };
    if (oldPresence == 'undefined') {
        return
    };
    if (oldPresence == null && newPresence == null) {
        return
    }
    if (oldPresence == 'undefined' && newPresence == 'undefined') {
        return
    }
    if (oldPresence.activities == 'undefined' && newPresence.activities == 'undefined') {
        return
    }
//	if(newPresence.activities.toString() =='Twitch'){
//		console.log('am ajuns pana aici');
//		client.channels.cache.get('877568841910222889').send(newPresence.member.displayName + ' este live ' +newPresence.activities.url );		
//	}
var stream="";
oldPresence.activities.forEach(activity=> {
	if(activity.type=="STREAMING"){
		stream="STREAMING";
	}
})
newPresence.activities.forEach(activity => {      // In caz ca cineva face stream, botul va da un mesaj pe un canal anume
        if (activity.type == "STREAMING" && stream!="STREAMING") {
			client.channels.cache.get('877568841910222889').send(`${newPresence.user.tag} este live ${activity.url}.`)
            console.log(`${newPresence.user.tag} face live ${activity.url}.`);

        };
});


var oldActivities = oldPresence.activities.toString();
var newActivities = newPresence.activities.toString();

var oldActivities = removeWords(oldActivities);
var newActivities = removeWords(newActivities);


if (oldActivities == newActivities) {
    return
};
var gameId = registeredGame(newActivities);

if(newActivities!="" && gameId && newPresence.member.roles.cache.find(role=>role.id==roleGame[gameId].id)===undefined ){   // Se verifica daca jocul jucat de persoana exista in lista si daca nu exista va da acel rol persoanei
    console.log('\n########################################################################################################################\n');
    console.log('Activitate veche: ' + oldActivities + '\nActivitate noua: ' + newActivities + '\nUser: ' + newPresence.member.displayName); // Daca se da rol, se va specifica in "Activitatea noua" care este acela
	console.log('Se da rol la baiatu');
	//console.log(newPresence.member.roles.cache.find(role=>role.id===roleGame[gameId].id));
    newPresence.member.roles.add(roleGame[gameId].id).catch(e => { console.error(e); });
	
	//newPresence.member.roles.cache.find(role =>role.name.toLowerCase()===newActivities)==undefined
    //newPresence.member.roles.cache.find(role =>console.log(role.name.toLowerCase()));
}else return;
});

client.on('ready', () => {    // Statusul bot-ului, poate fi schimbat in watching, playing, listening, etc
    console.log('Bot serving. Setting status...');
	client.user.setActivity("de garda", { type: "WATCHING"})

});
client.login(" aici bagi token-ul botului "); // token-ul botului, este unic pentru fiecare bot

function removeWords(text) {
    var str2 = text.replace(/,/g, " ");
    var str3 = str2.toLowerCase();
    str = str3.split(" ");

    for (var i = 0; i < blackListWords.length; i++) {
        for (var j = 0; j < str.length; j++) {
            if (str[j].toLowerCase() === blackListWords[i]) {
                str.splice(j, 1);
            }
        }
    }
    return text = str.join(" ");
}

function registeredGame(game) {
    game.toString();
    for (var gKey in roleGame) {
		//console.log(gKey.toString() +"-"+ game.toString());
        if ((game != null && game != undefined) && gKey.toString() === game.toString().toLowerCase()) {		
            return gKey;
        }
    }
    return false;
}


