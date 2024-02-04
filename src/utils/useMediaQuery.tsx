import React from "react";

export function useMediaQuery(query: string) {
    const [matches, setMatches] = React.useState(false);
  
    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
  
      const listener = () => {
        setMatches(media.matches);
      };
  
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", listener);
      } else {
        media.addListener(listener);
      }
  
      return () => {
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", listener);
        }
      };
    }, [matches, query]);
  
    return matches;
  }