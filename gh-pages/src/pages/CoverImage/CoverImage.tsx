import React, { JSX } from "react";
import * as style from "./style.css";

export function CoverImage({ src }: { src: string }): JSX.Element {
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
    return <img src={src} alt="coverImage" width="100%" />;
  }
}
