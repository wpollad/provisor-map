import { useEffect, useState } from "react";
import { Field, FieldProps } from "../../mini/field/field";
import style from "./map.module.scss";
import { ColorProps } from "../../../type/main";
import clsx from "clsx";

type MapProps = {
  color: ColorProps;
  size: number;
  locations: string[];
  currentColor: string;
  howGo: string;
  isFragment: boolean;
  isGooks?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCoords(messages: any[]): string[] {
  return messages.flatMap((msg) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fullText = msg.text_entities?.map((t: any) => t.text).join("") ?? "";
    const matches = [...fullText.matchAll(/\[([A-Z]+\s*\d+(?:#\d+)?)\]/g)];
    return matches.map((m) => m[1]);
  });
}

export const Map = ({
  color,
  size,
  locations = [],
  currentColor,
  howGo,
  isFragment,
  isGooks = false,
}: MapProps) => {
  const [data, setData] = useState<FieldProps[]>([]);
  const [needLoot, setNeedLoot] = useState<boolean>(false);
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [battleCoords, setBattleCoords] = useState<string[]>([]);

  function getNeighbors(coord: string): string[] {
    const [x, y] = coord.split("#").map(Number);
    const neighbors = [
      `${x}#${y - 1}`, // сверху
      `${x}#${y + 1}`, // снизу
      `${x - 1}#${y}`, // слева
      `${x + 1}#${y}`, // справа
    ];
    return neighbors;
  }

  function filterResourcesByFire(cells: FieldProps[]) {
    const fireCoords = cells
      .filter((cell) => cell.coord === "3#3")
      .map((cell) => cell.coord);

    const fireNeighbors = new Set(
      fireCoords.flatMap((coord) => getNeighbors(coord)),
    );

    return cells.map((cell) => ({
      ...cell,
      resourceAvailable: !fireNeighbors.has(cell.coord),
    }));
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--count-size", size.toString());
  });

  useEffect(() => {
    fetch("https://provisor-map-back.vercel.app/")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = filterResourcesByFire(data);
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      setNeedLoot(true);
    } else {
      setNeedLoot(false);
    }
  }, [locations]);

  useEffect(() => {
    fetch("/raid.json")
      .then((res) => {
        return res.json();
      })
      .then((battleData) => {
        const coords = extractCoords(battleData.messages);
        setBattleCoords(coords);
      })
      .catch((err) => console.error("Error loading battle log:", err));
  }, []);

  return (
    <div className={clsx(style.wrapper, isGooks && style.gooks)}>
      <div className={clsx(style.map, style[color])}>
        {data.length > 0 ? (
          data.map((filed, i) => {
            let cellColor = filed.color;

            const left = (filed.bottomRight + " " + filed.coord).trim();
            const right = battleCoords[0].trim();

            console.log(left === right); // теперь true

            if (isGooks) {
              if (battleCoords.includes(left)) {
                console.log(filed.bottomRight + " " + filed.coord);
                cellColor = "#488097";
              }
            }
            return (
              <Field
                {...filed}
                color={cellColor}
                needLoot={needLoot}
                isCurrent={locations.includes(filed.topLeft)}
                key={i}
                currentColor={currentColor}
                howGo={howGo}
                setText={setText}
                setActive={setActive}
                active={active}
                isFragment={isFragment}
                isGooks={isGooks}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {active && <div className={style.modal}>{text}</div>}
    </div>
  );
};
