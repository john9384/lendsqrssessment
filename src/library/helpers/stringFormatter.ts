export const capitalizeString = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase()

export const lowerCase = (str: string): string => str.toLowerCase()

export const upperCase = (str: string): string => str.toUpperCase()
