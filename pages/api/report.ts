import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "https://1337-hub.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, login, subject, description } = req.body;

  if (!to || !login || !subject || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: process.env.NEXT_PUBLIC_EMAIL_USER,
        to: to,
        replyTo: process.env.NEXT_PUBLIC_EMAIL_REPLYTO,
        subject: `${subject}`,
        html: `
          <p>Name: ${login}</p>
          <p>Subject: ${subject}</p>
          <p>description: ${description}</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Email error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
}
