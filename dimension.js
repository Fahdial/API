import {Dimensions, PixelRatio} from 'react-native'

export const h = Dimensions.get('window').height
export const w = Dimensions.get('window').width

export const customIconSize = (value) => {
  let customSize = h / (1 / (value/2960))

  return customSize
}

export const calcHeight = x => PixelRatio.roundToNearestPixel((h * x) / 100)
export const calcWidth = x => PixelRatio.roundToNearestPixel((w * x) / 100)