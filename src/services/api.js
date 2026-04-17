import axios from 'axios'

const PROXY = 'https://world.openfoodfacts.org'

const apiClient = axios.create({
    baseURL: PROXY
})

export const fetchProductsByCategory = async (category, page = 1) => {
    const response = await apiClient.get('/api/v2/search', {
        params: {
            q: `category:${category}`,
            page: page,
            page_size: 20,
            json: true
        }
    })
    return response.data
}

export const searchProductsByName = async (name, page = 1) => {
    const response = await apiClient.get('/cgi/search.pl', {
        params: {
            search_terms: name,
            json: true,
            page: page,
            page_size: 20
        },
    })
    return response.data
}

export const fetchProductByBarcode = async (barcode) => {
    const response = await apiClient.get(
        `/api/v0/product/${barcode}.json`
    )
    return response.data
}
