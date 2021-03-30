const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
var rp = require('request-promise');

var Channel = {
    "綿羊": "sheep6203",
    "狐狸大神": "dpes210781",
    "亮老師": "lamprol",
    "九尾喵": "yolonightcat",
    "朝雲": "nichtdeintyp",
    "407": "arthur407",
    "哈綠大神": "h6303jixd"
};

client.on('message', msg => {
    if (msg.content === '有誰開台') {

        var myRequests = [];
        let peopleNumber = 0;
        for (name in Channel) {
            console.log("查看: " + name + " ID: " + Channel[name]);
            myRequests.push(rp(CheckOnlineStatus(Channel[name])));
        }
        Promise.all(myRequests)
            .then((arrayOfResult) => {
                arrayOfResult.forEach(function (result) {
                    console.log("arrayOfResult: ", result);
                    let resposeBody = "";
                    resposeBody = JSON.parse(result);
                    if (resposeBody.data.length != 0 && resposeBody.data[0].type == "live") {
                        console.log("有開: " + resposeBody.data[0].user_name + " ID: " + Channel[resposeBody.data[0].user_name]);
                        msg.channel.send(resposeBody.data[0].user_name + "目前有開 快去看 --> " + "https://www.twitch.tv/" + Channel[resposeBody.data[0].user_name]);
                        peopleNumber++;
                    }
                });

                if (peopleNumber == 0) {
                    msg.channel.send("目前沒人開台QAQ~~~~");
                }
            })
            .catch(/* handle error */);
    }
});

function CheckOnlineStatus(user_login) {
    var options = {
        url: 'https://api.twitch.tv/helix/streams?user_login=' + user_login,
        headers: {
            'Client-ID': 9nuu68vcqhdqio6hurcbps5sroq0h6
        }
    };
    return options;
}

client.login(ODI2NDU2MDA2MzAwMjcwNjEy.YGMvIg.v7Rwb36ZTDqteeUKzEdiHTZaLrE);
