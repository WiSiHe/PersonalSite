import StoreLink from "components/atoms/StoreLink"
import SocialLinks from "components/molecules/SocialLinks/SocialLinks"
import Image from "next/image"
import Link from "next/link"
import { FaMailBulk } from "react-icons/fa"
import { SiArtstation, SiRedbubble } from "react-icons/si"

const ContactPage = () => {
  return (
    <>
      <div className="col-span-4 p-4 bg-white">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>
        <hr />
        <div>
          <h2>Store links</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <StoreLink
                href="https://www.redbubble.com/people/hws902/shop?asc=u"
                Label="RedBubble"
                Icon={SiRedbubble}
                className="bg-[#e31421] hover:bg-[#e31421]/90"
              />
              <p className="pt-2 text-xs">
                Redbubble is a vibrant online marketplace where I sell my unique
                art as prints, posters, and merchandise.
              </p>
            </div>
            <div>
              <StoreLink
                href="https://www.artstation.com/wisihe/prints"
                Label="ArtStation"
                Icon={SiArtstation}
                className="bg-dark hover:bg-dark/90"
              />
              <p className="pt-2 text-xs">
                ArtStation is the leading showcase platform for games, film,
                media & entertainment artists.
              </p>
            </div>
            <div>
              <StoreLink
                href="https://www.inprnt.com/gallery/wisihe/"
                Label="InPrint"
                Icon={SiArtstation}
                className="bg-dark hover:bg-dark/90"
              />
              <p className="pt-2 text-xs">
                InPrnt is a gallery marketplace where I sell my unique art as
                prints, posters, and merchandise.
              </p>
            </div>
            <div>
              <StoreLink
                href="https://society6.com/wisihe"
                Label="Society6"
                Icon={SiArtstation}
                className="bg-dark hover:bg-dark/90"
              />
              <p className="pt-2 text-xs">
                Society6 is home to hundreds of thousands of artists from around
                the globe, uploading and selling their original works as 30+
                premium consumer goods from Art Prints to Throw Blankets.
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h2>Commission</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
            <Link
              href="mailto:hws902@gmail.com"
              className="flex items-center gap-2 px-4 py-3 text-white bg-primary"
            >
              <FaMailBulk />
              Email me
            </Link>
          </div>
          <hr />
          <div>
            <h2>Social links</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
            <SocialLinks alignLeft />
          </div>
        </div>
      </div>

      <div className="relative col-span-8">
        <Image
          src="/images/paintings/cute.jpg"
          alt="contact"
          fill
          className="object-cover"
        />
      </div>
    </>
  )
}

export default ContactPage
