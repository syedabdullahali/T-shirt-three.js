const nodemailer = require("nodemailer");
require("dotenv").config();

function mailAlert(email) {
    
    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODE_MAILER_EMAIL,
            pass: process.env.NODE_MAILER_PASSWORD,
        },
    });


    // Create the email options
    let mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: "Suspicious Login Attempt",
        html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;
        border: 1px solid #dddddd; border-radius: 10px;">
                <h2 style="color: #333;">Suspicious Login Attempt Detected!</h2>
                <p style="color: #555;">
                    Someone has attempted to log into your account with an incorrect OTP. If this wasn't you, 
                    please secure your account immediately or Update password.
                </p>
                <p style="color: #555;">
                    If you did not request this action, please ignore this email or contact our support team.
                </p>
                <p style="color: #999; font-size: 12px;">
                    Best regards,<br>
                    The Adiya Service Team
                </p>
            </div>
    `,
    }
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return { error: error };
        } else {
            return { success: true, message: info.response };
        }
    });
}

module.exports = mailAlert;
