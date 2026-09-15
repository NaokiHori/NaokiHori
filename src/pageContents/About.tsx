import React, { JSX } from "react";
import * as style from "./about.css";
import { Model as ModelIcon } from "../icons/Model";
import { Programming as ProgrammingIcon } from "../icons/Programming";
import { Mesh as MeshIcon } from "../icons/Mesh";

interface AboutItem {
  Icon: React.NamedExoticComponent<object>;
  title: string;
  sentence: string;
}

function AboutCard({ item }: { item: AboutItem }): JSX.Element {
  const Icon = item.Icon;
  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.iconWrapper}>
          <Icon />
        </div>
        <div className={style.title}>{item.title}</div>
      </div>
      <div className={style.text}>{item.sentence}</div>
    </div>
  );
}

export function About(): JSX.Element {
  const items: AboutItem[] = [
    {
      Icon: ModelIcon,
      title: "Modeling & Simulation",
      sentence:
        "I studied fluid dynamics for a while: mechanical engineering for my bachelor's and master's degrees, then applied physics for my PhD. During this time, I became interested not only in the physics itself, but also in how to write the programs that simulate it. Now I try to bring the same way of thinking to other kinds of modeling problems too.",
    },
    {
      Icon: ProgrammingIcon,
      title: "Coding",
      sentence:
        "Although I started writing code as a tool to solve equations, I slowly became interested in coding itself. Later I moved from research to software engineering, so now I also work with different languages and tools. I still like C and Rust the most, and I try to keep my code simple and transparent (a habit I picked up while writing numerical simulations).",
    },
    {
      Icon: MeshIcon,
      title: "CFD",
      sentence:
        "Many of my personal projects are Navier-Stokes solvers with different extensions: single-phase, immersed boundary, volume-of-fluid, spectral, and so on. I like publishing them properly (documented, validated, and usually parallelized) as solid CFD (computational fluid dynamics) tools rather than leaving them as one-off scripts. At the same time I enjoy creating nice pictures and movies: CFD (colorful fluid dynamics).",
    },
  ];
  return (
    <div className={style.sentences}>
      {items.map((item: AboutItem, key: number) => (
        <AboutCard key={key} item={item} />
      ))}
    </div>
  );
}
