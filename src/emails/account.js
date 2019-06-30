const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'bryce.eadie@gmail.com',
//     from: 'bryce.eadie@gmail.com',
//     subject: 'first sendgrid email',
//     text: 'text for sendgrid email'

// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bryce.eadie@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bryce.eadie@gmail.com',
        subject: 'cancellation subject',
        text: `Happy trails, ${name}!`
    })
}

module.exports = {
    sendWelcomeEmail: sendWelcomeEmail,
    sendCancellationEmail: sendCancellationEmail
}
