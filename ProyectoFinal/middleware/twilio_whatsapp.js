const dotenv = require('dotenv');
dotenv.config()
const twilio = require('twilio');

const accounSid =  process.env.TWILIO_ACCOUNT_SID;
const tokenAuth = process.env.TWILIO_AUTH_TOKEN;

const cliente = twilio(accounSid, tokenAuth);

cliente.messages.create({
    to: process.env.NUMERO_DESTINATARIO_WHATSAPP,
    from: process.env.NUMERO_REMITENTE_WHATSAPP,
    body: 'Esto es un mensaje de prueba con WhatsApp',
    // mediaUrl: ['https://articulo.mercadolibre.com.ar/MLA-933548599-botin-ombu-cobalto-calzado-de-trabajo-y-seguridad-confort-_JM?hide_psmb=true#position=47&search_layout=grid&type=item&tracking_id=2f68f2ab-abaf-4b10-8ccd-fef829f6d31c&deal_print_id=eeeeac89-7055-425a-867e-26fbc763b580&promotion_type=DEAL_OF_THE_DAY']
})
.then((data) => {
    console.log('Mensaje enviado correctamente')
}).catch(console.log);