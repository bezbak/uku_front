export const stylesForSmall = image => {
  if (image.length) {
    return {
      background: `url("${image[0].image}") no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: 'center',
      alignItems: 'flex-end',
      objectFit: "contain",
    }
  } else {
    return {
      background: `url("/images/placeholder.svg") no-repeat`,
      backgroundSize: "contain",
      backgroundPosition: 'center',
      alignItems: 'flex-end',
      objectFit: "contain",
      fill: "#667689",
    }
  }

}

export const stylesForBlurBackgroundSmall = {
  width: "100%",
  height: "60%",
}

export const stylesForDescriptionSmall = {
  top: "120px",
  left: "0px",
}
