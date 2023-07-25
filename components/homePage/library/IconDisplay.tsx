import DynamicIcon from "../DynamicIcon";

interface IconDisplayProps {
  iconName: string;
  selected?: boolean;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ iconName, selected }) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center gap-2 pt-2 border-b-[3px] transition hover:bg-orange-300/70 cursor-pointer
      ${selected ? "bg-orange-300/70" : ""}
      ${selected ? "border-b-orange-400" : "border-b-white"}
      `}
    >
      <DynamicIcon iconName={iconName} size={26} />
      <p className="text-xs">{iconName}</p>
    </div>
  );
};

export default IconDisplay;
