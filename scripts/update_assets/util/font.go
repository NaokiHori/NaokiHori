package util

// assume Courier-new, whose aspect ratio is known
const ratio = 0.607

func GetFontHeight(size float64) float64 {
	return size
}

func GetFontWidth(size float64) float64 {
	return size * ratio
}
