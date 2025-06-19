import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { cardRouter } from './routes/card.router.js'
import { userRouter} from './routes/user.router.js'
dotenv.config()

const app = express()


//app.use(cors())
app.use(express.json())

app.use("/cards", cardRouter);
app.use("/usuarios",userRouter);


app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
)
