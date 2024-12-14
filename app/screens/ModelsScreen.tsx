import { Button, ListView, Screen, Text, TextField } from "@/components"
import { useData } from "@/hooks/useData"
import { AppStackScreenProps } from "@/navigators"
import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/repository/BrandResponse"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { ModelSelectItem } from "./ModelSelectItem"

// import { useNavigation } from "@react-navigation/native"

interface ModelsScreenProps extends AppStackScreenProps<"Models"> {}

export const ModelsScreen: FC<ModelsScreenProps> = ({ route: { params } }) => {
  const { id } = params ?? { id: "" }
  const { themed } = useAppTheme()
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState<BrandResponse | null>(null)
  const { data, isError, mutate, isLoading } = useData("models", () =>
    brandRepository.getModelsByBrand(id),
  )

  const onSelect = (a: BrandResponse) => {
    setSelectedModel(a)
  }

  if (!id) {
    return (
      <Screen style={$root} preset="scroll">
        <Text text="Selecione um modelo" />
      </Screen>
    )
  }

  if (isError) {
    return (
      <Screen style={$root} preset="fixed">
        <Text text="Um Error Ocorreu" />
      </Screen>
    )
  }

  const filteredData = data?.modelos?.filter((item) =>
    item.nome.toLowerCase().includes(input.toLowerCase()),
  )

  const renderListItem = ({ item }: { item: BrandResponse }) => (
    <ModelSelectItem item={item} brandId={id} onSelect={onSelect} selectedModel={selectedModel} />
  )

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <TextField placeholder={"Busca..."} value={input} onChangeText={setInput} />
        <ListView data={filteredData} renderItem={renderListItem} />
      </View>
      {!!selectedModel && (
        <Animated.View style={$buttonContainer} entering={FadeIn}>
          <Button text="Resetar" onPress={() => setSelectedModel(null)} />
          <Button preset={"filled"} text="Ver resultados" onPress={() => {}} />
        </Animated.View>
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
const $buttonContainer: ViewStyle = {
  flex: 1,
  position: "absolute",
  bottom: "20%",
  left: 0,
  right: 0,
  flexDirection: "row",
  gap: 10,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxl,
})
