export const nameToInitials = (displayName) => {
  return displayName.match(/\b\w/g).shift() + displayName.match(/\b\w/g).pop().toUpperCase()
}

export const getFirstName = (displayName) => {
  return displayName.split(' ').slice(0, -1).join(' ')
}
