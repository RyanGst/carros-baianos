import { Icon, Radio, Text } from "@/components"
import { AccordionContent } from "@/screens/ModelScreen/AccordionContent"
import { ThemedStyle } from "@/theme"
import { BrandResponse } from "@/types/BrandResponse"
import { RoastCarParams } from "@/types/RoastCarParams"
import { useAppTheme } from "@/utils/useAppTheme"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { useYearSelect } from "../hooks/useModelSelect"

type Props = {
  item: BrandResponse
  brandId: string
  onSelect: (model: RoastCarParams) => void
  selectedModel: BrandResponse | null
}

export const ModelSelectItem = ({ item, brandId, onSelect, selectedModel }: Props) => {
  const { themed } = useAppTheme()
  const {
    isExpanded,
    models: vehicleYears,
    isLoading,
    error,
    toggleAccordion,
  } = useYearSelect(brandId, item.codigo)

  const handleSelectYear = (model: BrandResponse) => {
    const data: RoastCarParams = {
      brandId,
      modelId: item.codigo,
      yearId: model.codigo,
    }
    onSelect(data)
    toggleAccordion()
  }

  return (
    <View style={themed($root)}>
      <TouchableOpacity style={$header} onPress={toggleAccordion}>
        <Text text={item.nome} />
        <Icon
          icon="caretRight"
          size={24}
          style={{ transform: [{ rotate: isExpanded.value ? "90deg" : "0deg" }] }}
        />
      </TouchableOpacity>

      <AccordionContent isExpanded={isExpanded}>
        <View style={$radioSelector}>
          {isLoading && <Text text="Carregando..." />}
          {error && <Text text={error} preset="bold" />}
          {!isLoading &&
            !error &&
            vehicleYears.map((model) => (
              <Radio
                key={model.codigo}
                label={model.nome}
                value={model.codigo === selectedModel?.codigo}
                onValueChange={() => handleSelectYear(model)}
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

const $radioSelector: ViewStyle = {
  justifyContent: "center",
  gap: 24,
  marginTop: 24,
}
