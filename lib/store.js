import { create } from "zustand"

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
  colStyle: "col-span-6 xl:col-span-3",
  colSize: 4,
  setColSize: (size) => set({ colSize: size }),
  setColStyle: (style) => set({ colStyle: style }),
})

const paintingSortingStore = (set) => ({
  paintingSorting: "trending",
  setPaintingSorting: (filter) => set({ paintingSorting: filter }),
})

export const useCombinedStore = create((...params) => ({
  // ...createPokemonStore(...params),
  // ...createCounterStore(...params),
  ...colStyleStore(...params),
  ...paintingSortingStore(...params),
}))
