import React from "react";
import ReactPlayer from "react-player";

const Trailer = ({ src }) => {
  return (
    <ReactPlayer
      src={src}
      controls={false}
      className="mx-auto max-w-full"
      width="960px"
      height="540px"
    />
  );
};

export default Trailer;
