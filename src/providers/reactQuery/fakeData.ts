import { queryOptions } from '@tanstack/react-query'

export const dataOptions = queryOptions({
   queryKey: ['pokemon'],
   queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')
   return response.json()
   },
})
