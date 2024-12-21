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

  const onSelectModel = (model: BrandResponse) => {
    onSelect({
      codigo: model.codigo,
      nome: `${item.nome} - ${model.nome}`,
    })
    toggleAccordion()
  }

  return (
    <View style={themed($root)}>
      <AccordionHeader title={item.nome} isExpanded={isExpanded.value} onPress={toggleAccordion} />

      <AccordionContent isExpanded={isExpanded}>
        <View style={$radioSelector}>
          <AccordionBody
            isLoading={isLoading}
            error={error}
            models={models}
            selectedModel={selectedModel}
            onSelect={onSelectModel}
          />
        </View>
      </AccordionContent>
    </View>
  )
}

const AccordionHeader = ({
  title,
  isExpanded,
  onPress,
}: {
  title: string
  isExpanded: boolean
  onPress: () => void
}) => (
  <TouchableOpacity style={$header} onPress={onPress}>
    <Text text={title} />
    <Icon
      icon="caretRight"
      size={24}
      style={[$rotatedIcon, { transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] }]}
    />
  </TouchableOpacity>
)

const AccordionBody = ({
  isLoading,
  error,
  models,
  selectedModel,
  onSelect,
}: {
  isLoading: boolean
  error: string | null
  models: BrandResponse[]
  selectedModel: BrandResponse | null
  onSelect: (model: BrandResponse) => void
}) => {
  if (isLoading) return <Text text="Carregando..." />
  if (error) return <Text text={error} preset="error" />

  return models.map((model) => (
    <Radio
      key={model.codigo}
      label={model.nome}
      value={model.codigo === selectedModel?.codigo}
      onValueChange={(value) => value && onSelect(model)}
    />
  ))
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

const $rotatedIcon = {
  transform: [{ rotate: "0deg" }],
}
