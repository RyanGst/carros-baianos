import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/types/BrandResponse"
import { useCallback, useState } from "react"
import { useSharedValue } from "react-native-reanimated"

export const useYearSelect = (brandId: string, modelId: string) => {
  const isExpanded = useSharedValue(false)
  const [{ yearsFromModels, isLoading, error }, setState] = useState({
    yearsFromModels: [] as BrandResponse[],
    isLoading: false,
    error: null as string | null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const vehicleModels = await brandRepository.getVehicleModels(brandId, modelId)
      if (!vehicleModels) throw new Error("Nenhum modelo encontrado")

      setState((prev) => ({ ...prev, yearsFromModels: vehicleModels, isLoading: false }))
    } catch (err) {
      console.error(err)
      setState((prev) => ({ ...prev, error: "Erro ao carregar modelos", isLoading: false }))
    }
  }, [brandId, modelId])

  const toggleAccordion = useCallback(() => {
    if (!isExpanded.value) fetchData()
    isExpanded.value = !isExpanded.value
  }, [isExpanded, fetchData])

  return { isExpanded, models: yearsFromModels, isLoading, error, toggleAccordion }
}
