import { Button, Card, TextArea } from "@sanity/ui"
import { urlForImage } from "lib/sanity.image"
import { useEffect, useState } from "react"
import { BiLoader } from "react-icons/bi"
import { set, StringInputProps, unset, useFormValue } from "sanity"
import { isNotEmptyObject } from "utils/object"

const Loader = () => <BiLoader className="animate-spin" />

const basePrompt = "Create a SEO friendly description for this image."

const ImageSEOGenerator = (props: StringInputProps) => {
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
        if (!image) return

        setImageUrl(urlForImage(image).height(512).width(512).url() || "")
    }, [image])

    return (
        <Card>
            <div className="flex items-start justify-end pt-2">
                <Button
                    onClick={handleGenerateDescription}
                    icon={!isLoading ? <p>icon</p> : Loader}
                    text="Generate"
                    type="button"
                    tone="primary"
                    disabled={isLoading}
                />
            </div>
            <TextArea
                onChange={(event) => handleChangeDescription(event)}
                size={2}
                value={value}
                rows={7}
                fontSize={[1, 1, 1, 1]}
            />
        </Card>
    )
}

export default ImageSEOGenerator
