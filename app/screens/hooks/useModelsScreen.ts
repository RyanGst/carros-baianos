import { useData } from "@/hooks/useData"
import { brandRepository } from "@/repository/brand.repository"
import { RoastCarParams } from "@/types/RoastCarParams"
import { useState } from "react"

export const useModelsScreen = (id: string) => {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState<RoastCarParams | null>(null)

  const { data, isError, isLoading } = useData(
    "models",
    () => brandRepository.getModelsByBrand(id),
    {
      onError: (error) => {
        console.error("Failed to fetch models:", error)
      },
    },
  )

  const filteredModels =
    data?.modelos?.filter((item) => item.nome.toLowerCase().includes(input.toLowerCase())) ?? []

  return {
    input,
    setInput,
    selectedModel,
    setSelectedModel,
    filteredModels,
    isLoading,
    isError,
  }
}
