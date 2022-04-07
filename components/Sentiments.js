import { useState, useEffect } from "react";
import Sentiment from "sentiment";
import ViewSplitter from "../components/ViewSplitter";
import SentimentItem from "../components/SentimentItem";
import { transcription } from "../data/transcription";

import styles from "./Sentiments.module.css";

const sentiment = new Sentiment();
const analysis = sentiment.analyze(transcription.transcript);

const Sentiments = () => {
  const [emotion, setEmotion] = useState("");
  const [sentimentList, setSentimentList] = useState([]);
  // console.log(analysis);

  return (
    <ViewSplitter>
      <div className={styles.wrapper}>
        <div>
          <h1
            className={styles.positive}
            onClick={() => {
              setEmotion("positive");
              setSentimentList([]);
              console.log(analysis);
              // console.log(analysis.calculation);
              // console.log(transcription.words);
              analysis.calculation.forEach((el, index) => {
                let elObject = {};
                if (el[Object.keys(el)] > 0) {
                  elObject.sentiment = Object.keys(el)[0];
                  elObject.score = el[Object.keys(el)];
                  elObject.position = 1;
                  // let transcriptIndex;

                  // transcription.words.forEach(()=>{

                  // })
                  // console.log(elObject);
                  setSentimentList((sentimentList) => [...sentimentList, el]);
                }
              });
            }}
          >
            Positive
          </h1>
          {analysis.positive ? (
            <p>Words: {analysis.positive.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
        <div>
          <h1
            className={styles.negative}
            onClick={() => {
              setEmotion("negative");
              setSentimentList([]);
              analysis.calculation.forEach((el, index) => {
                if (el[Object.keys(el)] < 0) {
                  setSentimentList((sentimentList) => [...sentimentList, el]);
                }
              });
            }}
          >
            Negative
          </h1>
          {analysis.negative ? (
            <p>Words: {analysis.negative.length}</p>
          ) : (
            <p>No words found</p>
          )}
        </div>
      </div>
      <div>
        {emotion ? (
          <>
            <div className={styles.listHead}>
              <h1>
                Sentiment:{" "}
                <span
                  style={{
                    color: `${emotion == "positive" ? "limegreen" : "tomato"}`,
                  }}
                >
                  {emotion}
                </span>
              </h1>
              <h3 style={{ color: "grey" }}>
                Occurred {sentimentList.length} times
              </h3>
            </div>
            <div style={{ maxHeight: "220px", overflowY: "scroll" }}>
              {sentimentList.map((el, index) => {
                return (
                  <SentimentItem
                    sentiment={emotion}
                    score={el[Object.keys(el)]}
                    word={Object.keys(el)}
                    time={5}
                    key={index}
                    onClick={() => {
                      console.log("Clicked");
                    }}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <h1>Select sentiment to get cues</h1>
        )}
      </div>
    </ViewSplitter>
  );
};

export default Sentiments;
