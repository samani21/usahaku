export interface store {
    address: string,
    id: number,
    lat: number,
    lng: number,
    name: string
}

export interface BusinessType {
    banner_url: string,
    category: string,
    description: string,
    end_time: string,
    logo_url: string,
    name: string,
    plan: string,
    slug: string,
    start_time: string,
    verified_status: number,
    store: store[]
}
