import bcrypt from 'bcryptjs'

export const bcryptEncode = (text: string): string => bcrypt.hashSync(text, 10)

export const bcryptCompare = (text?: string, hash?: string): boolean => {
	if (!text || !hash) return false
	return bcrypt.compareSync(text, hash)
}
