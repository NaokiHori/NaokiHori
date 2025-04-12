import { JSX } from "react";
import * as style from "./contact.css";

interface ContactInfo {
  href: string;
  label: string;
  src: string;
}

function ContactInfo({
  contactInfo,
}: {
  contactInfo: ContactInfo;
}): JSX.Element {
  return (
    <div className={style.contactInfo}>
      <a
        className={style.anchor}
        href={contactInfo.href}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={style.image}
          src={contactInfo.src}
          alt={contactInfo.label}
        />
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
    <div className={style.contactInfoList}>
      {contactInfoList.map((contactInfo: ContactInfo, key: number) => (
        <ContactInfo key={key} contactInfo={contactInfo} />
      ))}
    </div>
  );
}
