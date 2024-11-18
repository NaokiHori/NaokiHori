import numpy as np
from matplotlib import pyplot

SIZE = 100.

def wave():
    width = 0.625 * SIZE
    nwaves = 5
    each_wave_width = width / nwaves
    wave_amp = 0.065 * SIZE
    y = + 0.225 * SIZE
    xs = [
            - 2. * each_wave_width,
            - 1. * each_wave_width,
              0. * each_wave_width,
            + 1. * each_wave_width,
            + 2. * each_wave_width,
            ]
    result = ""
    for i, x in enumerate(xs):
        b = [x - 0.5 * each_wave_width, y]
        e = [x + 0.5 * each_wave_width, y]
        c = [x, y - wave_amp if i % 2 == 0 else y + wave_amp]
        result += f"M{b[0]} {b[1]} S{c[0]} {c[1]}, {e[0]} {e[1]}"
    return result

def spiral(is_left):
    def rotate(p, arg):
        return [
                + p[0] * np.cos(arg) - p[1] * np.sin(arg),
                + p[0] * np.sin(arg) + p[1] * np.cos(arg),
                ]
    def translate(p, dp):
        return [
                p[0] + dp[0],
                p[1] + dp[1],
                ]
    cx = 0.20 * SIZE
    if is_left:
        cx *= - 1.
    cy = - 0.1 * SIZE
    v = 0.01885
    if is_left:
        cy += v * SIZE
    else:
        cy -= v * SIZE
    r = 0.015 * SIZE
    nargs = 32
    argmin = 0.
    argmax = 4. * np.pi
    argmin += 0.125 * np.pi
    argmax += 0.125 * np.pi
    argmin -= np.pi if is_left else 0.
    argmax -= np.pi if is_left else 0.
    args = np.linspace(argmin, argmax, nargs, endpoint=False)
    args = np.array(args[::-1])
    darg = (args[-1] - args[0]) / nargs
    dr = 0.005 * SIZE
    result = ""
    for arg in args:
        b = [r, 0.]
        e = rotate([r + dr, 0.], darg)
        c = [
                0.52 * b[0] + 0.52 * e[0],
                0.52 * b[1] + 0.52 * e[1],
                ]
        b = translate(rotate(b, arg), [cx, cy])
        e = translate(rotate(e, arg), [cx, cy])
        c = translate(rotate(c, arg), [cx, cy])
        result += f"M{b[0]} {b[1]} S{c[0]} {c[1]}, {e[0]} {e[1]}"
        r += dr
    return result

def dump(paths):
    svg_size = 400;
    fill_color = "#fc4"
    stroke_color = "#640"
    result = ""
    result += f"<?xml version=\"1.0\" encoding=\"utf-8\"?>"
    result += f"<svg width=\"{svg_size}px\" height=\"{svg_size}px\" viewBox=\"-{0.5 * SIZE} -{0.5 * SIZE} {SIZE} {SIZE}\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\">"
    result += f"<rect fill=\"{fill_color}\" x=\"{- 0.5 * SIZE}\" y=\"{- 0.5 * SIZE}\" width=\"{SIZE}\" height=\"{SIZE}\">"
    result += f"</rect>"
    for path in paths:
        result += f"<path"
        result += f"  stroke=\"{stroke_color}\""
        result += f"  fill=\"transparent\""
        result += f"  d=\"{path}\""
        result += f"  stroke-width=\"5\""
        result += f"  stroke-linecap=\"round\""
        result += f">"
        result += f"</path>"
    result += f"</svg>"
    with open("output.svg", "w") as f:
        f.write(result)

def main():
    wave_svg = wave()
    spiral_l_svg = spiral(True)
    spirar_r_svg = spiral(False)
    dump([wave_svg, spiral_l_svg, spirar_r_svg])

main()
