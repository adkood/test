import { MongoClient } from "mongodb";

// /api/new-meetup ---mongodb+srv://Rohan:rjck112@cluster0.wxkad.mongodb.net/meetups?retryWrites=true&w=majority
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://negi:512544615@cluster0.zemkh.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
