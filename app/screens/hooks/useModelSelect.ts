import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/repository/BrandResponse"
import { useCallback, useState } from "react"
import { useSharedValue } from "react-native-reanimated"

export const useModelSelect = (brandId: string, modelId: string) => {
  const isExpanded = useSharedValue(false)
  const [{ models, isLoading, error }, setState] = useState({
    models: [] as BrandResponse[],
    isLoading: false,
    error: null as string | null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const vehicleModels = await brandRepository.getVehicleModels(brandId, modelId)
      if (!vehicleModels) throw new Error("Nenhum modelo encontrado")

      setState((prev) => ({ ...prev, models: vehicleModels, isLoading: false }))
    } catch (err) {
      console.error(err)
      setState((prev) => ({ ...prev, error: "Erro ao carregar modelos", isLoading: false }))
    }
  }, [brandId, modelId])

  const toggleAccordion = useCallback(() => {
    if (!isExpanded.value) fetchData()
    isExpanded.value = !isExpanded.value
  }, [isExpanded, fetchData])

  return { isExpanded, models, isLoading, error, toggleAccordion }
}
