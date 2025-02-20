import { Icon, Radio, Text } from "@/components"
import { BrandResponse } from "@/repository/BrandResponse"
import { AccordionContent } from "@/screens/AccordionContent"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { useModelSelect } from "./hooks/useModelSelect"

type Props = {
  item: BrandResponse
  brandId: string
  onSelect: (model: BrandResponse) => void
  selectedModel: BrandResponse | null
}

export const ModelSelectItem = ({ item, brandId, onSelect, selectedModel }: Props) => {
  const { themed } = useAppTheme()
  const { isExpanded, models, isLoading, error, toggleAccordion } = useModelSelect(
    brandId,
    item.codigo,
  )

  const handleSelect = (model: BrandResponse) => {
    onSelect({
      codigo: model.codigo,
      nome: `${item.nome} - ${model.nome}`,
    })
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
            models.map((model) => (
              <Radio
                key={model.codigo}
                label={model.nome}
                value={model.codigo === selectedModel?.codigo}
                onValueChange={() => handleSelect(model)}
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
