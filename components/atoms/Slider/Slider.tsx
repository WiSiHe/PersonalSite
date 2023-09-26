import { ChangeEvent, FC } from "react"

interface SliderProps {
    step: number
    min: number
    max: number
    value: number
    onChange: (value: number) => void
}

const Slider: FC<SliderProps> = ({ step, min, max, value, onChange }) => {
    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value))
    }

    return (
        <div className="flex">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleSliderChange}
                className="w-full h-1 cursor-pointer"
            />
        </div>
    )
}

export default Slider
