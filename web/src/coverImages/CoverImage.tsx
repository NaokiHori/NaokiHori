import React, { JSX } from "react";
import * as style from "./style.css";

export function CoverImage({ src, href }: { src: string; href: string }): JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const loadEvent = (): void => setLoading(false);
    const image = new Image();
    image.addEventListener("load", loadEvent);
    image.src = src;
    return (): void => {
      image.removeEventListener("load", loadEvent);
      image.src = "";
    };
  }, [src]);
  if (loading) {
    return <div className={style.placeholder} />;
  } else {
    return (
      <div className={style.container}>
        <a className={style.anchor} href={href}>
          <img className={style.image} src={src} alt="coverImage" />
        </a>
      </div>
    );
  }
}
