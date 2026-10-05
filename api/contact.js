const { Resend } = require("resend");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // Created per request so a missing key returns a clear error instead of crashing the function
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: "Email service is not configured (missing RESEND_API_KEY).",
    });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Please fill in all fields.",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["clauron.king@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact - ${subject || name}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject || "(none)"}

Message:
${message}
      `,
    });

    if (error) {
      return res.status(400).json({
        error: error.message || "Email service rejected the message.",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to send email.",
    });
  }
};
