import { useState, useEffect } from "react";
import { Map } from "../../medium/map/map";
import { ColorProps } from "../../../type/main";
import { Colors } from "../../mini/colors/colors";
import { Sizes } from "../../mini/sizes/sizes";
import style from "./full.module.scss";
import { Loots } from "../../mini/loots/loots";
import { LOOT } from "../../../consts/loot";
import { Go } from "../../mini/go/go";
import { Fragments } from "../../mini/fragments/fragments";
import { FRAGMENT } from "../../../consts/fragment";

type FullProps = {
    isFragment?: boolean;
};

export const Full = ({ isFragment = false }: FullProps) => {
    const [color, setColor] = useState<ColorProps>(() => {
        const savedColor = localStorage.getItem("selectedColor");
        return savedColor ? (savedColor as ColorProps) : "yellow";
    });

    const [size, setSize] = useState<number>(7);

    const [locations, setLocations] = useState<string[]>([]);

    const [goo, setGo] = useState<string>("to");

    const handleProductSelect = (productName: string) => {
        const allLocations = [
            ...LOOT.tier1,
            ...LOOT.tier2,
            ...LOOT.tier3,
            ...LOOT.tier4,
        ]
            .filter((item) => item.name === productName)
            .map((item) => item.res);

        setLocations(allLocations);
    };

    const handleFragmentSelect = (fragmentName: string) => {
        const allLocations = FRAGMENT.filter(
            (item) => item.name === fragmentName,
        ).map((item) => item.res);

        setLocations(allLocations);
    };

    useEffect(() => {
        localStorage.setItem("selectedColor", color);
    }, [color]);

    return (
        <div className={style.full}>
            <Map
                color={color}
                size={size}
                locations={locations}
                currentColor={color}
                howGo={goo}
                isFragment={isFragment}
            />
            <div className={style.taps}>
                <Go selectedGo={goo} onGohange={setGo} />
                <Colors selectedColor={color} onColorChange={setColor} />
                {isFragment ? (
                    <Fragments handleProductSelect={handleFragmentSelect} />
                ) : (
                    <Loots handleProductSelect={handleProductSelect} />
                )}
                <Sizes selectedSize={size} onSizeChange={setSize} />
            </div>
        </div>
    );
};
