import { BlockContentIcon } from "@sanity/icons"
import { Button, Card, Flex, Label, Text, TextArea } from "@sanity/ui"
import clsx from "clsx"
import { getPaintingTags } from "lib/api"
import { iSanityTag } from "lib/models/objects/SanityTag"
import { useEffect, useMemo, useState } from "react"
import { BiLoader } from "react-icons/bi"
import { set, StringInputProps, unset, useFormValue } from "sanity"
import { isEmptyArray, isNotEmptyArray } from "utils/array"
import { slugify } from "utils/string"

const Loader = () => <BiLoader className="animate-spin" />

interface Tag {
  name: string
}

function getTagNames(tags: Tag[]): string {
  if (isEmptyArray(tags)) return ""
  return tags.map((tag) => tag.name).join(", ")
}

const DescriptionTextGenerator = (props: StringInputProps) => {
  // The onChange function is used to update the value of the field
  const { value, onChange } = props
  // const tagsss = useFormValue(["tagsV2"])
  const slug = useFormValue(["slug", "current"]) as string

  // const docId = useFormValue(["_id"])

  const [isLoading, setIsLoading] = useState(false)
  const [promt, setPromt] = useState("")
  const [tags, setTags] = useState<iSanityTag[]>([])
  const [convertedTagString, setConvertedTagString] = useState("")

  // const hasTags = isNotEmptyArray(tags)

  useEffect(() => {
    const hasTags = isNotEmptyArray(tags)

    if (!hasTags) return
    const tagsToString = getTagNames(tags)
    setConvertedTagString(tagsToString)
  }, [tags])

  const currentPromt = clsx(
    !convertedTagString
      ? `Write an objective description of a painting and given the following description: ${promt}`
      : `Write an objective description of a painting and given the following description: ${promt}, and given the following descriptive keywords: ${convertedTagString}.`
  )

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

  const fetchTags = async () => {
    // fetch tags from sanity
    const tags = await getPaintingTags(slug)

    setTags(tags)
  }

  useEffect(() => {
    fetchTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

export default DescriptionTextGenerator
