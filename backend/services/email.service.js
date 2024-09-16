import { createTransport } from "nodemailer";

console.log("SERVICES => email.service.js - createTransport");
export default createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_KEY,
  },
});
