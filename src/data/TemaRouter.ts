import { TemaOne } from "./TemaOne"
import { TemaTwo } from "./TemaTwo";

export const ThemePreview = (tema: number) => {
    switch (tema) {
        case 1:
            return TemaOne;
        case 2:
            return TemaTwo;
        default:
            return null
    }
}