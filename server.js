import express from "express";
import UseRouter from "./routers/userRoute.js";
import PostRouter from "./routers/postRoute.js";
import commentRouter from "./routers/commentRoute.js";

const app = express();

const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", UseRouter);
app.use("/user", PostRouter);
app.use("/user", commentRouter);

app.listen(PORT, () => {
  console.log(`my server is running at ${PORT}`);
});
