import nodemailer from "nodemailer";

import { MailSender } from "./interfaces/mail-sender.interface";

export class NodemailerMailSender implements MailSender {
    private host: string;
    private port: number;
    private user: string;
    private pass: string;

    constructor(host: string, port: number, user: string, pass: string) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.pass = pass;
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