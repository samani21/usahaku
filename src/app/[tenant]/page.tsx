import Store from "@/Components/Tenant/Store"

type Props = {
    params: Promise<{ tenant: string }>
}

export default async function Page({ params }: Props) {

    const { tenant } = await params

    return (
        <div>
            <Store tenant={tenant} />
        </div>
    )
}