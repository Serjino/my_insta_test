'use server'

import qs from 'qs'

const DEFAULT_FETCH_CONFIG = {
    next: {
        revalidate: 60
    }
}

const API_HOST = "https://jsonplaceholder.typicode.com"

interface IFetchParams {
    path: string,
    query?: {[key: string]: string},
    options?: RequestInit | undefined
}

export async function GET({ path, query, options }: IFetchParams) {
    const res = await fetch(API_HOST + path + '?' + qs.stringify(query), {
        ...DEFAULT_FETCH_CONFIG,
        ...options
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

    return res.json()
}
