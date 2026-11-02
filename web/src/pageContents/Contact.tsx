import { JSX } from "react";
import * as style from "./contact.css";
import gitHubLogoSource from "./contact/GitHub.svg";
import gitLabLogoSource from "./contact/GitLab.svg";
import youTubeLogoSource from "./contact/YouTube.svg";
import linkedInLogoSource from "./contact/LinkedIn.png";
import qiitaLogoSource from "./contact/Qiita.png";

interface ContactInfo {
  href: string;
  label: string;
  src: string;
}

function ContactInfo({ contactInfo }: { contactInfo: ContactInfo }): JSX.Element {
  return (
    <div className={style.contactInfo}>
      <a className={style.anchor} href={contactInfo.href} target="_blank" rel="noreferrer">
        <img className={style.image} src={contactInfo.src} alt={contactInfo.label} />
      </a>
    </div>
  );
}

export function Contact(): JSX.Element {
  const contactInfoList: ContactInfo[] = [
    {
      href: "https://github.com/NaokiHori",
      label: "GitHub",
      src: gitHubLogoSource,
    },
    {
      href: "https://gitlab.com/NaokiHori",
      label: "GitLab",
      src: gitLabLogoSource,
    },
    {
      href: "https://www.youtube.com/@NaokiHori",
      label: "YouTube",
      src: youTubeLogoSource,
    },
    {
      href: "https://www.linkedin.com/in/naoki-hori-b559032a1/",
      label: "LinkedIn",
      src: linkedInLogoSource,
    },
    {
      href: "https://qiita.com/NaokiHori",
      label: "Qiita",
      src: qiitaLogoSource,
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
