import StoreLink from "components/atoms/StoreLink"
import Link from "next/link"
import {
    SiArtstation,
    SiOctoprint,
    SiRedbubble,
    SiSociety6,
} from "react-icons/si"

interface Links {
    redbubbleUrl?: string | null
    society6Url?: string | null
    artstationUrl?: string | null
    inPrintUrl?: string | null
}

interface StoreLinks {
    links: Links
}

const StoreLinks = ({ links }: StoreLinks) => {
    const { redbubbleUrl, society6Url, artstationUrl, inPrintUrl } = links

    const hasRedBubleLink = redbubbleUrl !== "" && redbubbleUrl !== null
    const hasSociety6Link = society6Url !== "" && society6Url !== null
    const hasArtstationLink = artstationUrl !== "" && artstationUrl !== null
    const hasInPrintLink = inPrintUrl !== "" && inPrintUrl !== null

    return (
        <section className="p-4 rounded bg-highlight">
            <strong>Store</strong>
            <p className="text-xs">
                Beyond my original art, I offer prints, posters, and merchandise
                in various formats, including framed or canvas prints and artful
                phone cases.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
                {hasRedBubleLink && (
                    <div>
                        <StoreLink
                            href={redbubbleUrl}
                            Label="RedBubble"
                            Icon={SiRedbubble}
                            className="bg-[#e31421] hover:bg-[#e31421]/90"
                        />
                        {/* <p className="pt-2 text-xs">
              Redbubble is a vibrant online marketplace where I sell my unique
              art as prints, posters, and merchandise.
            </p> */}
                    </div>
                )}

                {hasSociety6Link && (
                    <div>
                        <StoreLink
                            href={society6Url}
                            Label="Society6"
                            Icon={SiSociety6}
                            className="bg-dark"
                        />
                        {/* <p className="pt-2 text-xs">
              Society6 is a creative platform where I feature my art on prints,
              posters, and a variety of high-quality products.
            </p> */}
                    </div>
                )}
                {hasArtstationLink && (
                    <div>
                        <StoreLink
                            href={artstationUrl}
                            Label="ArtStation"
                            Icon={SiArtstation}
                            className="bg-dark"
                        />
                        {/* <p>Get this artwork as a print!</p> */}
                    </div>
                )}
                {hasInPrintLink && (
                    <div>
                        <StoreLink
                            href={inPrintUrl}
                            Label="InPrint"
                            className="bg-dark"
                            Icon={SiOctoprint}
                        />
                        {/* <p>Get this artwork as a print!</p> */}
                    </div>
                )}
            </div>

            <div className="pt-4">
                <strong>Do you need a custom print?</strong>

                <div>
                    <Link href="/contact" className="underline">
                        Contact
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default StoreLinks
