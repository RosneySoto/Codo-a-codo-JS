const twilio = require('twilio');

const accounSid =  process.env.TWILIO_ACCOUNT_SID;
const tokenAuth = process.env.TWILIO_AUTH_TOKEN;

const cliente = twilio(accounSid, tokenAuth);

cliente.messages.create({
    to: process.env.NUMERO_DESTINATARIO_MSJ,
    from: process.env.NUMERO_REMITENTE_MSJ,
    body: 'Probando twilio'
})
.then((data) => {
    console.log('Mensaje enviado correctamente')
}).catch(console.log);