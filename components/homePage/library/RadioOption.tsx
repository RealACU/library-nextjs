import DynamicIcon from "../DynamicIcon";

interface RadioOptionProps {
  label: string;
  iconName: string;
  selected: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  iconName,
  selected,
}) => {
  return (
    <div
      className={`w-full flex p-2 items-center gap-1 border-l-[3px] transition hover:bg-orange-300/70 cursor-pointer
      ${selected ? "bg-orange-300/70" : ""}
      ${selected ? "border-l-orange-400" : "border-l-white"}
      `}
    >
      <DynamicIcon iconName={iconName} size={26} />
      <p>{label}</p>
    </div>
  );
};

export default RadioOption;
