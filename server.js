var smpp = require('smpp');
var server = smpp.createServer({
	debug: true
}, function(session) {
	session.on('error', function (err) {
	});
	session.on('bind_transceiver', function(pdu) {
		session.pause();
		checkAsyncUserPass(pdu.system_id, pdu.password, function(err) {
			if (err) {
				session.send(pdu.response({
					command_status: smpp.ESME_RBINDFAIL
				}));
				session.close();
				return;
			}
			session.send(pdu.response());
			session.resume();
		});
	});
});

server.listen(2775);
