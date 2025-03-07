import { ListItem, ListView, Screen, Text, TextField } from "@/components"
import { useData } from "@/hooks/useData"
import { AppStackScreenProps } from "@/navigators"
import { brandRepository } from "@/repository/brand.repository"
import { $styles, type ThemedStyle } from "@/theme"
import { BrandResponse } from "@/types/BrandResponse"
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

  const navigateToModels = (item: BrandResponse) => {
    navigation.navigate("Models", { brandId: item.codigo, brandName: item.nome })
  }

  const renderListItem = ({ item }: { item: BrandResponse }) => (
    <ListItem
      text={item.nome}
      topSeparator={true}
      bottomSeparator={true}
      height={50}
      onPress={() => navigateToModels(item)}
    />
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <TextField placeholder={"Busca..."} value={input} onChangeText={setInput} />
        <ListView
          data={filteredData}
          renderItem={renderListItem}
          refreshControl={refreshControl}
          estimatedItemSize={52}
        />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxxl,
})
