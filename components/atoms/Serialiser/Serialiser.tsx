function extractCodeBlocks(str: string) {
    const regex = /```[\s\S]*?```/g
    const codeBlocks = str.match(regex) || []
    let filteredStr = str
    const elements = []

    codeBlocks.forEach((codeBlock, index) => {
        const parts = filteredStr.split(codeBlock)
        elements.push(
            <p key={`str-${index}`}>{parts[0]}</p>,
            <pre
                key={`code-${index}`}
                className="p-4 text-xs bg-gray-200 rounded"
            >
                <code>{codeBlock.replaceAll("```", "")}</code>
            </pre>,
        )
        filteredStr = parts.slice(1).join("")
    })

    if (filteredStr) {
        elements.push(<p key={`str-${codeBlocks.length}`}>{filteredStr}</p>)
    }

    return elements
}

const Serialiser = ({ content = "" }) => {
    const test = extractCodeBlocks(content)
    // const codeContent = extractCodeBlock(content)

    // const contentWithoutCode = content.replace(codeContent, "")

    // // remove ``` from contentWithoutCode
    // const contentWithoutCodeAndMarkers = contentWithoutCode.replace("```", "")

    // const test = contentWithoutCode.replaceAll("```", "")

    return <div className="break-words whitespace-pre-wrap">{test}</div>
}

export default Serialiser
