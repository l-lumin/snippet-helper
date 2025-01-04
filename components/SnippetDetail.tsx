"use client";

import { Snippet } from "@/models/snippet";
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="relative mb-6 p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-sm text-gray-800">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Copy
        </button>
        <pre className="overflow-auto">
          <code className="whitespace-pre-wrap text-gray-700">
            {renderSnippet()}
          </code>
        </pre>
      </div>

      <form className="space-y-6">
        {placeholders.map((placeholder) => (
          <div key={placeholder} className="flex flex-col">
            <label
              htmlFor={placeholder}
              className="mb-2 text-sm font-medium text-gray-700"
            >
              {placeholder}
            </label>
            <textarea
              id={placeholder}
              name={placeholder}
              value={values[placeholder]}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
