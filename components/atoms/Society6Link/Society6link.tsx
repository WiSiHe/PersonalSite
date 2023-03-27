/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { SiSociety6 } from "react-icons/si"

const Society6Link = ({ href = "" }) => {
  if (!href) return null
  return (
    <>
      {/* <p>
        Society6 is home to a thriving community of independent artists
        worldwide, each with their own unique designs. Choose your favorite and
        pair it with our best-in
      </p> */}
      <Link href={href} rel="noreferrer" target="_blank" aria-label="society6">
        <div className="flex-shrink-0 p-2 text-white bg-black rounded-lg">
          <strong className="flex items-center justify-center gap-1 ">
            <SiSociety6 /> Society6
          </strong>
        </div>
      </Link>
    </>
  )
}

export default Society6Link
