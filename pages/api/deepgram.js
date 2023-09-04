const { Deepgram } = require("@deepgram/sdk");

// add api key
const deepgram = new Deepgram("");

export default async function handler(req, res) {
  try {
    const { results } = await deepgram.transcription.preRecorded(
      {
        buffer: Buffer.from(req.body, "base64"),
        mimetype: "audio/mpeg",
      },
      {
        punctuate: true,
        numerals: true,
        ner: true,
        diarize: true,
        utterances: true,
      }
    );
    console.log(results);
    res.status(200).json({ body: JSON.stringify(results) });
  } catch (err) {
    res.status(500).json({ body: String(err) });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
