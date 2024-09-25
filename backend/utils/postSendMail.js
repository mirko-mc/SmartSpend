import EmailTransport from "../services/email.service.js";

export const PostSendMail = async (email, name) => {
  try {
    await EmailTransport.sendMail({
      /** chi manda la mail */
      from: "test@test.test",
      /** chi riceve la mail */
      to: email,
      /** oggetto mail */
      subject: "Prova invio mail",
      /** testo mail */
      text: `Mail inviata a ${name}`,
      /** html mail */
      html: `<b>Mail inviata a ${name}</b>`,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
