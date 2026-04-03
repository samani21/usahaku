import { TemaFive } from "./TemaFive";
import { TemaFour } from "./TemaFour";
import { TemaOne } from "./TemaOne"
import { TemaThree } from "./TemaThree";
import { TemaTwo } from "./TemaTwo";

export const ThemePreview = (tema: number) => {
    switch (tema) {
        case 1:
            return TemaOne;
        case 2:
            return TemaTwo;
        case 3:
            return TemaThree;
        case 4:
            return TemaFour;
        case 5:
            return TemaFive;
        default:
            return null
    }
}