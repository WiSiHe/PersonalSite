import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { iSanityPaintingTag } from "@/lib/models/objects/SanityTag"

import FilterModal from "../FilterModal/FilterModal"

type FilterDrawer = {
    filters?: iSanityPaintingTag[]
}

const FilterDrawer = ({ filters = [] }: FilterDrawer) => {
    const router = useRouter()
    const pathName = usePathname()
    const currentPath = pathName ?? "/"

    const searchParams = useSearchParams()

    const filterList = searchParams?.getAll("filter") as string[]

    const isModalOpen = searchParams?.get("modal") === "true"

    // const setFilterModalOpen = useCombinedStore((state) => state.setModalOpen)

    // const amountOfActiveFilters = filterList.length

    const closeModal = () => {
        router.replace(currentPath)
    }

    const handleClearFilterList = () => {
        router.replace(currentPath)
    }

    return <div>{/* <strong>Sort</strong> */}</div>
}

export default FilterDrawer
