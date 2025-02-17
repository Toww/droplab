import { Leva } from "leva";
import { useState, useEffect } from "react";

export default function Debug() {
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
    }, 0);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [window.location.hash]);

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
