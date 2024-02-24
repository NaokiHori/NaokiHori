package util

import (
	"sort"
)

type OrderedDict[T any] struct {
	Key   string
	Value T
}

func CreateOrderedDict[T float64 | uint](elems map[string]T) []OrderedDict[T] {
	var result []OrderedDict[T]
	for key, value := range elems {
		result = append(result, OrderedDict[T]{Key: key, Value: value})
	}
	sort.Slice(result, func(i int, j int) bool {
		return result[j].Value < result[i].Value
	})
	return result
}
