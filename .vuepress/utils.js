function genChildTitle (base, ...title) {
  return title.map(item => {
    return `${base}${item}`
  })
}

module.exports = {
  genChildTitle
}