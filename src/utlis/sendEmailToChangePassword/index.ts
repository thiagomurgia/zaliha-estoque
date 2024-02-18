import nodemailer from 'nodemailer'
import 'dotenv/config'

export async function sendEmailToChangePassword(email: string, name: string, token_id: number){
  
  const transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth:{
      user:process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      type:'LOGIN'
    }
  })

  const mailOptions = {
    from: 'sistema X <tzoppeim@live.com>',
    to: `${email}`,
    subject: 'Redefinição de senha (sistema X)',
    text: 'Email enviado.',
    html:`<p style="font-size: 16px>Olá <h1 style="color:red">Olá <b>${name}!<b><p/><br/>
    <p style="font-size: 16px">Foi feita uma solicitação de troca de senha para seu usuário no sistemaX<p/>
    <p style="font-size: 16px">Se você não solicitou a troca de senha, desconsidere este e-mail<p/>
    <p style="font-size: 16px">Seu código de acesso é o: ${token_id}<p/>`
  }

  transport.sendMail(mailOptions as object, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}