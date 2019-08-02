var request = require('request');
const propertyPort = process.env.PROPERTY_PORT || 9084;
var propertyApiCall;

module.exports = {
    getHomePage: (req, res) = > {
    var hostname = req.hostname || "localhost";
propertyApiCall = "http://" + hostname + ":" + propertyPort;
global.propertyApiCall = propertyApiCall;
console.log(propertyApiCall);

getProperties(function (err, properties) {
    if (err) return res.json(err);
    res.render("index.ejs", {
        title: "Welcome to Dream Home",
        properties: JSON.parse(properties)
    });
});
}
}
;

function getProperties(cb) {
    request(propertyApiCall + "/property", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            cb(null, body);
        }
    });
}