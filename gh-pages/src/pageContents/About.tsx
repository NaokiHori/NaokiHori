import { JSX } from "react";
import * as style from "./about.css";

export function About(): JSX.Element {
  const sentences: string[] = [
    "Modeling and simulating various phenomena using computational methods.",
    "Coding enthusiast (C, Rust, Python, TypeScript, among others) striving for direct, transparent, elegant, and efficient solutions.",
    "Fan of CFD: 'Colorful Fluid Dynamics' - or Computational Fluid Dynamics.",
  ];
  return (
    <div className={style.sentences}>
      {sentences.map((sentence: string, key: number) => (
        <div key={key} className={style.sentence}>
          {sentence}
        </div>
      ))}
    </div>
  );
}
