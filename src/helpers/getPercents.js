export function getPercent(a, b) {
  return parseFloat(((a * 100) / b).toFixed(1)) || 0
}

export function getRelativePercent(percent, size) {
  let mult = 440
  if (size === 'small') {
    mult = 293.93
  } else if (size === 'medium') {
    mult = 440
  } else if (size === 'large') {
    mult = 645.33
  }

  return parseFloat((mult - (mult * percent) / 100).toFixed(2)) || 0
}
