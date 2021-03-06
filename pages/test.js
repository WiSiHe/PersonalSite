import React from "react"
import PropTypes from "prop-types"

import Meta from "components/Meta"
import Main from "components/Main"

import Navigation from "components/Navigation"

import NavigationDrawer from "components/NavigationDrawer"

export default function Home() {
  //   async function handleOnSubmit(e) {
  //     e.preventDefault();
  //     const formData = new FormData(form.current);
  //     const response = await fetch("/.netlify/functions/subscribe", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       setEmail("");
  //     }
  //   }

  // async function handleOnSubmit(e) {
  //   e.preventDefault()
  //   const formData = {}
  //   Array.from(e.currentTarget.elements).forEach(field => {
  //     if (!field.name) return
  //     formData[field.name] = field.value
  //   })
  //   // console.log(formData);
  //   fetch("/api/mail", {
  //     method: "POST",
  //     body: JSON.stringify(formData)
  //   })
  // }

  //   https://api.sg-form.com/signup

  return (
    <>
      <Meta url="https://wisihe.no" />
      <Navigation hideOnDesktop isAbsolute />
      <NavigationDrawer />
      <Main noTopPadding>
        {/* <section className="flex flex-col items-center justify-center w-full border">
          <h1 className="text-2xl">Email form</h1>
          <form className="" ref={form} method="post" onSubmit={handleOnSubmit}>
            <div>
              <input
                id="email"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="email">email</label>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-2 py-1 text-white bg-green-400 rounded-full">Submit</button>
            </div>
          </form>

        </section> */}
        <iframe src="https://cdn.forms-content.sg-form.com/cee8bca1-da94-11ec-ba32-baa4bce2581f" />
      </Main>
    </>
  )
}

Home.propTypes = {
  headerImage: PropTypes.any,
  paintings: PropTypes.array,
  tags: PropTypes.array,
  thumbnailImage: PropTypes.any,
  wallpaperPaintings: PropTypes.any
}
