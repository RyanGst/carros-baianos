import { ListItem, ListView, Screen, Text, TextField } from "@/components"
import { useData } from "@/hooks/useData"
import { AppStackScreenProps } from "@/navigators"
import { brandRepository } from "@/repository/brand.repository"
import { BrandResponse } from "@/repository/BrandResponse"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useMemo, useState } from "react"
import { RefreshControl, View, ViewStyle } from "react-native"

interface BrandScreenProps extends AppStackScreenProps<"Brand"> {}

export const BrandScreen: FC<BrandScreenProps> = ({ navigation }) => {
  const [input, setInput] = useState("")
  const { themed } = useAppTheme()
  const { data, isError, mutate, isLoading } = useData("brand", () => brandRepository.getBrands())

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={isLoading} onRefresh={mutate} progressViewOffset={50} />
  }, [isLoading, mutate])

  if (isError) {
    return (
      <Screen preset="fixed">
        <Text text="Um Error Ocorreu" />
      </Screen>
    )
  }

  const filteredData = data?.filter((item) => item.nome.toLowerCase().includes(input.toLowerCase()))

  const renderListItem = ({ item }: { item: BrandResponse }) => (
    <ListItem
      text={item.nome}
      topSeparator={true}
      bottomSeparator={true}
      height={50}
      onPress={() => {
        navigation.navigate("Models", { id: item.codigo, brandName: item.nome })
      }}
    />
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <TextField placeholder={"Busca..."} value={input} onChangeText={setInput} />
        <ListView data={filteredData} renderItem={renderListItem} refreshControl={refreshControl} />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxl,
})
