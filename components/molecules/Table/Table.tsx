// import { useAsyncList } from "@react-stately/data"
import {
    Cell,
    Row,
    Table as AriaTable,
    TableBody,
    TableHeader,
} from "react-aria-components"

import Column from "./Column"

const items = [
    {
        name: "Luke Skywalker",
        height: 172,
        mass: 77,
        birth_year: 19,
    },
    {
        name: "C-3PO",
        height: 167,
        mass: 75,
        birth_year: 112,
    },
    {
        name: "R2-D2",
        height: 96,
        mass: 32,
        birth_year: 33,
    },
    {
        name: "Darth Vader",
        height: 202,
        mass: 136,
        birth_year: 41.9,
    },
    {
        name: "Leia Organa",
        height: 150,
        mass: 49,
        birth_year: 19,
    },
    {
        name: "Owen Lars",
        height: 178,
        mass: 120,
        birth_year: 52,
    },
    {
        name: "Beru Whitesun lars",
        height: 165,
        mass: 75,
        birth_year: 47,
    },
    {
        name: "R5-D4",
        height: 97,
        mass: 32,
        birth_year: 2,
    },
    {
        name: "Biggs Darklighter",
        height: 183,
        mass: 84,
        birth_year: 24,
    },
    {
        name: "Obi-Wan Kenobi",
        height: 182,
        mass: 77,
        birth_year: 57,
    },
]

const list = {
    items,
}

function Table() {
    // const list = useAsyncList<Character>({
    //     async load({ signal }) {
    //         const res = await fetch(
    //             `https://swapi.py4e.com/api/people/?search`,
    //             {
    //                 signal,
    //             },
    //         )
    //         const json = await res.json()
    //         return {
    //             items: json.results,
    //         }
    //     },
    //     async sort({ items, sortDescriptor }) {
    //         return {
    //             items: items.sort((a, b) => {
    //                 const first = a[sortDescriptor.column]
    //                 const second = b[sortDescriptor.column]
    //                 let cmp =
    //                     (parseInt(first) || first) <
    //                     (parseInt(second) || second)
    //                         ? -1
    //                         : 1
    //                 if (sortDescriptor.direction === "descending") {
    //                     cmp *= -1
    //                 }
    //                 return cmp
    //             }),
    //         }
    //     },
    // })

    return (
        <AriaTable
            aria-label="Example table with client side sorting"
            // sortDescriptor={list.sortDescriptor}
            // onSortChange={list.sort}
        >
            <TableHeader>
                <Column id="name" isRowHeader /*allowsSorting */>
                    Name
                </Column>
                <Column id="height">Height</Column>
                <Column id="mass">Mass</Column>
                <Column id="birth_year">Birth Year</Column>
            </TableHeader>
            <TableBody items={list.items}>
                {(item) => (
                    <Row id={item.name}>
                        <Cell>{item.name}</Cell>
                        <Cell>{item.height}</Cell>
                        <Cell>{item.mass}</Cell>
                        <Cell>{item.birth_year}</Cell>
                    </Row>
                )}
            </TableBody>
        </AriaTable>
    )
}

export default Table
