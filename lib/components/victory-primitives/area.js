import React from "react";
import { Path, G } from "react-native-svg";
import { NativeHelpers } from "../../index";
import { Area } from "victory-core/es";

export default class extends Area {

  static defaultProps = {
    groupComponent: <G/>
  };

  // Overrides method in victory-core
  renderArea(path, style, events) {
    const areaStroke = style.stroke ? "none" : style.fill;
    const areaStyle = NativeHelpers.getStyle(Object.assign({}, style, { stroke: areaStroke }));
    const { role, shapeRendering, className, polar, origin } = this.props;
    const transform = polar && origin ? `translate(${origin.x} ${origin.y})` : undefined;
    return (
      <Path
        key={"area"}
        shapeRendering={shapeRendering || "auto"}
        role={role || "presentation"}
        d={path}
        className={className}
        transform={transform}
        {...areaStyle}
        {...events}
      />
    );
  }

  // Overrides method in victory-core
  renderLine(path, style, events) {
    if (!style.stroke || style.stroke === "none" || style.stroke === "transparent") {
      return null;
    }
    const { role, shapeRendering, className, polar, origin } = this.props;
    const lineStyle = NativeHelpers.getStyle(Object.assign({}, style, { fill: "none" }));
    const transform = polar && origin ? `translate(${origin.x} ${origin.y})` : undefined;
    return (
      <Path
        key={"area-stroke"}
        shapeRendering={shapeRendering || "auto"}
        role={role || "presentation"}
        d={path}
        className={className}
        transform={transform}
        {...lineStyle}
        {...events}
      />
    );
  }
}
