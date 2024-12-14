import { api } from "@/services/api"
import { BrandResponse } from "./BrandResponse"

const getBrands = async () => {
  const response = await api.apisauce.get<BrandResponse[]>("/carros/marcas")
  return response.data
}

type ModelResponse = {
  modelos: BrandResponse[]
}
const getModelsByBrand = async (brandId: string) => {
  const response = await api.apisauce.get<ModelResponse>(`/carros/marcas/${brandId}/modelos`)
  return response.data
}

export const brandRepository = { getBrands, getModelsByBrand }
