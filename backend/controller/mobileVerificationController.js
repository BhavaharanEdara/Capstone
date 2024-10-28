const twilio = require('twilio');

const accountSid = process.env.TWILLO_SID; // Your Account SID
const authToken = process.env.TWILLO_AUTH; // Your Auth Token

const client = twilio(accountSid, authToken);

const sendVerificationCode = async (phoneNumber,verificationCode) => {
    console.log(phoneNumber, verificationCode)
    try {
        await client.messages.create({
            body: `Your verification code is: ${verificationCode}`,
            from: "+1 775 277 2548",
            to: "+"+"919440001237",
        });
        console.log('Verification code sent successfully');
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw new Error('Unable to send verification code');
    }
};

module.exports = {sendVerificationCode}