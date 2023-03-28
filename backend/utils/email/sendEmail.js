const nodemailer = require('nodemailer');
const ejs = require("ejs");
module.exports = {

    sendEmailForgotPassword(to, name, link, subject, success, failure) {
        var transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.googlemail.com',
            port: process.env.EMAIL_PORT || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || 'clickbusinuess@gmail.com',
                pass: process.env.EMAIL_PASS || 'wwfogcuferylgigb'
            },
            tls: {
                rejectUnauthorized: true
            }
        });
        ejs.renderFile(process.cwd() + '/utils/email/views/activate-email.ejs', { title: `Dear ${name},`, heading1: `Have you forgotted your password? Click on button below!`, link, }, (err, str) => {
            var mailOptions = {
                from: process.env.EMAIL_FROM || "clickbusinuess@gmail.com",
                to: to,
                subject: subject,
                html: str,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return failure ? failure(error) : error;
                } else {
                    console.log('Email sent: ' + info.response);
                    return success ? success(info) : info;
                }
            });
        })
    },

}