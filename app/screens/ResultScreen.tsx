import { Button, Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { aiRepository } from "@/repository/ai.repository"
import { FC, useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface ResultScreenProps extends AppStackScreenProps<"Result"> {}

export const ResultScreen: FC<ResultScreenProps> = ({ route, navigation }) => {
  const [roast, setRoast] = useState<{ title: string; content: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { brand, model, year } = route.params

  useEffect(() => {
    generateRoast()
  }, [])

  async function generateRoast() {
    console.log("generateRoast", { brand, model, year })

    try {
      setIsLoading(true)
      const response = await aiRepository.generateCarRoast({ brand, model, year })
      setRoast(response)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Screen style={$root} preset="fixed">
      <SafeAreaView style={$container}>
        {roast ? (
          <>
            <Text preset="heading" text={roast.title} style={$title} />
            <Text text={roast.content} style={$content} />
            <Button text="Tentar novamente" onPress={generateRoast} style={$button} />
          </>
        ) : (
          <>
            <Text text={isLoading ? "Gerando roast..." : "Erro ao gerar roast"} />
            <Button text="Voltar" onPress={navigation.goBack} style={$button} />
          </>
        )}
      </SafeAreaView>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $container: ViewStyle = {
  padding: 16,
  flex: 1,
}

const $title: ViewStyle = {
  marginBottom: 16,
}

const $content: ViewStyle = {
  marginBottom: 24,
}

const $button: ViewStyle = {
  marginTop: "auto",
}
