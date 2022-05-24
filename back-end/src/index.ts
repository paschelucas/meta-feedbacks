import { app } from "./controller/app";
import { questionRouter } from "./router/questionRouter";

app.use("/question", questionRouter);
