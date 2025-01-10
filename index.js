import express from 'express'
import bp from 'body-parser'

const app = express();
const port = 4000;

// In-memory data store
let posts = [
    {
      id: 1,
      title: " 40MBPS for 3 months",
      content:
        "Unlimited Internet, Up to 40Mbps Speed, Unlimited Local/STD Calls",
      amountData: "₹499/month",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id: 2,
      title: "100MBPS for 6 months",
      content:
        "Unlimited Internet, Up to 100Mbps Speed, Unlimited Local/STD Calls",
      amountData: "₹799/month",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id: 3,
      title: "100MBPS for 12 months",
      content:
        "Unlimited Internet, Up to 100Mbps Speed, Unlimited Local/STD Calls, Benefits on subscription",
      amountData: "₹649/month",
      date: "2023-08-10T09:15:00Z",
    },
];
  
let lastId = 3;

// Middleware
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// GET all posts
app.get("/posts", (req, res) => {
    // console.log(posts);
    res.json(posts);
})

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    amountData: req.body.amountData,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.amountData) post.amountData = req.body.amountData;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`)
});