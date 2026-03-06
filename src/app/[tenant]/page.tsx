type Props = {
    params: Promise<{ tenant: string }>
}

export default async function Page({ params }: Props) {

    const { tenant } = await params

    return (
        <div>
            <h1>Toko: {tenant}</h1>
        </div>
    )
}