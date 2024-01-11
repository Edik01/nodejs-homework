const sgMail = require("@sendgrid/mail");
const { SEND_GRID_API_KEY } = process.env;
sgMail.setApiKey(SEND_GRID_API_KEY);
const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "guloyan.edik@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = sendEmail;
