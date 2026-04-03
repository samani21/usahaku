import { TemaFive } from "./TemaFive";
import { TemaFour } from "./TemaFour";
import { TemaOne } from "./TemaOne"
import { TemaSevent } from "./TemaSevent";
import { TemaThree } from "./TemaThree";
import { TemaTwo } from "./TemaTwo";
import { TemaSix } from "./TemSix";

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
        case 6:
            return TemaSix;
        case 7:
            return TemaSevent;
        default:
            return null
    }
}