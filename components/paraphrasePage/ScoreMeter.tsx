"use client";

import { BiSolidLeftArrow } from "react-icons/bi";
import { ClipLoader } from "react-spinners";

interface ScoreMeterProps {
  score: number | null;
  isCalculating: boolean;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ score, isCalculating }) => {
  const percentage = findPercentage(score);

  function findPercentage(score: number | null) {
    if (!score) {
      return 50;
    }

    const old_min = 15;
    const old_max = 27;
    const new_min = 2;
    const new_max = 98;
    const percentage = Math.round(
      ((score - old_min) * (new_max - new_min)) / (old_max - old_min) + new_min
    );

    // These if statements are a fallback if score is beyond the expected minimum or maximum
    if (percentage > new_max) {
      return new_max;
    }

    if (percentage < new_min) {
      return new_min;
    }

    return percentage;
  }

  function findResult(percentage: number) {
    if (percentage > 80) {
      return "Plagiarism";
    }
    if (percentage > 60) {
      return "A+";
    }
    if (percentage > 40) {
      return "Original meaning lost";
    }
    if (percentage > 20) {
      return "F-";
    }

    return "Are you even trying?";
  }

  return (
    <div className="h-5/6 w-5/6 p-4 rounded-lg shadow-xl bg-neutral-200">
      <h6 className="text-2xl pb-2">Similarity</h6>
      <div className="h-3/4 w-full flex flex-col relative">
        <div className="h-full w-8 rounded-full flex flex-col overflow-hidden">
          <div className="h-1/5 w-full bg-red-400"></div>
          <div className="h-1/5 w-full bg-green-400"></div>
          <div className="h-1/5 w-full bg-yellow-400"></div>
          <div className="h-1/5 w-full bg-orange-400"></div>
          <div className="h-1/5 w-full bg-red-400"></div>
        </div>
        <div
          className="h-8 flex justify-center items-center absolute left-6"
          style={{ bottom: `calc(${percentage}% - 1rem)` }}
        >
          <BiSolidLeftArrow size={24} />
          <p className="relative top-[0.2rem] flex animate-bounce">
            {score
              ? score.toFixed(3)
              : isCalculating
              ? "Predicting..."
              : "Awaiting response..."}
            {isCalculating && (
              <ClipLoader size={20} color="black" className="animate-spin pl-2" />
            )}
          </p>
        </div>
      </div>
      <div className="h-1/4">
        <p className="text-xl pt-2">Result:</p>
        <p className="font-bold animate-pulse">
          {score && findResult(percentage)}
        </p>
      </div>
    </div>
  );
};

export default ScoreMeter;
