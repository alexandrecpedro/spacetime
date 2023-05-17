import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, View } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NLWLogo from './src/assets/nlw-spacetime-logo.svg'
import { styled } from 'nativewind'

const StyledStripes: ForwardRef<unknown, any> = styled(Stripes)

export default function App() {
  // REACT HOOKS
  // (1) useFonts
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time capsule
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Collect remarkable moments of your journey and share (if you like)
            with the world!
          </Text>
        </View>
        <Text className="text-6xl font-bold text-zinc-50">Rocketseat</Text>
        <StatusBar style="light" translucent />
      </View>
    </ImageBackground>
  )
}
