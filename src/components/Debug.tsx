import { Leva, useControls } from "leva";
import { useState, useEffect } from "react";

type TProps = {
  setShowPerf: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Debug({ setShowPerf }: TProps) {
  // States
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  // Effects
  useEffect(() => {
    // Checking for debug hash in the URL
    window.location.hash === "#debug"
      ? setShowDebug(true)
      : setShowDebug(false);

    // Preventing a bug in Leva where height of the debug tools
    // can be wrong (https://github.com/pmndrs/leva/issues/456)
    const timeoutID = setTimeout(() => {
      setIsCollapsed(false);
    }, 100);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [window.location.hash]);

  // Leva
  useControls("Performances", {
    showPerf: {
      value: false,
      onChange: (value) => setShowPerf(value),
    },
  });

  return (
    <Leva
      hidden={!showDebug}
      collapsed={{
        collapsed: isCollapsed,
        onChange: (value) => {
          setIsCollapsed(value);
        },
      }}
    />
  );
}
