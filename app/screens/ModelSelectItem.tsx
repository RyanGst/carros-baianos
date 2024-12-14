import { Icon, Radio, Text } from "@/components"
import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/repository/BrandResponse"
import { AccordionContent } from "@/screens/AccordionContent"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated"

const $radioSelector: ViewStyle = {
  justifyContent: "center",
  gap: 24,
  marginTop: 24,
}

type Props = {
  item: BrandResponse
  brandId: string
  onSelect: (model: BrandResponse) => void
  selectedModel: BrandResponse | null
}

export const ModelSelectItem = ({ item, brandId, onSelect, selectedModel }: Props) => {
  const isExpanded = useSharedValue(false)
  const { themed } = useAppTheme()
  const [models, setModels] = useState<BrandResponse[]>([])

  const toggleAccordion = () => {
    isExpanded.value = !isExpanded.value
  }
  const fetchData = async () => {
    const vehicleModels = await brandRepository.getVehicleModels(brandId, item.codigo)
    if (!vehicleModels) return
    setModels(vehicleModels)
  }
  useAnimatedReaction(
    () => isExpanded.value,
    (value) => {
      if (value) runOnJS(fetchData)()
    },
    [isExpanded],
  )

  return (
    <View style={themed($root)}>
      <TouchableOpacity style={$header} onPress={toggleAccordion}>
        <Text text={item.nome} />
        <Icon icon="caretRight" size={24} style={$rotatedIcon} />
      </TouchableOpacity>

      <AccordionContent isExpanded={isExpanded}>
        <View style={$radioSelector}>
          {models.map((model) => (
            <Radio
              key={model.codigo}
              label={model.nome}
              value={model.codigo === selectedModel?.codigo}
              onValueChange={(value) => {
                if (value) onSelect(model)
              }}
            />
          ))}
        </View>
      </AccordionContent>
    </View>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
})

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $rotatedIcon = {
  transform: [{ rotate: "90deg" }],
}
