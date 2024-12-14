import { Icon, Text } from "@/components"
import { BrandResponse } from "@/repository/BrandResponse"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { AccordionContent } from "@/screens/AccordionContent"

export const ModelSelectItem = ({ item }: { item: BrandResponse }) => {
  const isExpanded = useSharedValue(false)
  const { themed } = useAppTheme()

  const toggleAccordion = () => {
    isExpanded.value = !isExpanded.value
  }

  return (
    <View style={themed($root)}>
      <TouchableOpacity style={$header} onPress={toggleAccordion}>
        <Text text={item.nome} />
        <Icon icon="caretRight" size={24} style={$rotatedIcon} />
      </TouchableOpacity>

      <AccordionContent isExpanded={isExpanded}>
        <Text text="Accordion content" />
        <Text text="Accordion content" />
        <Text text="More content..." />
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
