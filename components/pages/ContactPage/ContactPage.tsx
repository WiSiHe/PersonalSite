"use client"
import Main from "components/atoms/Main/Main"

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
  }

  return (
    <>
      <section className="self-center p-4 bg-white drop-shadow">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="ring"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="ring"
            />
          </div>
          <button type="submit" className="px-4 py-3 text-white bg-primary">
            Contact
          </button>
        </form>
      </section>
    </>
  )
}

export default ContactPage
