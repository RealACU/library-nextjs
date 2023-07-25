import ParaphraseGame from "@/components/paraphrasePage/ParaphraseGame";
import axios from "axios";

export default async function Paraphrase() {
  const status = await axios.get("https://acu.pythonanywhere.com/status");

  if (status.data.status !== 200) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="text-9xl font-extrabold">
          Sorry, looks like this feature is not available right now.
        </h1>
      </div>
    );
  }

  const numPhrases = 20;
  const response = await axios.get(
    `https://acu.pythonanywhere.com/paraphrase?num=${numPhrases}&start=0`
  );

  return (
    <div className="h-full flex">
      <ParaphraseGame phrases={JSON.parse(response.data.phrases)} />
    </div>
  );
}
