set terminal svg size 400,400 enhanced font 'Arial,12' background 'white'
set output 'Gnuplot.svg'

array extrema[2] = [-1., +3.]

set xrange [-1. : +3.]
set yrange [-1. : +3.]

set xlabel ''
set ylabel ''

unset xtics
unset ytics

set size ratio -1

set style line 1 lc rgb '#ff0000' lw 5
set style line 2 lc rgb '#00ff00' lw 5
set style line 3 lc rgb '#0000ff' lw 5
set style line 4 lc rgb '#000000' lw 5
set style line 5 lc rgb '#aaaaaa' lw 5

set style arrow 1 nohead ls 4
set style arrow 2 nohead ls 5

set arrow from first -1., first  1. to first +3., first 1. as 2
set arrow from first -1., first  2. to first +3., first 2. as 2
set arrow from first  1., first -1. to first  1., first 3. as 2
set arrow from first  2., first -1. to first  2., first 3. as 2

set arrow from first -1., first  0. to first +3., first 0. as 1
set arrow from first  0., first -1. to first  0., first 3. as 1

set border ls 4

plot \
  'red.dat'   u ($1):($2) notitle ls 1 w l, \
  'green.dat' u ($1):($2) notitle ls 2 w l, \
  'blue.dat'  u ($1):($2) notitle ls 3 w l
