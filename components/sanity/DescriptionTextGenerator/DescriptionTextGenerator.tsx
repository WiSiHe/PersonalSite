import { BlockContentIcon } from "@sanity/icons"
import {
  Button,
  Card,
  Flex,
  Label,
  Switch,
  Text,
  TextArea,
  Tooltip,
} from "@sanity/ui"
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

  const [isLoading, setIsLoading] = useState(false)
  const [isKeywordsEnabled, setIsKeywordsEnabled] = useState(true)
  const [prompt, setPrompt] = useState("")
  const [tags, setTags] = useState<iSanityTag[]>([])
  const [convertedTagString, setConvertedTagString] = useState("")

  const [temperature, setTemperature] = useState(0.7)
  const [tokens, setTokens] = useState(1000)

  // const hasTags = isNotEmptyArray(tags)

  const basePrompt =
    "You are an AI designed to provide objective descriptions of stylised paintings given a text description. Also improve the text where you can. "

  const promptWithBase = `${basePrompt} with the following description: ${prompt}.`

  const promptWithTags = `${promptWithBase} Also take these descriptive tags into consideration: ${convertedTagString}.`

  const finalPrompt = isKeywordsEnabled ? promptWithTags : promptWithBase

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
          maxTokens: tokens,
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
  }, [])

  return (
    <>
      <Card>
        <div className="flex flex-col">
          <label htmlFor="enthusiasm">Tokens:{tokens}</label>
          <input
            type="range"
            max={2000}
            min={100}
            step={100}
            id="enthusiasm"
            value={tokens}
            onChange={(event) => setTokens(Number(event.currentTarget.value))}
          />
          <Tooltip content="The number of tokens to generate."></Tooltip>
        </div>
        <div className="flex flex-col">
          <label htmlFor="temperature">Temperature: {temperature}</label>
          <input
            type="range"
            min="-2"
            max="2"
            step={0.1}
            id="temperature"
            value={temperature}
            onChange={(event) =>
              setTemperature(Number(event.currentTarget.value))
            }
          />
        </div>

        <div className="flex flex-col gap-2 py-4">
          <Label>Include keywords</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={isKeywordsEnabled}
              onChange={() => setIsKeywordsEnabled((prev) => !prev)}
            />
            {isKeywordsEnabled ? "On" : "Off"}
          </div>
        </div>

        <TextArea
          onChange={(event) => setPrompt(event.currentTarget.value)}
          padding={2}
          placeholder="Write a short objective description of a painting."
          value={prompt}
          rows={4}
        />

        <div className="flex items-start justify-between pt-2">
          {convertedTagString && (
            <Text size={1}>
              <strong>Keywords:</strong>{" "}
              <span className={clsx(isKeywordsEnabled ? "" : "line-through")}>
                {convertedTagString}
              </span>
            </Text>
          )}
          <Button
            onClick={handleGenerateDescription}
            icon={!isLoading ? BlockContentIcon : Loader}
            text="Generate"
            type="button"
            tone="primary"
            // padding={2}
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-between pt-4 pb-2">
          <Label size={1}>Description: </Label>
          <Label>{value?.length} characters</Label>
        </div>
        <Card>
          <div className="p-4 bg-primary/10">
            <Text size={1}>
              <p className="whitespace-pre-wrap">{value}</p>
            </Text>
          </div>
        </Card>
      </Card>
    </>
  )
}

export default DescriptionTextGenerator
