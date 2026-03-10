// const twilio = require("twilio");

// exports.sendWhatsApp = async (number, filePath, password) => {
//   const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

//   await client.messages.create({
//     from: "whatsapp:+14155238886",
//     to: `whatsapp:${number}`,
//     body: `Your password protected resume\nPassword: ${password}`,
//     mediaUrl: ["YOUR_PUBLIC_PDF_URL"],
//   });
// };
