export const checkUpper = (upper: number) => {
    if (upper <= 370 && upper >= 50) {
      return true
    } else {
      return false
    }
  }

  export const checkLower = (lower: number) => {
    if (lower >= 20 && lower <= 360) {
      return true
    } else {
      return false
    }
  }

  export const checkPulse = (pulse: number) => {
    if (pulse >= 26 && pulse <= 600) {
      return true
    } else {
      return false
    }
  }