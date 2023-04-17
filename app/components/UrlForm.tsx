import { useState } from "react";
import { Form, useTransition } from "remix";

export type UrlFormProps = {
  className?: string;
};

export function UrlForm({ className }: UrlFormProps) {
  const transition = useTransition();
  const [inputValue, setInputValue] = useState("");

  const isNotIdle = transition.state !== "idle";
  const isButtonDisabled = !inputValue.length || isNotIdle;

  return (
    <Form
      method="post"
      action="/actions/createFromUrl"
      className={`${className}`}
    >
      <div className="flex">
        <input
          type="text"
          name="jsonUrl"
          id="jsonUrl"
          className="block flex-grow text-base text-slate-200 placeholder:text-slate-300 bg-slate-900/40 border border-slate-600 rounded-l-sm py-2 px-3 transition duration-300 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter a JSON URL or paste in JSON here..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          type="submit"
          value="Go"
          className={`inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-r-sm text-white bg-lime-500 transition hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 ${
            isButtonDisabled && "disabled:opacity-50 disabled:hover:bg-lime-500"
          }`}
          disabled={isButtonDisabled}
        >
          {isNotIdle ? "..." : "Go"}
        </button>
      </div>
    </Form>
  );
}
