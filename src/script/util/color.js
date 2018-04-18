/**
 * Created by Godfery on 2016/8/10 0010.
 */

const less = require('less');
const Color = less.tree.Color;

/**
 *
 * @param {Sting} baseColor - 基色
 * @returns {Array}
 */
module.exports.computeColors = function (baseColor) {
  const levels = [0.9, 0.7, 0.5, 0.333, 0.166, 0, -0.125, -0.25, -0.375, -0.5];
  return levels.map((level) => shadeColor(baseColor, level));
}

/**
 * less颜色转换
 * @param baseColor
 * @returns {Array}
 */
module.exports.lessComputeColors = function (baseColor) {
  const levels = [5, 10, 17];
  return levels.map((level) => darkenColor(baseColor, level));
}

/**
 * 计算色阶
 * @param baseColor - 基色
 * @returns {*[]}
 */
module.exports.calcColors = function (baseColor) {
  return [...module.exports.computeColors(baseColor), ...module.exports.lessComputeColors(baseColor)];
}

/*
 * Color utility functions
 * Source: http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * Github: https://github.com/mbitson/mcg
 */
function shadeColor(color, percent) {
  let f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = f >> 8 & 0x00FF,
    B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16)
                                                                                                                                            .slice(1);
}

/***
 * 获取less的function
 * @param name
 * @returns {*}
 */
function lessFunc(name) {
  return less.functions.functionRegistry.get(name);
}

function darkenColor(baseColor, amount) {
  baseColor = baseColor.split('#').join('');
  baseColor = new Color(baseColor);
  const darken = lessFunc('darken');
  baseColor = '#' + darken(baseColor, { value: amount }).toARGB().substr(3, 9);
  return baseColor;
}
