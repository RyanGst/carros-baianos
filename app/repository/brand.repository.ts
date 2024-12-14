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

const getVehicleModels = async (brandId: string, modelId: string) => {
  const response = await api.apisauce.get<BrandResponse[]>(
    `/carros/marcas/${brandId}/modelos/${modelId}/anos`,
  )
  return response.data
}

type VehiclePrice = {
  TipoVeiculo: number
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  SiglaCombustivel: string
}

const getVehiclePrice = async (brandId: string, modelId: string, year: string) => {
  const response = await api.apisauce.get<VehiclePrice>(
    `/carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`,
  )
  return response.data
}

export const brandRepository = { getBrands, getModelsByBrand, getVehicleModels, getVehiclePrice }
