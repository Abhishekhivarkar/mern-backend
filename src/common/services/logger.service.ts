import winston from "winston"

export const logger = winston.createLogger({

 level:
  process.env.NODE_ENV === "development"
   ? "silly"
   : "info",

 format:winston.format.combine(

  winston.format.timestamp(),

  winston.format.errors({
   stack:true
  }),

  winston.format.printf((info:any)=>{

   return `
[${info.timestamp}]
LEVEL: ${info.level.toUpperCase()}
MESSAGE: ${info.message}
`
  })
 ),

 transports:[

  new winston.transports.Console(),

  new winston.transports.File({
   filename:"logs/error.log",
   level:"error"
  }),

  new winston.transports.File({
   filename:"logs/combined.log"
  })
 ]
})