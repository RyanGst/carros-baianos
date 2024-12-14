import { ListView, Screen, Text, TextField } from "@/components"
import { useData } from "@/hooks/useData"
import { AppStackScreenProps } from "@/navigators"
import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/repository/BrandResponse"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { ModelSelectItem } from "./ModelSelectItem"

// import { useNavigation } from "@react-navigation/native"

interface ModelsScreenProps extends AppStackScreenProps<"Models"> {}

export const ModelsScreen: FC<ModelsScreenProps> = ({ route: { params } }) => {
  const { id } = params ?? { id: "" }
  const { themed } = useAppTheme()
  const [input, setInput] = useState("")
  const { data, isError, mutate, isLoading } = useData("models", () =>
    brandRepository.getModelsByBrand(id),
  )

  if (!id) {
    return (
      <Screen style={$root} preset="scroll">
        <Text text="Id is required" />
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

  const renderListItem = ({ item }: { item: BrandResponse }) => <ModelSelectItem item={item} />

  return (
    <Screen style={$root} preset="scroll">
      <View style={themed($topContainer)}>
        <TextField placeholder={"Busca..."} value={input} onChangeText={setInput} />
        <ListView data={filteredData} renderItem={renderListItem} />
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxl,
})
