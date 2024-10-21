import { FC } from "react";
import style from "./sizes.module.scss";

interface SizesProps {
    selectedSize: number;
    onSizeChange: (size: number) => void;
}

export const Sizes: FC<SizesProps> = ({ selectedSize, onSizeChange }) => {
    const handlePlus = () => {
        if (selectedSize < 15) {
            onSizeChange(selectedSize + 1);
        }
    };

    const handleMinus = () => {
        if (selectedSize > 1) {
            onSizeChange(selectedSize - 1);
        }
    };

    return (
        <div className={style.sizes}>
            <p>size:</p>
            <button onClick={handleMinus}>+</button>
            <button onClick={handlePlus}>-</button>
        </div>
    );
};
