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
  colStyle: "col-span-6 xl:col-span-2",
  colSize: 2,
  setColSize: (size) => set({ colSize: size }),
  setColStyle: (style) => set({ colStyle: style }),
})

const paintingSortingStore = (set) => ({
  paintingSorting: "random",
  setPaintingSorting: (filter) => set({ paintingSorting: filter }),
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

export const useCombinedStore = create((...params) => ({
  // ...createPokemonStore(...params),
  // ...createCounterStore(...params),
  ...colStyleStore(...params),
  ...paintingSortingStore(...params),
  ...paintingFilterStore(...params),
}))
