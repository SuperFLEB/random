import type ValueFrom from "./ValueFrom.js";

// There are, annoyingly enough, 63 characters that can be used in both JavaScript and XML identifiers. To get an even
// 64 and be able to do modulo-based conversion without rerolls, the user will need to pick a character set based on
// intended uses. Note that some uses may still need to be prefixed with a first-character valid character to be used
// as an identifier (in case the first character is a number, for instance).

const almostCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789";

export const RandomCharSet = Object.freeze({
	// Characters allowed in XML IDs (requires prefix)
	xml: almostCharset + "-",
	// Characters allowed in JavaScript variables (requires prefix)
	js: almostCharset + "$",
	// Universally valid characters, but two values map to underscores.
	biased: almostCharset + "_",
	// 32 valid alphabetical characters
	alpha32: almostCharset.slice(0, 32),
	// Hexadecimal
	hex: "0123456789abcdef",
	// Hexadecimal uppercase
	hexUpper: "0123456789ABCDEF",
} as const);

const chars = (length = 5, prefix = "", suffix = "", charset: ValueFrom<typeof RandomCharSet> = RandomCharSet.biased) =>
	prefix +
	Array.from(crypto.getRandomValues(new Uint8Array(length)))
		.map((char) => charset[char % charset.length])
		.join("") +
	suffix;

export default chars;
