import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'b61dac7034msh15c30efc80a1648p184aebjsnbbdf9e28ae68')
            
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world?country_code=DZ' }),
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;