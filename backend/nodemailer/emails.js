import { transporter } from "./nodemailer.config.js";

export const sendOtp = async (email, otp) => {
  try {
    let info = await transporter.sendMail({
      from: '"OTP Service" <clintonadeoti02@gmail.com>',
      to: email,
      subject: "Your OTP Code   wywiywiwy",
      text: `Your OTP code is: ${otp} test`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("error from mailer" + error)
  }
};
   

export const sendResetPasswordLink = async (email) =>{

    try {
        let info = await transporter.sendMail({
          from: '"OTP Service" <clintonadeoti02@gmail.com>',
          to: email,
          subject: "Reset Your Password",
          text: `yoo! Chad click here to rest your password`,
        });
        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log("error from mailer" + error)
      }
}