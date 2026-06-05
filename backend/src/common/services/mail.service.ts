import { emailQueue } from "../../jobs/queues/email.queue.js";

export const sendRegisterMail = async (userEmail: string) => {
  await emailQueue.add("Welcome-email", {
    to: userEmail,
    subject: "Welcome to our platform",
    htmlContent: `
    <h1>Welcome</h1>

    <h2>Your account successfully registered</h2>
    `,
  });
};
