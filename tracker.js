var BtczBalance1 = 0;
var BtczBalance2 = 0;
var BtczValue = 0;
var startDate = new Date("2018-01-03T19:00:00Z");

function updatePage(){
    var currentDate = new Date().getTime();
    var hours = Number(Math.round((currentDate-startDate)/3600000));
    var totalDonations = Number(Math.round(BtczBalance1+BtczBalance2));
    var hourlyAverage = Number(Math.round(totalDonations/hours));
    var BtczBalance1_toBtc = (BtczBalance1*BtczValue);
    var BtczBalance2_toBtc = (BtczBalance2*BtczValue);
    document.getElementById('statsTxt').innerHTML = "<b>" + totalDonations + " BTCZ</b> raised in <b>" + hours + " hours</b>, average: <b>" + hourlyAverage + " BTCZ/h</b>";
    document.getElementById('btczBalance1').innerHTML = BtczBalance1.toFixed(0) + " BTCZ";
    document.getElementById('btczBalance2').innerHTML = BtczBalance2.toFixed(0) + " BTCZ";
    document.getElementById('btczBalance1_toBtc').innerHTML = "<b>" + BtczBalance1_toBtc.toFixed(8) + " BTC</b>";
    document.getElementById('btczBalance2_toBtc').innerHTML = "<b>" + BtczBalance2_toBtc.toFixed(8) + " BTC</b>";
    document.getElementById('progressBar1').style.width = (BtczBalance1_toBtc/0.025).toFixed(2) + "%";
    document.getElementById('progressPercent1').innerHTML = (BtczBalance1_toBtc/0.025).toFixed(0) + "%";
    document.getElementById('progressBar2').style.width = (BtczBalance2_toBtc/0.025).toFixed(2) + "%";
    document.getElementById('progressPercent2').innerHTML = (BtczBalance2_toBtc/0.025).toFixed(0) + "%";
}

function getBalances(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://bitcoinz.ph/api/addr/t1L2h7WyVsxEvbw1acefwXWBQWYReQnN7MF/balance", true);
    xhr1.onload = function(){
        if(this.status == 200){
            var result = xhr1.responseText;
            BtczBalance1 = Number(result/100000000);
            updatePage();
        }
    }
    xhr1.send();
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://bitcoinz.ph/api/addr/t1QPbt39fb4pzWXkNSM3qo6dWiL4ii42s48/balance", true);
    xhr2.onload = function(){
        if(this.status == 200){
            var result = xhr2.responseText;
            BtczBalance2 = Number(result/100000000);
            updatePage();
        }
    }
    xhr2.send();
    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "https://api.coinmarketcap.com/v1/ticker/bitcoinz/", true);
    xhr3.onload = function(){
        if(this.status == 200){
            var result = JSON.parse(xhr3.responseText);
            BtczValue = Number(result[0].price_btc);
            updatePage();
        }
    }
    xhr3.send();
}

function start(){
    getBalances();
    setInterval(function(){getBalances();}, 300000);
}