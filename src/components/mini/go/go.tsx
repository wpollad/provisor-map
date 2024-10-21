import { useState, FC } from "react";
import style from "./go.module.scss";

interface GoProps {
    selectedGo: string;
    onGohange: (go: string) => void;
}

export const Go: FC<GoProps> = ({ selectedGo, onGohange }) => {
    const [go, setGo] = useState<string>(selectedGo);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGo = e.target.value as string;
        setGo(newGo);
        onGohange(newGo);
    };

    return (
        <form className={style.go}>
            <label>go: </label>
            <select value={go} onChange={handleChange}>
                <option value="direct">direct</option>
                <option value="to">to</option>
            </select>
        </form>
    );
};
