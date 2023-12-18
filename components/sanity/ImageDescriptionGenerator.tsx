import { Button, Card, TextArea } from "@sanity/ui"
import { urlForImage } from "lib/sanity.image"
import { useEffect, useState } from "react"
import { BiLoader } from "react-icons/bi"
import { FaRobot } from "react-icons/fa"
import { set, StringInputProps, unset, useFormValue } from "sanity"
import { isNotEmptyObject } from "utils/object"

const Loader = () => <BiLoader className="animate-spin" />

// Constants for image dimensions
const IMAGE_HEIGHT = 512
const IMAGE_WIDTH = 512

const basePrompt = "Describe the painting/illustration in a few sentences."

const ImageDescriptionGenerator = (props: StringInputProps) => {
    const { value, onChange } = props
    const image = useFormValue(["image"]) as string

    const [isLoading, setIsLoading] = useState(false)

    const [imageUrl, setImageUrl] = useState<string>("")

    const handleChangeDescription = (e: any) => {
        const response = e.target.value
        onChange(response ? set(response) : unset())
    }

    const handleGenerateDescription = async () => {
        setIsLoading(true)

        const newChatLogs = [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: basePrompt,
                    },
                    {
                        type: "image_url",
                        image_url: imageUrl,
                    },
                ],
            },
        ]

        try {
            const response = await fetch("/api/ai/vision", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: newChatLogs,
                    prompt: basePrompt,
                }),
            }).then((res) => res.json())
            if (isNotEmptyObject(response)) {
                onChange(response.content ? set(response.content) : unset())
            }
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        // If there's no image, don't do anything
        if (!image) return

        // If urlForImage is defined, use it to set the image URL
        if (typeof urlForImage === "function") {
            const imageUrl = urlForImage(image)
                .height(IMAGE_HEIGHT)
                .width(IMAGE_WIDTH)
                .url()
            setImageUrl(imageUrl || "")
        }
    }, [image])

    return (
        <Card>
            <TextArea
                onChange={(event) => handleChangeDescription(event)}
                size={2}
                value={value}
                rows={7}
                fontSize={[1, 1, 1, 1]}
            />
            <div className="flex items-start justify-end pt-4">
                <Button
                    onClick={handleGenerateDescription}
                    icon={!isLoading ? <FaRobot /> : Loader}
                    text="Generate"
                    type="button"
                    tone="primary"
                    disabled={isLoading}
                />
            </div>
        </Card>
    )
}

export default ImageDescriptionGenerator
