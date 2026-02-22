import React from "react";
import { FrameTheme, FrameType } from "./FrameType";

type Props = {
    className?: string;
    frameType: FrameType;
    frameTheme: FrameTheme;
    logoImage?: string;
};

const frameStyles: Record<FrameType, string> = {
    circle: "rounded-full",
    square: "rounded-xl",
    none: "rounded-none",
};

const LogoContainer: React.FC<Props> = ({
    className = "",
    frameType,
    frameTheme = "light",
    logoImage,
}) => {
    const frameBase =
        "flex-shrink-0 flex items-center justify-center overflow-hidden transition-all";

    const themeStyles =
        frameType === "none"
            ? ""
            : frameTheme === "dark"
                ? "bg-slate-900 text-white border border-slate-800"
                : "bg-white text-slate-900 border border-slate-200 shadow-sm";

    const sizeStyles =
        frameType === "none"
            ? "w-12 h-12"
            : "w-10 h-10 sm:w-12 sm:h-12";

    return (
        <div
            className={[
                frameBase,
                frameStyles[frameType],
                themeStyles,
                sizeStyles,
                className,
            ].join(" ")}
        >
            {logoImage && (
                <img
                    src={logoImage}
                    alt="Logo"
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default LogoContainer;
