import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    // ✅ Configuration du transporteur (exemple avec Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ton e-mail (mettre dans .env)
        pass: process.env.EMAIL_PASS, // mot de passe d’application
      },
    });

    // ✅ Contenu du mail
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO, // ton adresse de réception
      subject: `📩 Nouveau message de ${fullName} - ${subject}`,
      text: `
Nom : ${fullName}
Email : ${email}
Téléphone : ${phone}

Message :
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur d’envoi :", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}
