var amqp = require('amqplib/callback_api');
var R_CONFIG = require('./config/config');

module.exports = {
    async publish(req, res) {

        if ((req.body.list != undefined) || (req.body.list != null) || (req.body.list != '')) {

            amqp.connect(R_CONFIG.URL, function(error0, connection) {
                if (error0) {
                    console.log(error0, "err0")
                    throw error0;
                }

                connection.createChannel(function(error1, channel) {
                    if (error1) {
                        console.log(error1, "err1")
                        throw error1;
                    }

                    var numArr = req.body.list.split(",");
                    var exchange = R_CONFIG.EXCHANGE;

                    channel.assertExchange(exchange, R_CONFIG.TYPE, {
                        durable: R_CONFIG.DURABLE
                    });

                    numArr.forEach(value => {
                        var msg = { 'project': req.body.projectName, 'number': value, 'template': req.body.template.replace("#projectname", req.body.projectName) }
                        channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
                        console.log(" [x] " + value + " Sent");
                    })

                    return res.redirect('/');
                    // res.send("Done");
                });

                /*setTimeout(function() { 
                  connection.close(); 
                  process.exit(0); 
                }, 500);*/
            });
        }
    }
}