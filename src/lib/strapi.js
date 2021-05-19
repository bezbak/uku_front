import isEmpty from '../lib/utils/isEmpty'
import last from '../lib/utils/last'

export const getImage = (image, size) => {
  if (isEmpty(image.formats) || !size) {
    return {
      url: image.url,
      alt: image.alternativeText,
    }
  }
}

const parseComponentName = (name) => {
  const nameParts = String(name).split('.')
  return last(nameParts).replace(/-/g, '_');
}

export const parseDynamicComponents = (pageData, dynamicKey) => {
  if (!pageData[dynamicKey]) {
    return pageData;
  }

  return {
    ...pageData,
    [dynamicKey]: pageData[dynamicKey].reduce((acc, section) => {
      const name = parseComponentName(section.__component);
      acc[name] = section
      return acc;
    }, {})
  }
}