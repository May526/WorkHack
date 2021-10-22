import React from "react";

export default function HelpLink(props: {
  question: string;
  hyref: string;
  titleName: string;
}) {
  const { question, hyref, titleName } = props;
  return (
    <div style={{ fontSize: "smaller" }}>
      <a href={hyref} target="_blank" rel="noreferrer" title={titleName}>
        {question}?
      </a>
    </div>
  );
}
