import { api } from "@/services/api"
import { RoastCarParams } from "@/types/RoastCarParams"
import { BrandResponse } from "../types/BrandResponse"
import { VehicleDetails } from "../types/VehicleDetails"

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

const getVehicleDetails = async ({ brandId, modelId, yearId }: RoastCarParams) => {
  const response = await api.apisauce.get<VehicleDetails>(
    `/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`,
  )
  return response.data
}

export const brandRepository = {
  getBrands,
  getModelsByBrand,
  getVehicleModels,
  getVehiclePrice,
  getVehicleDetails,
}
