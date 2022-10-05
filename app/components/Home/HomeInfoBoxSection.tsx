import React, { useEffect, useRef, useState } from "react";
import { JsonProvider } from "~/hooks/useJson";
import { JsonColumnViewProvider, useJsonColumnViewAPI, } from "~/hooks/useJsonColumnView";
import { JsonDocProvider } from "~/hooks/useJsonDoc";
import { JsonPreview } from "../JsonPreview";
import { PreviewValue } from "../Preview/PreviewValue";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";
import { PropertiesValue } from "../Properties/PropertiesValue";
import { HomeSection } from "./HomeSection";

const json = {
  id: "a1c33bd1-0528-4de3-a745-44d95e7ac3d8",
  title: "JSON Hero is a tool for JSON",
  thumbnail: "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy-downsized.gif",
  createdAt: "2022-02-01T02:25:41-05:00",
  tint: "#EAB308",
  webpages: "https://www.theonion.com/",
  youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  json: "bourne",
};

const infoBoxData = [
  {
    title: "Images",
    highlight: "$.thumbnail",
  },
  {
    title: "Dates",
    highlight: "$.createdAt",
  },
  {
    title: "Colors",
    highlight: "$.tint",
  },
  {
    title: "URLs",
    highlight: "$.webpages",
  },
  {
    title: "Videos",
    highlight: "$.youtube",
  },
];

const autoplayDuration = 3000;

export function HomeInfoBoxSection() {
  return (
    <SampleJSONPreview initialSelection={infoBoxData[0].highlight}>
      <HomeInfoBoxSectionContent/>
    </SampleJSONPreview>
  );
}

function HomeInfoBoxSectionContent() {
  const [index, setIndex] = useState(0);
  const api = useJsonColumnViewAPI();
  const interval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    const selectedPath = infoBoxData[index].highlight;
    api.goToNodeId(selectedPath, "home");
  }, [index]);

  const resetInterval = () => {
    if (interval.current != null) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setIndex((i) => (i = (i + 1) % infoBoxData.length));
    }, autoplayDuration);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (interval.current == null) return;
      clearInterval(interval.current);
    };
  }, []);

  return (
    <HomeSection containerClassName="bg-black p-6">
      <div className="md:pr-4 lg:pr-10 flex flex-col w-full md:w-1/2">
        <ExtraLargeTitle className="text-white mb-4">
          <span className=" text-lime-300">{infoBoxData[index].title}</span> are
          more than just strings
        </ExtraLargeTitle>
        <SmallSubtitle className="text-slate-400 mb-10">
          We figure out what your strings are made of, so you don't have to.
        </SmallSubtitle>
        <ul className="flex w-full text-slate-300 mb-3">
          {infoBoxData.map((value, i) => {
            return (
              <li
                key={value.highlight}
                onClick={() => {
                  resetInterval();
                  setIndex(i);
                }}
                className={`flex flex-grow justify-center px-4 py-2 cursor-pointer border-b-2 ${
                  index === i
                    ? "text-white border-lime-500"
                    : "border-slate-600"
                }`}
              >
                {value.title}
              </li>
            );
          })}
        </ul>
        <div className="w-full">
          <JsonPreview
            json={json}
            highlightPath={infoBoxData[index].highlight}
          />
        </div>
      </div>
      <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center py-5">
        <div className="pointer-events-none absolute z-10 bottom-0 w-full h-[200px] bg-gradient-to-t from-slate-900 to-transparent mb-5"></div>
        <div className="pointer-events-auto min-w-full max-w-full p-4 rounded-sm bg-slate-900 h-[65vh] overflow-y-auto custom-scrollbar">
          <div className="pointer-events-none">
            <div className="mb-4">
              <PreviewValue/>
            </div>
            <PropertiesValue/>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

function SampleJSONPreview({
  children,
  initialSelection,
}: {
  children: React.ReactNode;
  initialSelection: string;
}) {
  return (
    <JsonDocProvider
      doc={{
        id: "sample",
        title: "Sample",
        type: "raw",
        readOnly: false,
        contents: "",
      }}
      path={initialSelection}
    >
      <JsonProvider initialJson={json}>
        <JsonColumnViewProvider>{children}</JsonColumnViewProvider>
      </JsonProvider>
    </JsonDocProvider>
  );
}
