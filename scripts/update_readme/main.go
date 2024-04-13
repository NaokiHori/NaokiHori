package main

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	var mypaths *MyPaths = ParseArgs()
	Create(mypaths)
}
