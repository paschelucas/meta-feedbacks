import { app } from "./controller/app";
import { questionRouter } from "./router/questionRouter";
import { userRouter } from "./router/userRouter";
import { leaguerRouter } from "./router/leaguerRouter";
import { answerRouter } from "./router/answerRouter";
import { formRouter } from "./router/formRouter";

app.use("/question", questionRouter);
app.use("/user", userRouter);
app.use("/leaguers", leaguerRouter);
app.use("/answer", answerRouter);
app.use("/form", formRouter);
