import Link from "next/link"
import { Fragment } from "react"

type BreadCrumbsProps = {
    breadcrumbs: {
        name: string
        path: string
    }[]
}

const BreadCrumbs = ({ breadcrumbs }: BreadCrumbsProps) => {
    return (
        <div className="breadcrumbs">
            {breadcrumbs.map(({ name, path }, index) => (
                <Fragment key={path}>
                    <Link href={path}>
                        <a aria-label={`Breadcrumb link to ${name}`}>{name}</a>
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                        <span className="separator"> / </span>
                    )}
                </Fragment>
            ))}
        </div>
    )
}

export default BreadCrumbs
