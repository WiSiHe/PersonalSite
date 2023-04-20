import { BlockContentIcon } from "@sanity/icons"
import { Button, Card, Flex, Label, Text, TextArea } from "@sanity/ui"
import { useState } from "react"
import { BiLoader } from "react-icons/bi"
import { set, StringInputProps, unset } from "sanity"

const Loader = () => <BiLoader className="animate-spin" />

const VideoDescriptionGenerator = (props: StringInputProps) => {
  // The onChange function is used to update the value of the field
  const { value, onChange } = props
  // const tagsss = useFormValue(["tagsV2"])

  // const docId = useFormValue(["_id"])

  const [isLoading, setIsLoading] = useState(false)
  const [promt, setPromt] = useState("")

  const currentPromt = `Write an objective description of a video and given the following description: ${promt}`

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
      console.log("error")
    }
    setIsLoading(false)
  }

  const generateStory = async () => {
    if (!promt) return
    try {
      callApi()
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>
      <Card>
        <Flex justify="flex-end" className="gap-2">
          <Card flex={1}>
            <TextArea
              onChange={(event) => setPromt(event.currentTarget.value)}
              padding={2}
              placeholder="Write a short objective description of a painting. It should be 320 characters or less, and given the following description"
              value={promt}
            />
          </Card>
          <Card>
            <Button
              onClick={generateStory}
              icon={!isLoading ? BlockContentIcon : Loader}
              text="Generate"
              type="button"
              tone="primary"
              // padding={2}
              disabled={isLoading}
            />
          </Card>
        </Flex>
        <Card paddingTop={2}>
          <Label size={1}>Current Promt: </Label>
        </Card>
        <Card paddingTop={2}>
          <Text size={1}>{currentPromt}</Text>
        </Card>

        <Flex align="baseline" justify="space-between" paddingBottom={4}></Flex>
        <Card paddingTop={2}>
          <Card paddingBottom={2}>
            <Label size={1}>AI Description: {value?.length} characters</Label>
          </Card>
          <Card className="bg-primary">
            <Text size={1}>{value}</Text>
          </Card>
        </Card>
      </Card>
    </>
  )
}

export default VideoDescriptionGenerator
