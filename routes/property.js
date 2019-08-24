var request = require('request');

const propertyPort = process.env.PROPERTY_PORT || 9084;
const brokerPort = process.env.BROKER_PORT || 8080;
var propertyApiCall;
var brokerApiCall;

module.exports = {
    getProperties: (req, res) = > {
    var hostname = req.hostname || "localhost";
propertyApiCall = "http://" + hostname + ":" + propertyPort;
global.propertyApiCall = propertyApiCall;

getProperties(function (err, properties) {
    if (err) return res.json(err);
    res.render("index.ejs", {
        title: "Welcome to Dream Home",
        properties: JSON.parse(properties)
    });
});
},
(req, res) =;
>
{
    var hostname = req.hostname || "localhost";
    propertyApiCall = "http://" + hostname + ":" + propertyPort;
    brokerApiCall = "http://" + hostname + ":" + brokerPort;
    global.propertyApiCall = propertyApiCall;
    global.brokerApiCall = brokerApiCall;

    getBrokers(function (err, brokers) {
        if (err) return res.json(err);
        res.render('add-property.ejs', {
            title: "Welcome to Dream | Add a new property"
            , brokers: JSON.parse(brokers)
            , message: ''
        });
    });

}
,
(req, res) =;
>
{
    var hostname = req.hostname || "localhost";
    propertyApiCall = "http://" + hostname + ":" + propertyPort;
    global.propertyApiCall = propertyApiCall;
    let property = {};
    let broker = req.body.broker.toString().split(",");
    property = {
        'address': req.body.address,
        'zip': req.body.zip,
        'tags': req.body.tags.toString(),
        'brokerId': broker[0],
        'brokerName': broker[1],
        'price': {
            'currency': req.body.currency,
            'amount': req.body.amount
        },
        'baths': req.body.baths,
        'bedrooms': req.body.bedrooms,
        'type': 'property',
        'transactionType': req.body.transactionType
    };


    addProperty(property, function (err) {
        if (err) return res.json(err);
        res.redirect('/');
    });

}
,
(req, res) =;
>
{
    var hostname = req.hostname || "localhost";
    propertyApiCall = "http://" + hostname + ":" + propertyPort;
    brokerApiCall = "http://" + hostname + ":" + brokerPort;
    global.propertyApiCall = propertyApiCall;
    global.brokerApiCall = brokerApiCall;
    let propertyId = req.params.id;

    getProperty(propertyId, function (err, property) {

        if (err) return res.json(err);

        res.render('edit-property.ejs', {
            title: "Edit  Property"
            , property: JSON.parse(property)
            , message: ''
        });
    });
}
,
(req, res) =;
>
{
    let propertyId = req.body.id;
    var hostname = req.hostname || "localhost";
    propertyApiCall = "http://" + hostname + ":" + propertyPort;
    global.propertyApiCall = propertyApiCall;
    let message = '';
    let property = {};
    property = {
        '_id': propertyId,
        '_rev': req.body.rev,
        'address': req.body.address,
        'zip': req.body.zip,
        'tags': req.body.tags.toString(),
        'brokerId': req.body.brokerId,
        'brokerName': req.body.brokerName,
        'price': {
            'currency': req.body.currency,
            'amount': req.body.amount
        },
        'baths': req.body.baths,
        'bedrooms': req.body.bedrooms,
        'type': 'property',
        'transactionType': req.body.transactionType
    };
    updateProperty(propertyId, property, function (err) {
        if (err) return res.json(err);
        res.redirect('/');
    });

}
,
(req, res) =;
>
{
    var hostname = req.hostname || "localhost";
    propertyApiCall = "http://" + hostname + ":" + propertyPort;
    global.propertyApiCall = propertyApiCall;
    let propertyId = req.params.id;
    let propertyRev = req.params.rev;

    deleteProperty(propertyId, propertyRev, function (err) {
        if (err) return res.json(err);
        res.redirect('/');
    });

}
}

function getBrokers(cb) {
    request(brokerApiCall + "/broker", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(null, body);
        } else {
            console.log(error);
        }
    });
}

function getProperties(cb) {
    request(propertyApiCall + "/property", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(null, body);
        }
    });
}

function addProperty(property, cb) {
    const options = {
        uri: propertyApiCall + "/property",
        method: 'POST',
        body: JSON.stringify(property),
        headers: {"Content-type": "application/json; charset=UTF-8"}

    };
    request(options, function (error, response, body) {
        if (error) {
            return console.error('call failed:', error);
        }
        cb(null, body);
    });
}

function getProperty(id, cb) {
    request(propertyApiCall + "/property/" + id, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            console.log(body);
            cb(null, body);
        } else {
            console.log(error);
        }
    });

}

function updateProperty(id, property, cb) {
    const options = {
        uri: propertyApiCall + "/property",
        method: 'PUT',
        body: JSON.stringify(property),
        headers: {"Content-type": "application/json; charset=UTF-8"}

    };
    request(options, function (error, response, body) {
        if (error) {
            return console.error('call failed:', error);
        }
        cb(null, body);
    });

}

function deleteProperty(propertyId, propertyRev, cb) {
    const options = {
        uri: propertyApiCall + "/property/" + propertyId + "/" + propertyRev,
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}

    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(null, body);
        }
    });
}