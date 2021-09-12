export const cb = (entry, setData) => {
  if (entry.isIntersecting) {
    setData(old => ({...old, currentPage: old.currentPage + 1}))
  }
}

export const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
}