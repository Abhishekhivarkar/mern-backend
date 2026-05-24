import axios from "axios"

import { config } from "../../configs/env.config.js"

interface SendEmailOptions{
    to:string,
    subject:string,
    htmlContent:string
}


export const sendEmailProcessor = async ({
    to,
    subject,
    htmlContent
}:SendEmailOptions) =>{
    await axios.post("https://api.brevo.com/v3/smtp/email",{
        sender:{
            email:config.BREVO_SENDER_EMAIL,
        name:config.BREVO_SENDER_NAME,
        },

        to:[
            {
                email:to
            }
        ],
        subject,
        htmlContent,   
    },
    {
        headers:{
            "api-key":config.BREVO_API_KEY,
            "Content-Type":"application/json"
        }
    })
}