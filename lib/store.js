import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// const createCounterStore = (set, get) => ({
//   number: 123,
//   increaseCounterNumber: () => set((state) => ({ number: state.number + 1 })),
//   decreaseCounterNumber: () => set((state) => ({ number: state.number - 1 })),
//   logNumber: () => {
//     console.log(` Current number value equals ${get().number}`)
//   },
// })

// const createPokemonStore = (set) => ({
//   pokemon: [],
//   fetchPokemon: async () => {
//     await fetch("https://pokeapi.co/api/v2/pokemon")
//       .then((response) => response.json())
//       .then((data) => set({ pokemon: data.results }))
//   },
// })

const colStyleStore = (set) => ({
  colStyle: "col-span-6 xl:col-span-2",
  colSize: 2,
  setColSize: (size) => set({ colSize: size }),
  setColStyle: (style) => set({ colStyle: style }),
})

const paintingSortingStore = (set) => ({
  paintingSorting: "random",
  setPaintingSorting: (filter) => set({ paintingSorting: filter }),
})

const paintingSliceStore = (set) => ({
  paintingSlice: 25,
  setPaintingSlice: (slice) => set({ paintingSlice: slice }),
})

const paintingFilterStore = (set) => ({
  paintingFilter: "all",
  setPaintingFilter: (filter) => set({ paintingFilter: filter }),
  filterList: [],
  setFilterList: (list) => set({ filterList: list }),
  clearFilterList: () => set({ filterList: [] }),
  modalOpen: false,
  // toggle modal
  setModalOpen: () => set((state) => ({ modalOpen: !state.modalOpen })),
})

const openAIStore = (set) => ({
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
})

export const useOpenAIStore = create(
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
    // change this to session storage at a later date, to persist data, but must fix hydration issue
    {
      name: "ai-chat-log", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ messages: state.messages }), // (optional) if you only want to persist a subset of the store
    }
  )
)

export const useCombinedStore = create((...params) => ({
  // ...createPokemonStore(...params),
  // ...createCounterStore(...params),
  ...colStyleStore(...params),
  ...paintingSortingStore(...params),
  ...paintingFilterStore(...params),

  ...openAIStore(...params),
  ...paintingSliceStore(...params),
}))
