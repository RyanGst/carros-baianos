import { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { ListView, Screen, Text, TextField } from "@/components"
import { useData } from "@/hooks/useData"
import { brandRepository } from "@/repository/brand.repository"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

// import { useNavigation } from "@react-navigation/native"

interface ModelsScreenProps extends AppStackScreenProps<"Models"> {}

export const ModelsScreen: FC<ModelsScreenProps> = ({ route: { params } }) => {
  const { id } = params ?? { id: "" }
  const { themed } = useAppTheme()
  const [input, setInput] = useState("")

  if (!id) {
    return (
      <Screen style={$root} preset="scroll">
        <Text text="Id is required" />
      </Screen>
    )
  }

  const { data, isError } = useData("models", () => brandRepository.getModelsByBrand(id))

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

  const renderListItem = ({ item }) => <Text text={item.nome} />

  return (
    <Screen style={$root} preset="fixed">
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
