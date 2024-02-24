package util

func DefineFont(height float64) Size {
	// assume Courier-new, whose aspect ratio is known
	const ratio = 0.607
	width := height * ratio
	return Size{
		Height: height,
		Width:  width,
	}
}
