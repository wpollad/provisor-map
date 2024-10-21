import { FC } from "react";
import style from "./fragments.module.scss";
import { FRAGMENT } from "../../../consts/fragment";

interface FragmentsProps {
    handleProductSelect: (productName: string) => void;
}

export const Fragments: FC<FragmentsProps> = ({ handleProductSelect }) => {
    return (
        <form className={style.fragments}>
            <label>fragment: </label>
            <select onChange={(e) => handleProductSelect(e.target.value)}>
                <option value="">-- choose --</option>
                {/* [...new Set(FRAGMENT.map((item) => item.name))] */}
                {[...new Set(FRAGMENT.map((item) => item.name))].map(
                    (name, index) => (
                        <option key={`fragment-${index}`} value={name}>
                            {name}
                        </option>
                    ),
                )}
            </select>
        </form>
    );
};
