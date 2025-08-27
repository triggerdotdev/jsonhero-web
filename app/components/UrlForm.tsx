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
      <div className="flex flex-col space-y-3">
        <textarea
          name="jsonUrl"
          id="jsonUrl"
          rows={8}
          className="block w-full text-base text-slate-200 placeholder:text-slate-300 bg-slate-900/40 border border-slate-600 rounded-sm py-3 px-4 transition duration-300 focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[200px] font-mono text-sm"
          placeholder="Enter a JSON URL or paste in JSON here..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            value="Go"
            className={`inline-flex items-center justify-center px-6 py-2 border border-transparent font-medium rounded-sm text-white bg-lime-500 transition hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 ${
              isButtonDisabled && "disabled:opacity-50 disabled:hover:bg-lime-500"
            }`}
            disabled={isButtonDisabled}
          >
            {isNotIdle ? "..." : "Go"}
          </button>
        </div>
      </div>
    </Form>
  );
}
