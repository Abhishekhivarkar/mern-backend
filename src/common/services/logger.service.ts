import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

export const logger = pino({

  /* if project is in devlopment isDevlopment = debug */
  level: isDevelopment ? "debug" : "info", 

  /* give process id */  
  base: {
    pid: process.pid, 
  },

  /* it gives timestamps in proper format without this time:17484333 and with this time = "2026-05-28T12:00:00.000Z" in redable format */

  timestamp: pino.stdTimeFunctions.isoTime, 


  /*  hides sensitive data like passwords, tokens , accesstokens and we can add which fields to hide in paths list  and cencor:"[REDACTED]" means what to show in hidden fileds value like if log mistakely prints actual password "password":"123456" so pino hides it and shows like "password":"[REDACTED]" */
  redact:{ 
    paths:[
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "authorization",
      "req.headers.authorization"
    ],
    censor:"[REDACTED]"
  },

  /* transport use for how to output logs, pino prints raw json that are not redable so we use pino-pretty it makes logs redable and also colorized green for info, yellow for warnings and red for error that makes easy to read logs */

  transport: isDevelopment?{
    target:"pino-pretty",
    options:{
      colorize:true, // makes logs colorized
      translateTime:"SYS:standard",  // makes redable timestamps
      ignore:"pid,hostname"
    }
  }
  :undefined  // this makes pretty logging off in production and turn on raw JSON on transport = undefined 
});
