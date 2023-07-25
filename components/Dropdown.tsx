interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  return (
    <section className="relative">
      <p className="peer">{label}</p>
      <ul className="absolute flex flex-col top-6 -right-1 invisible peer-hover:visible hover:visible py-4 gap-2 rounded-lg shadow-xl bg-white">
        {children}
      </ul>
    </section>
  );
};

export default Dropdown;
