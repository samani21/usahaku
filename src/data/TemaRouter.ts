import { TemaEight } from "./TemaEight";
import { TemaFive } from "./TemaFive";
import { TemaFour } from "./TemaFour";
import { TemaNine } from "./TemaNine";
import { TemaOne } from "./TemaOne"
import { TemaSevent } from "./TemaSevent";
import { TemaThree } from "./TemaThree";
import { TemaTwo } from "./TemaTwo";
import { TemaElevent } from "./TemeElevent";
import { TemaTen } from "./TemeTen";
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
        case 8:
            return TemaEight;
        case 9:
            return TemaNine;
        case 10:
            return TemaTen;
        case 11:
            return TemaElevent;
        default:
            return null
    }
}