import { useEffect, useState } from "react";

export type UseAsyncLoaderProps = {
  cb: () => Promise<void>;
  dependencies?: unknown[];
};

export default function useAsyncLoader({
  cb,
  dependencies = [],
}: UseAsyncLoaderProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    cb().then(() => {
      setLoaded(true);
    });
  }, dependencies);

  return loaded;
}
