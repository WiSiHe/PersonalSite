import Main from "components/atoms/Main/Main"
import ContactPage from "components/pages/ContactPage"
// import { revalidatePath } from "next/cache"

export default async function AppContactPage() {
  // const todos: string[] = ["learn reract"]

  // async function handleSubmit(data: FormData) {
  //   "use server"
  //   console.log(data)
  //   const todo = data.get("name")
  //   todos.push(todo as string)
  //   revalidatePath("/contact")
  // }

  return (
    <>
      <Main className="grid min-h-screen grid-cols-12 gap-4 p-4">
        <ContactPage />
      </Main>
    </>
  )
}
