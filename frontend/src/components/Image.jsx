import { Image } from "@imagekit/react";

const Imagekit = ({ src, alt, h, w, className, loading }) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={src}
      width={w}
      height={h}
      alt={alt}
      loading={loading} // Use "eager" to load immediately. `lazy` is the default value
      className={className}
    />
  );
};

export default Imagekit;
