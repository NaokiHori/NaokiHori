import { JSX } from "react";
import { Heading1 } from "../../components/Heading/Heading";
import { CoverImage } from "../CoverImage/CoverImage";
import coverImageSrc from "./three-phase.png";
import * as style from "./style.css";

interface ContactInfo {
  href: string;
  label: string;
  src: string;
}

function Element({ contactInfo }: { contactInfo: ContactInfo }): JSX.Element {
  return (
    <div className={style.element}>
      <a href={contactInfo.href} target="_blank" rel="noreferrer">
        <img src={contactInfo.src} alt={contactInfo.label} height="96em" />
      </a>
    </div>
  );
}

export function Contact(): JSX.Element {
  const contactInfoList: ContactInfo[] = [
    {
      href: "https://github.com/NaokiHori",
      label: "GitHub",
      src: "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/logo/GitHub.svg",
    },
    {
      href: "https://gitlab.com/NaokiHori",
      label: "GitLab",
      src: "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/logo/GitLab.svg",
    },
    {
      href: "https://www.youtube.com/@NaokiHori",
      label: "YouTube",
      src: "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/logo/YouTube.svg",
    },
    {
      href: "https://www.linkedin.com/in/naoki-hori-b559032a1/",
      label: "Linkedin",
      src: "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/logo/LinkedIn.png",
    },
    {
      href: "https://qiita.com/NaokiHori",
      label: "Qiita",
      src: "https://raw.githubusercontent.com/NaokiHori/NaokiHori/main/logo/Qiita.png",
    },
  ];
  return (
    <>
      <CoverImage src={coverImageSrc} />
      <Heading1>Contact</Heading1>
      <div className={style.container}>
        {contactInfoList.map((contactInfo: ContactInfo, index: number) => (
          <Element key={index} contactInfo={contactInfo} />
        ))}
      </div>
    </>
  );
}
