import { Column as AriaColumn, type ColumnProps } from "react-aria-components"

function Column<T extends object>(props: ColumnProps<T>) {
    return (
        <AriaColumn {...props}>
            {({ allowsSorting, sortDirection }) => (
                <>
                    {props.children}
                    {allowsSorting && (
                        <span aria-hidden="true" className="sort-indicator">
                            {sortDirection === "ascending" ? "▲" : "▼"}
                        </span>
                    )}
                </>
            )}
        </AriaColumn>
    )
}

export default Column
