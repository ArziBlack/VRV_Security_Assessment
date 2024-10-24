import express, {Application} from 'express'
import cors from 'cors'
import routes from './routes/index';
import { PORT } from './config';
import { error_handler } from './middleware/error_handler';

if (!PORT) {
    process.exit(1);
}

const app: Application = express();

app.use(cors({ credentials: true })); 
app.use(express.json());
app.use(error_handler);
app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`CDAB Backend Server Started and Running on Port ${PORT}...`)
});