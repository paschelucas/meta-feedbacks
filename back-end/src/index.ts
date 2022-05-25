import { app } from "./controller/app";
import { questionRouter } from "./router/questionRouter";
import { userRouter } from "./router/userRouter";

app.use("/question", questionRouter);

app.use("/user", userRouter);
