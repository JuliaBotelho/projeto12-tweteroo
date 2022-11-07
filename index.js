import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {

    const newSignup = req.body;

    users.push(newSignup)

    res.send("Ok")
});

app.post("/tweets", (req, res) => {

    const user = users.find((obj) => obj.username === req.body.username)

    const newTweet = {
        username: req.body.username,
        avatar: user.avatar,
        tweet: req.body.tweet
    };

    tweets.push(newTweet)

    res.send("Ok")
});

app.get("/tweets", (req, res) => {

    let tenLastTweets = tweets.slice(tweets.length - 10)

    res.send(tenLastTweets)
});

app.listen(5000, () => console.log("Server running in port: 5000"));
