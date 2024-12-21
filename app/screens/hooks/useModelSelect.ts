import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/repository/BrandResponse"
import { useCallback, useState } from "react"
import { useSharedValue } from "react-native-reanimated"

export const useModelSelect = (brandId: string, modelId: string) => {
  const isExpanded = useSharedValue(false)
  const [models, setModels] = useState<BrandResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const vehicleModels = await brandRepository.getVehicleModels(brandId, modelId)
      if (!vehicleModels) throw new Error("Nenhum modelo encontrado")
      setModels(vehicleModels)
    } catch (err) {
      setError("Erro ao carregar modelos")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [brandId, modelId])

  const toggleAccordion = useCallback(() => {
    isExpanded.value = !isExpanded.value
    if (isExpanded.value) fetchData()
  }, [isExpanded, fetchData])

  return {
    isExpanded,
    models,
    isLoading,
    error,
    toggleAccordion,
  }
}
