package main

const DEBUG bool = false

type Lang struct {
	Key   string
	Value float64
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	var mypaths *MyPaths = ParseArgs()
	var langs *[]Lang
	if DEBUG {
		tmp := []Lang{
			Lang{Key: "C", Value: 1.630016e+06},
			Lang{Key: "Rust", Value: 188524},
			Lang{Key: "Python", Value: 106367},
			Lang{Key: "TypeScript", Value: 52007},
			Lang{Key: "Shell", Value: 15867},
			Lang{Key: "Makefile", Value: 15867},
			Lang{Key: "CSS", Value: 13987},
			Lang{Key: "HTML", Value: 10593},
			Lang{Key: "Go", Value: 8165},
			Lang{Key: "Vim Script", Value: 3225},
			Lang{Key: "Gnuplot", Value: 412},
			Lang{Key: "Dockerfile", Value: 311},
		}
		langs = &tmp
	} else {
		langs = FetchData()
	}
	CreateCard(mypaths, langs)
}
