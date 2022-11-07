import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {

    const {username, avatar} = req.body;

    if(!username || !avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    users.push(req.body)

    res.send("Ok")
});

app.post("/tweets", (req, res) => {

    const {username, tweet} = req.body;

    if(!username || !tweet){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    const user = users.find((obj) => obj.username === username)

    if(!user){
        res.sendStatus(400);
        return;
    };

    const newTweet = {
        username: req.body.username,
        avatar: user.avatar,
        tweet: req.body.tweet
    };

    tweets.push(newTweet)

    res.send("Ok")
});

app.get("/tweets", (req, res) => {

    if (tweets.length <= 10){
        res.send(tweets)
        return;
    }else{
        let tenLastTweets = tweets.slice(tweets.length - 10)
        res.send(tenLastTweets)
        return;
    }

});

app.listen(5000, () => console.log("Server running in port: 5000"));
