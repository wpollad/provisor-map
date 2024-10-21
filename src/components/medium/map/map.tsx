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
};

export const Map = ({
    color,
    size,
    locations = [],
    currentColor,
    howGo,
    isFragment,
}: MapProps) => {
    const [data, setData] = useState<FieldProps[]>([]);
    const [needLoot, setNeedLoot] = useState<boolean>(false);
    const [active, setActive] = useState(false);
    const [text, setText] = useState("");

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
        document.documentElement.style.setProperty(
            "--count-size",
            size.toString(),
        );
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

    return (
        <div className={style.wrapper}>
            <div className={clsx(style.map, style[color])}>
                {data.length > 0 ? (
                    data.map((filed, i) => (
                        <Field
                            {...filed}
                            needLoot={needLoot}
                            isCurrent={locations.includes(filed.topLeft)}
                            key={i}
                            currentColor={currentColor}
                            howGo={howGo}
                            setText={setText}
                            setActive={setActive}
                            active={active}
                            isFragment={isFragment}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {active && <div className={style.modal}>{text}</div>}
        </div>
    );
};
