/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

type SearchFieldProps = {
  searchExpresion: string;
  onExpresionChange: (expresion: string) => void;
};
export const SearchField = ({
  searchExpresion,
  onExpresionChange,
}: SearchFieldProps) => {
  const [text, setText] = useState(searchExpresion);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onExpresionChange(text);
    }
  };

  return (
    <div className="bg-primary-content px-4 py-2 rounded">
      <div className="mb-2">
        <span className="text font-bold mr-2 text-lg">Insert:</span>
        {[
          ["New Word", ' " "'],
          ["Patentheses", " ( )"],
          ["AND", " and"],
          ["OR", " or"],
          ["NOT", " not"],
        ].map(([lable, operator]) => {
          return (
            <button
              className="btn- px-2 py-1  font-semibold rounded btn-secondary btn-outline"
              onClick={() => setText(text + operator)}
            >
              {lable}
            </button>
          );
        })}
      </div>
      <div className="relative flex gap-4 items-start">
        <textarea
          value={text}
          placeholder='Write boolean expresion of words e.g. "کلمه۱" and "کلمه۱" or "کلمه۳" '
          className="focus:outline-primary flex-1 rounded-lg py-2 px-4 resize-none"
          onChange={(e) => {
            if (e.target.value === "\n") return;
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-primary"
          onClick={() => onExpresionChange(text)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
