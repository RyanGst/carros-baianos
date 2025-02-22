import { Button, ListView, Screen, Text, TextField } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { brandRepository } from "@/repository/brand.repository"
import { $styles, ThemedStyle } from "@/theme"
import { BrandResponse } from "@/types/BrandResponse"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useCallback } from "react"
import { View, ViewStyle } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { useModelsScreen } from "../hooks/useModelsScreen"
import { ModelSelectItem } from "./ModelSelectItem"

interface ModelsScreenProps extends AppStackScreenProps<"Models"> {}

export const ModelsScreen: FC<ModelsScreenProps> = ({ route: { params }, navigation }) => {
  const { brandId: id, brandName } = params ?? { brandId: "", brandName: "" }
  const { themed } = useAppTheme()
  const { input, setInput, selectedModel, setSelectedModel, filteredModels, isLoading, isError } =
    useModelsScreen(id)

  const handleNavigateToResults = useCallback(async () => {
    if (!selectedModel) return

    const params = {
      brandId: selectedModel.brandId,
      modelId: selectedModel.modelId,
      yearId: selectedModel.yearId,
    }

    const vehicleDetails = await brandRepository.getVehicleDetails(params)

    if (!vehicleDetails) return

    navigation.navigate("Result", {
      vehicleDetails,
    })
  }, [navigation, brandName, selectedModel])

  const renderItem = useCallback(
    ({ item }: { item: BrandResponse }) => (
      <ModelSelectItem
        item={item}
        brandId={id}
        selectedModel={selectedModel}
        onSelect={(model) => setSelectedModel(model)}
      />
    ),
    [id, selectedModel, setSelectedModel],
  )

  if (!id) return <ErrorView message="Selecione uma marca primeiro" />
  if (isError) return <ErrorView message="Erro ao carregar modelos" />
  if (isLoading) return <LoadingView />

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <TextField placeholder="Buscar modelo..." value={input} onChangeText={setInput} />
        <ListView
          data={filteredModels}
          renderItem={renderItem}
          keyExtractor={(item) => item.codigo}
        />
      </View>

      {selectedModel && (
        <ActionButtons onClear={() => setSelectedModel(null)} onSubmit={handleNavigateToResults} />
      )}
    </Screen>
  )
}

const ActionButtons = ({ onClear, onSubmit }) => (
  <Animated.View style={$buttonContainer} entering={FadeIn}>
    <Button text="Limpar" onPress={onClear} />
    <Button preset="filled" text="Ver resultados" onPress={onSubmit} />
  </Animated.View>
)

const ErrorView = ({ message }: { message: string }) => (
  <Screen preset="fixed" style={$centerContent}>
    <Text text={message} />
  </Screen>
)

const LoadingView = () => (
  <Screen preset="fixed" style={$centerContent}>
    <Text text="Carregando..." />
  </Screen>
)

const $centerContent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $buttonContainer: ViewStyle = {
  position: "absolute",
  bottom: "20%",
  left: 0,
  right: 0,
  flexDirection: "row",
  gap: 10,
  justifyContent: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 1,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxxl,
})
