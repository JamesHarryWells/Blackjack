var express = require("express");
var app = express();
var path = require("path");
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Blackjack.html'));
  //__dirname : It will resolve to your project folder.
});
app.listen(3001);
console.log("Server running at Port 3001");
