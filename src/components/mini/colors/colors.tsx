import { useState, FC } from "react";
import { ColorProps } from "../../../type/main";
import style from "./color.module.scss";

interface ColorsProps {
    selectedColor: ColorProps;
    onColorChange: (color: ColorProps) => void;
}

export const Colors: FC<ColorsProps> = ({ selectedColor, onColorChange }) => {
    const [color, setColor] = useState<ColorProps>(selectedColor);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColor = e.target.value as ColorProps;
        setColor(newColor);
        onColorChange(newColor);
    };

    return (
        <form className={style.colors}>
            <label>color: </label>
            <select value={color} onChange={handleChange}>
                <option value="yellow">yellow</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="red">red</option>
            </select>
        </form>
    );
};
