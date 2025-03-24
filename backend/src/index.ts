import express, { Application } from "express"; 
import cors from "cors"
import routes from "./routes";

const app:Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", routes);

app.listen(3000)