// the quick brown fox jump over the lazy DOMStringList

const fs = require('fs');
const http = require('http');
var requests = require('requests')
const { createServer } = require('tls');

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceval = (tempval , orgval) =>{
    let temperature = tempval.replace("{%tempval%}" , orgval.main.temp);
    temperature =temperature.replace("{%tempmin%}" , orgval.main.temp_min);
 temperature =temperature.replace("{%tempmax%}" , orgval.main.temp_max);
    temperature =temperature.replace("{%location%}" , orgval.name);
    temperature =temperature.replace("{%country%}" , orgval.sys.country);
    temperature =temperature.replace("{%tempstatus%}" , orgval.weather[0].main);
    return temperature;
}
const server = http.createServer((req , res) =>{
    if(req.url == "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=96477469ab9f061705577b2623b09a2b')
.on('data',  (chunk) => {
   
    const objdata = JSON.parse(chunk);
    const arrData = [objdata];
    const realTimeData = arrData.map((val) =>
        replaceval(homeFile, val)).join("");
    res.write(realTimeData);
    console.log(realTimeData);
//   console.log(arrData)
})
.on('end',  (err) =>{
  if (err) return console.log('connection closed due to errors', err);
 res.end();
});
    }
});

server.listen(8500,"127.0.0.1");