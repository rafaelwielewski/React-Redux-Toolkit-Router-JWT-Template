import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectHistory } from "./historySlice";

export function History() {
  const history = useAppSelector(selectHistory);
  console.log(history);

  return (
    <div>
      {history.map((history, index) => (
        <p key={index}>{history}</p>
      ))}
    </div>
  );
}
