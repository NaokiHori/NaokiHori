import React, { JSX } from "react";

export function CoverImage ({src, backgroundColor}: {src: string, backgroundColor: string}): JSX.Element {
  const width: string = '100%'
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      setLoading(false)
    }
    return () => {
      image.onload = null
    }
  }, [width, src])
  if (loading) {
    return (
      <div style={{
        width,
        aspectRatio: '6',
        backgroundColor,
      }}
      />
    )
  } else {
    return (
      <img
        src={src}
        alt='coverImage'
        width={width}
      />
    )
  }
}

