import clsx from "clsx";
import style from "./field.module.scss";
import { COLORMAP } from "../../../consts/colorMap";

export type FieldProps = {
  coord: string;
  color: string;
  topLeft: string;
  bottomLeft: string;
  bottomRight: string;
  main: string;
  needLoot?: boolean;
  isCurrent?: boolean;
  currentColor: string;
  howGo: string;
  active: boolean;
  setText: (s: string) => void;
  setActive: (b: boolean) => void;
  resourceAvailable: boolean;
  isFragment: boolean;
  isGooks?: boolean;
};

export const Field = ({
  coord,
  color,
  topLeft,
  bottomLeft,
  bottomRight,
  main,
  needLoot,
  isCurrent,
  currentColor,
  howGo,
  setText,
  setActive,
  active,
  resourceAvailable,
  isFragment,
  isGooks = false,
}: FieldProps) => {
  const handleClick = (coord: string) => {
    const needBottom = howGo === "to" ? "" : "_";
    const needWhite =
      bottomRight.toLowerCase().trim().length > 1 ? "" : "_" + coord[2];
    const needCenter =
      bottomRight.toLowerCase().trim() === ""
        ? ""
        : "_" + bottomRight.toLowerCase().trim();
    const str =
      "/go" + needBottom + howGo + needCenter + "_" + coord[0] + needWhite;
    navigator.clipboard.writeText(str);
    setText(str);
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1500);
  };

  return (
    <div
      className={clsx(
        style.mapCell,
        isGooks && style.gooks,
        active && style.notActive,
        needLoot && style.needLoot,
        isCurrent && (isFragment ? resourceAvailable : true) && style.isCurrent,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        COLORMAP[currentColor] === color && style.isSelected,
      )}
      onClick={() => handleClick(coord)}
      style={{ backgroundColor: color }}
    >
      <div className={clsx(style.topLeft, style.angle)}>{topLeft}</div>
      <div className={clsx(style.topRight, style.angle)}>{coord}</div>
      <div className={clsx(style.bottomLeft, style.angle)}>{bottomLeft}</div>
      <div className={clsx(style.bottomRight, style.angle)}>{bottomRight}</div>
      {main}
    </div>
  );
};
