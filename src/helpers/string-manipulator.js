export function nameToInitials(displayName) {
  return displayName.match(/\b\w/g).shift() + displayName.match(/\b\w/g).pop().toUpperCase()
}

export const getFirstName = (displayName) => {
  const fullName = displayName

  const names = fullName.split(' ')

  if (names.length > 1) {
    return names.slice(0, -1).join(' ')
  } else {
    return fullName
  }
}
