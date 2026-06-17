// npm i nodemailer

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "tanveenk66@gmail.com",
    pass: "lkjp zxhb xfjt rgiy",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(data) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Tanveen Kaur" <tanveenk66@gmail.com>', // sender address
    to: data.rcvr, // list of receivers
    subject:data.sub , // Subject line
    html:data.body  // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


module.exports.main=main
// main().catch(console.error);
 