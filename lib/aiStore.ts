import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Message {
  role: "user" | "assistant"
  content?: string
  image?: string
}

type Store = {
  messages: Message[]
}

type Actions = {
  addMessage: (message: Message) => void
  clearMessages: () => void
}
export const useOpenAIStore = create<Store & Actions>()(
  persist(
    (set) => ({
      messages: [
        {
          role: "assistant",
          content: "Hello, I'm your assistant. How can I help you? 🤖",
        },
      ],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () =>
        set({
          messages: [
            {
              role: "assistant",
              content: "Hello, I'm your assistant. How can I help you?",
            },
          ],
        }),
    }),
    {
      name: "ai-chat-log", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      //   partialize: (state) => ({ messages: state.messages }), // (optional) if you only want to persist a subset of the store
    }
  )
)
