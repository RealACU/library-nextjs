interface TextDisplayProps {
  playAnimation: boolean;
  firstPhrase: string;
  secondPhrase: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  playAnimation,
  firstPhrase,
  secondPhrase,
}) => {
  return (
    <div className="h-2/5 w-full flex flex-col p-4 rounded-lg shadow-xl bg-neutral-100">
      <h2 className="text-2xl pb-2">Original Text</h2>
      <div className="h-full w-full flex overflow-hidden">
        <div className="h-full w-full p-4 relative bg-white border-2 border-neutral-300 rounded-lg flex-none">
          {firstPhrase}
        </div>
        <div
          className={`h-full w-full p-4 relative bg-white border-2 border-neutral-300 rounded-lg flex-none z-10 transition ease-out ${
            playAnimation ? "slide-left" : ""
          }`}
        >
          {secondPhrase}
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;
