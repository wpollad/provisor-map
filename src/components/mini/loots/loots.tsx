import { FC } from "react";
import { LOOT } from "../../../consts/loot";
import style from "./loots.module.scss";

interface LootsProps {
    handleProductSelect: (productName: string) => void;
}

export const Loots: FC<LootsProps> = ({ handleProductSelect }) => {
    return (
        <form className={style.loots}>
            <label>loot: </label>
            <select onChange={(e) => handleProductSelect(e.target.value)}>
                <option value="">-- choose --</option>
                <optgroup label="--- Tier 1 ---">
                    {[...new Set(LOOT.tier1.map((item) => item.name))].map(
                        (name, index) => (
                            <option key={`tier1-${index}`} value={name}>
                                {name}
                            </option>
                        ),
                    )}
                </optgroup>
                <optgroup label="--- Tier 2 ---">
                    {[...new Set(LOOT.tier2.map((item) => item.name))].map(
                        (name, index) => (
                            <option key={`tier1-${index}`} value={name}>
                                {name}
                            </option>
                        ),
                    )}
                </optgroup>
                <optgroup label="--- Tier 3 ---">
                    {[...new Set(LOOT.tier3.map((item) => item.name))].map(
                        (name, index) => (
                            <option key={`tier1-${index}`} value={name}>
                                {name}
                            </option>
                        ),
                    )}
                </optgroup>
                <optgroup label="--- Tier 4 ---">
                    {[...new Set(LOOT.tier4.map((item) => item.name))].map(
                        (name, index) => (
                            <option key={`tier1-${index}`} value={name}>
                                {name}
                            </option>
                        ),
                    )}
                </optgroup>
            </select>
        </form>
    );
};
