import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { View, ViewStyle } from "react-native";

export const AccordionContent = ({
  isExpanded,
  children,
}: {
  isExpanded: Animated.SharedValue<boolean>
  children: React.ReactNode
}) => {
  const height = useSharedValue(0)

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * (isExpanded.value ? 1 : 0), {
      duration: 300,
    }),
  )

  const animatedStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
    overflow: "hidden",
  }))

  return (
    <Animated.View style={animatedStyle}>
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height
        }}
        style={$wrapper}
      >
        {children}
      </View>
    </Animated.View>
  )
}
const $wrapper: ViewStyle = {
  width: "100%",
  position: "absolute",
}

