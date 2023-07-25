"use client";

import { useState } from "react";
import TextDisplay from "./TextDisplay";
import ScoreMeter from "./ScoreMeter";
import { IoSend } from "react-icons/io5";
import Button from "../Button";
import axios from "axios";
import getPredictionUTE from "@/actions/getPredictionUTE";

interface ParaphraseGameProps {
  phrases: string[];
}

const ParaphraseGame: React.FC<ParaphraseGameProps> = ({ phrases }) => {
  // For game functionality
  const [numPhrases, setNumPhrases] = useState(phrases.length);
  // For card functionality
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  // For card effect
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstPhrase, setFirstPhrase] = useState(phrases[currentIndex]);
  const [secondPhrase, setSecondPhrase] = useState(phrases[currentIndex + 1]);
  // For tfjs model
  const [value, setValue] = useState("");
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setButtonDisabled(true);
    setPlayAnimation(true);
    setValue("");
    setScore(null);

    setTimeout(() => {
      setFirstPhrase(secondPhrase);
    }, 285);

    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % numPhrases);
      setSecondPhrase(phrases[(currentIndex + 1) % numPhrases]);

      setButtonDisabled(false);
      setPlayAnimation(false);

      if (currentIndex > 0.7 * numPhrases) {
        getMorePhrases();
      }
    }, 350);
  }

  function getMorePhrases() {
    axios
      .get(
        `https://acu.pythonanywhere.com/paraphrase?num=10&start=${numPhrases}`
      )
      .then((response) => {
        phrases = phrases.concat(response.data.phrases);
        setNumPhrases(phrases.length);
      })
      .catch((error) => console.error(error));
  }

  function getScore(query: string, response: string) {
    setScore(null);
    setIsLoading(true);

    getPredictionUTE({
      queries: [query],
      responses: [response],
    }).then((scores: any) => {
      setIsLoading(false);
      setScore(scores[0]);
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && firstPhrase && value)
      getScore(firstPhrase, value);
  }

  return (
    <>
      <section className="h-full w-2/3 md:w-3/4 flex flex-col p-8 gap-4 bg-neutral-200">
        <h1 className="text-2xl">Paraphrase Game</h1>
        <p>
          Try to paraphrase the original text without plagiarizing or losing the
          original meaning! You can press enter to submit instead of pressing
          the button.
        </p>
        <TextDisplay
          playAnimation={playAnimation}
          firstPhrase={firstPhrase}
          secondPhrase={secondPhrase}
        />
        <div className="h-1/4 w-full flex flex-col p-4 rounded-lg shadow-xl bg-neutral-100">
          <h2 className="text-2xl pb-2">Paraphrase!</h2>
          <div className="w-full flex bg-white rounded-lg overflow-hidden border-2 border-neutral-300">
            <input
              type="text"
              value={value}
              placeholder="Type here"
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              className="w-[calc(100%-2rem)] p-2 focus:outline-none"
            />
            <div
              onClick={() => {
                if (firstPhrase && value) getScore(firstPhrase, value);
              }}
              className="h-8 w-8 flex m-1 justify-center items-center rounded-md bg-primary-color text-white hover:opacity-70 cursor-pointer"
            >
              <IoSend />
            </div>
          </div>
        </div>
        <Button label="Next" onClick={handleClick} disabled={buttonDisabled} small />
      </section>
      <section className="h-full w-1/3 md:w-1/4 flex justify-center items-center bg-neutral-300">
        <ScoreMeter score={score} isCalculating={isLoading} />
      </section>
    </>
  );
};

export default ParaphraseGame;
