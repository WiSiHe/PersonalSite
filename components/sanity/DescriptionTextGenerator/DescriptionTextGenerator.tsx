import { BlockContentIcon } from "@sanity/icons"
import { Button, Card, Label, Switch, Text, TextArea } from "@sanity/ui"
import clsx from "clsx"
import { getPaintingTags } from "lib/api"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useEffect, useState } from "react"
import { BiLoader } from "react-icons/bi"
import { set, StringInputProps, unset, useFormValue } from "sanity"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { isNotEmptyObject } from "utils/object"

const Loader = () => <BiLoader className="animate-spin" />

interface Tag {
  name: string
}

function getTagNames(tags: Tag[]): string {
  if (isEmptyArray(tags)) return ""
  return tags
    .filter((filter) => filter.name !== "Store")
    .filter((filter) => filter.name !== "Wallpaper")
    .map((tag) => tag.name)
    .join(", ")
}

const DescriptionTextGenerator = (props: StringInputProps) => {
  const { value, onChange } = props
  const slug = useFormValue(["slug", "current"]) as string
  const title = useFormValue(["title"]) as string
  const tagsV2 = useFormValue(["tagsV2"])

  const [isLoading, setIsLoading] = useState(false)
  const [isKeywordsEnabled, setIsKeywordsEnabled] = useState(true)
  const [prompt, setPrompt] = useState("")
  const [tags, setTags] = useState<iSanityTag[]>([])
  const [convertedTagString, setConvertedTagString] = useState("")

  const [temperature, setTemperature] = useState(0.75)

  const basePrompt = `You are an AI designed to provide objective descriptions of digital paintings:

  - you are given a painting description
  - you are to rewrite the description in a more objective way
  - it has the following title: "${title}".

  This is the paintings description:
`

  const promptWithBase = `${basePrompt} ${prompt}.`

  const promptWithTags = `${promptWithBase} Also take these descriptive tags into consideration: ${convertedTagString}.`

  const finalPrompt = isKeywordsEnabled ? promptWithTags : promptWithBase

  const handleChangeDescription = (e: any) => {
    const response = e.target.value
    onChange(response ? set(response) : unset())
  }

  const handleGenerateDescription = async () => {
    if (!finalPrompt) return
    setIsLoading(true)

    const newChatLogs = [{ role: "user", content: finalPrompt }]

    try {
      const response = await fetch("/api/openai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newChatLogs,
          temperature,
          // maxTokens: tokens,
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

  const fetchTags = async () => {
    if (!slug) return
    const tags = await getPaintingTags(slug)
    setTags(tags)
  }

  useEffect(() => {
    const hasTags = isNotEmptyArray(tags)

    if (!hasTags) return
    const tagsToString = getTagNames(tags)
    setConvertedTagString(tagsToString)
  }, [tags])

  useEffect(() => {
    fetchTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsV2])

  return (
    <>
      <Card>
        <div className="text-[6px] p-4 bg-tertiary whitespace-pre-wrap ">
          {finalPrompt}
        </div>
        <section className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-col justify-between flex-1">
            <label htmlFor="temperature">Temperature: {temperature}</label>
            <input
              type="range"
              min="0.5"
              max="1.1"
              step={0.1}
              id="temperature"
              value={temperature}
              onChange={(event) =>
                setTemperature(Number(event.currentTarget.value))
              }
            />
            <div className="flex flex-col gap-2 py-4">
              <Label>Include keywords</Label>
              {convertedTagString && (
                <Text size={1}>
                  <strong>Keywords:</strong>{" "}
                  <span
                    className={clsx(isKeywordsEnabled ? "" : "line-through")}
                  >
                    {convertedTagString}
                  </span>
                </Text>
              )}
              <div className="flex items-center gap-2">
                <Switch
                  checked={isKeywordsEnabled}
                  onChange={() => setIsKeywordsEnabled((prev) => !prev)}
                />
                {isKeywordsEnabled ? "On" : "Off"}
              </div>
            </div>
          </div>
        </section>

        <TextArea
          onChange={(event) => setPrompt(event.currentTarget.value)}
          padding={2}
          placeholder="Write a short objective description of a painting."
          value={prompt}
          fontSize={[1, 1, 1, 1]}
          rows={3}
        />

        <div className="flex items-start justify-end pt-2">
          <Button
            onClick={handleGenerateDescription}
            icon={!isLoading ? BlockContentIcon : Loader}
            text="Generate"
            type="button"
            tone="primary"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-between pt-4 pb-2">
          <Label size={1}>Description: </Label>
          <Label>{value?.length} characters</Label>
        </div>
        <Card className="text-xs">
          <TextArea
            onChange={(event) => handleChangeDescription(event)}
            size={2}
            value={value}
            rows={7}
            fontSize={[1, 1, 1, 1]}
          />
        </Card>
      </Card>
    </>
  )
}

export default DescriptionTextGenerator
