import { drag, zoom } from "d3";
import { GlobeState } from "../types";

const panningSensitivity = 58;

export const handleDrag = (
  setState: React.Dispatch<React.SetStateAction<GlobeState>>
) =>
  drag().on("drag", (event) => {
    setState((prevState) => {
      const k = panningSensitivity / prevState.scale;
      return {
        ...prevState,
        rotation: [
          prevState.rotation[0] + event.dx * k,
          prevState.rotation[1] - event.dy * k,
          prevState.rotation[2],
        ],
      };
    });
  });

export const handleZoom = (
  setState: React.Dispatch<React.SetStateAction<GlobeState>>
) =>
  zoom().on("zoom", ({ transform: { k } }) => {
    setState((prevState) => ({
      ...prevState,
      scale: prevState.initialScale * k,
    }));
  });
