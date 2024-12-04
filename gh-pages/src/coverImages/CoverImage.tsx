import React, { JSX } from "react";
import * as style from "./style.css";

export function CoverImage({
  src,
  href,
}: {
  src: string;
  href: string;
}): JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoading(false);
    };
    image.src = src;
    return () => {
      image.onload = null;
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
