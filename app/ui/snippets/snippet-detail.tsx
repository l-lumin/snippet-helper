"use client";

import { Snippet } from "@/app/models/snippet";
import { useState } from "react";

export default function SnippetsDetail(snippet: Snippet) {
  const placeholderRegex = /\{([^}]+)\}/g;

  const placeholders = [...snippet.content.matchAll(placeholderRegex)].map(
    (match) => match[1]
  );

  const [values, setValues] = useState<Record<string, string>>(
    placeholders.reduce(
      (acc, placeholder) => ({ ...acc, [placeholder]: "" }),
      {} as Record<string, string>
    )
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderSnippet = () => {
    return snippet.content.replace(
      placeholderRegex,
      (_, key) => values[key] || `{${key}}`
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(renderSnippet());
  };

  return (
    <div>
      <button onClick={handleCopy} className="btn">
        Copy
      </button>
      <article className="prose">
        <pre>{renderSnippet()}</pre>
      </article>

      <form>
        {placeholders.map((placeholder) => (
          <div key={placeholder}>
            <label htmlFor={placeholder}>{placeholder}</label>
            <textarea
              id={placeholder}
              name={placeholder}
              value={values[placeholder]}
              onChange={handleChange}
              className="textarea"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
