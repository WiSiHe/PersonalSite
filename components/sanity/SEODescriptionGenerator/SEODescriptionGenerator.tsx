import { BlockContentIcon } from "@sanity/icons"
import { Button, Card, Text } from "@sanity/ui"
import { useState } from "react"
import { BiLoader } from "react-icons/bi"
import { set, StringInputProps, unset, useFormValue } from "sanity"

const Loader = () => <BiLoader className="animate-spin" />

const SEODescriptionGenerator = (props: StringInputProps) => {
    const { value, onChange } = props
    const description = useFormValue(["description"])

    const [isLoading, setIsLoading] = useState(false)

    const currentPromt = `You are an AI SEO writer, re-write the following text:${description}, and make it into a good SEO description in 122 characters.`

    const callApi = async () => {
        setIsLoading(true)
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: currentPromt, maxTokens: 300 }),
        }).then((res) => res.json())

        if (response.text) {
            onChange(response.text ? set(response.text) : unset())
        } else {
            console.error("error")
        }
        setIsLoading(false)
    }

    const generateSEODescription = async () => {
        if (!description) return
        try {
            callApi()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Card>
                <Card>
                    <Button
                        onClick={generateSEODescription}
                        icon={!isLoading ? BlockContentIcon : Loader}
                        text="Generate"
                        type="button"
                        tone="primary"
                        // padding={2}
                        disabled={isLoading || !description}
                    />
                </Card>

                <Card paddingTop={2}>
                    <Card className="bg-primary">
                        <Text size={1}>{value}</Text>
                    </Card>
                </Card>
            </Card>
        </>
    )
}

export default SEODescriptionGenerator
