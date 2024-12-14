import React, { FC } from "react"
import { TextInput, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text, TextField, ListView, ListItem } from "@/components"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

// import { useNavigation } from "@react-navigation/native"

interface BrandScreenProps extends AppStackScreenProps<"Brand"> {}

export const BrandScreen: FC<BrandScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { themed, theme } = useAppTheme()

  const brand = ["Acura", "Alfa Romeo"]
  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <TextField placeholder={"Busca..."} />
        <ListView
          data={brand}
          renderItem={({ item }) => (
            <ListItem tx={item} topSeparator={true} bottomSeparator={true} height={50} />
          )}
        />
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
