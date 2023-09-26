import clsx from "clsx"
import useWindowDimensions from "hooks/useWindowDimension"

interface iMask {
    color: "white" | "black" | "dark" | "default" | "primary" | "highlight"
}

const Mask = ({ color = "dark" }: iMask) => {
    const { width = 766, height = 100 } = useWindowDimensions()

    const maskColor = {
        dark: "fill-dark",
        white: "fill-white",
        black: "fill-black",
        primary: "fill-primary",
        highlight: "fill-highlight",
        default: "fill-dark",
    }

    return (
        <div className="absolute inset-0 pointer-events-none overflow-clip">
            <svg
                //   id="visual"
                viewBox={`0 0 ${width} ${height}`}
                //   width="900"
                //   height="600"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                className={clsx("", maskColor[color])}
                id="visual"
            >
                <g transform={`translate(${width}, 0)`}>
                    <path
                        d="M0 378.6C-29.3 374.6 -58.7 370.6 -81.2 355.8C-103.8 341.1 -119.6 315.6 -148 307.2C-176.3 298.8 -217.2 307.5 -228.2 286.2C-239.2 264.8 -220.2 213.3 -240.8 192C-261.4 170.8 -321.5 179.7 -341.1 164.3C-360.7 148.8 -339.8 108.9 -339.3 77.4C-338.8 46 -358.7 23 -378.6 0L0 0Z"
                        //   fill="#FBAE3C"
                    ></path>
                </g>
                <g transform={`translate(0, ${height})`}>
                    <path
                        d="M0 -378.6C24.5 -353.1 49 -327.7 70.8 -310C92.5 -292.3 111.6 -282.4 131.5 -273C151.4 -263.6 172.1 -254.7 194.5 -243.9C216.9 -233.2 240.9 -220.6 252.5 -201.4C264.1 -182.1 263.3 -156.2 284.7 -137.1C306.1 -118.1 349.7 -105.9 369.1 -84.2C388.4 -62.5 383.5 -31.3 378.6 0L0 0Z"
                        //   fill="#FBAE3C"
                    ></path>
                </g>
            </svg>
        </div>
    )
}

export default Mask
