import Link from "next/link"

interface Breadcrumb {
    name: string
    path: string
}

interface Breadcrumbs {
    breadcrumbs: Breadcrumb[]
}

const BreadCrumbs = ({ breadcrumbs }: Breadcrumbs) => {
    return (
        <div className="breadcrumbs">
            {breadcrumbs.map((breadcrumb, index) => (
                <div key={index} className="breadcrumbs__item">
                    <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
                </div>
            ))}
        </div>
    )
}

export default BreadCrumbs
