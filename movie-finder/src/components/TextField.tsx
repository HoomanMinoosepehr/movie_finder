import { ChangeEvent, useState } from "react";

interface TextFieldProps {
  title: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
}

export default function TextField({
  title,
  type,
  value,
  placeholder,
  onChange,
  onClick,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const containerClass = `flex flex-col gap-2 ${isFocused ? "border-blue-500" : "border-gray-300"} border w-[95%] rounded-md p-2`;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="py-2">
      <div className="text-gray-300 pb-1">{title}</div>
      <div className="flex w-full pl-2">
        <input
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          className={containerClass}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
