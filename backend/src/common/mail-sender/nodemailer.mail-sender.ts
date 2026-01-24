import nodemailer from "nodemailer";

import { MailSender } from "./interfaces/mail-sender.interface";

export class NodemailerMailSender implements MailSender {
    private host: string;
    private port: number;
    private user: string;
    private pass: string;

    constructor() {
        this.host = process.env.MAIL_HOST ?? "";
        this.port = Number(process.env.MAIL_PORT) || 587;
        this.user = process.env.MAIL_USER ?? "";
        this.pass = process.env.MAIL_PASS ?? "";
    }

    public async send(to: string, subject: string, body: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: false,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        });

        await transporter.sendMail({
            from: `\"Friendzone\" <${this.user}>`,
            to: to,
            subject: subject,
            html: body,
        });
    }
}