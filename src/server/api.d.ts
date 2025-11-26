declare function getCountries(): Promise<Response>
declare function searchGeo(query?: string): Promise<Response>
declare function startSearchPrices(countryID: string): Promise<Response>
declare function getSearchPrices(token: string): Promise<Response>
declare function stopSearchPrices(token: string): Promise<Response>
declare function getHotels(countryID: string): Promise<Response>
declare function getHotel(hotelId: number | string): Promise<Response>
declare function getPrice(priceId: string): Promise<Response>

export {
  getCountries,
  getHotel,
  getHotels,
  getPrice,
  getSearchPrices,
  searchGeo,
  startSearchPrices,
  stopSearchPrices,
}
