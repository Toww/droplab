import { Leva, useControls } from "leva";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import useAppStore from "@stores/useAppStore";

export default function Debug() {
  // States
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  // Hooks
  const location = useLocation();
  const showPerf = useAppStore((state) => state.showPerf);
  const updateShowPerf = useAppStore((state) => state.updateShowPerf);

  // Effects
  useEffect(() => {
    // Checking for debug hash in the URL
    location.hash === "#debug" ? setShowDebug(true) : setShowDebug(false);

    // Preventing a bug in Leva where height of the debug tools
    // can be wrong (https://github.com/pmndrs/leva/issues/456)
    const timeoutID = setTimeout(() => {
      setIsCollapsed(false);
    }, 100);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [location.hash]);

  // Leva
  useControls("Performances", {
    showPerf: {
      value: showPerf,
      onChange: updateShowPerf
    }
  });

  return (
    <Leva
      hidden={!showDebug}
      collapsed={{
        collapsed: isCollapsed,
        onChange: (value) => {
          setIsCollapsed(value);
        }
      }}
    />
  );
}
