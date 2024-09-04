const smpp = require('smpp');

const session = smpp.connect('smpp://example.com:2775');

session.bind_transceiver({
    system_id: 'YOUR_SYSTEM_ID',
    password: 'YOUR_PASSWORD'
}, (pdu) => {
    if (pdu.command_status === 0) {
        console.log('SMPP connection established and bound.');

        session.submit_sm({
            destination_addr: '+91vvvvvvvvv', // Replace with the recipient's phone number
            short_message: 'Hello!' // Replace with your message
        }, (pdu) => {
            if (pdu.command_status === 0) {
                console.log('Message sent successfully!');
            } else {
                console.error('Message sending failed:', pdu.command_status);
            }
            session.close(); 
        });
    } else {
        console.error('SMPP connection failed:', pdu.command_status);
        session.close();
    }
});

session.on('error', (error) => {
    console.error('SMPP error:', error);
});
