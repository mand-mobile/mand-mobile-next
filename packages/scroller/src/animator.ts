import {
  getNow,
  requestAnimationFrame
} from './utils'

type RunningList = {
  [prop: string]: boolean | null
}

const desiredFrames = 60
const millisecondsPerSecond = 1000

export default class Animator {
  private running: RunningList = {}
  private counter: number = 1
  forceStopped: boolean

  start(
    stepCallback: Function,
    verifyCallback: Function | null, 
    completedCallback: Function | null,
    duration?: number,
    easingFn?: Function
  ) {
    const start = getNow()
    let lastFrame = start
    let percent = 0
    let dropCounter = 0
    const id = this.counter++

    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
      const newRunning: RunningList = {}
      for (const usedId in this.running) {
        newRunning[usedId] = true
      }
      this.running = newRunning
    }
    
    // This is the internal step method which is called every few milliseconds
    const step = (virtual?: any) => {
      // Normalize virtual value
      const render = virtual !== true

      // Get current time
      const now = getNow()
      
      // Verification is executed before next animation step
      if (!this.running[id] || (verifyCallback && !verifyCallback(now, id))) {
        this.running[id] = null
        completedCallback &&
          completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false)
        return
      }
      
      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state variables up-to-date with progress in time.
      if (render) {
        const droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
        for (let j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      } else {
        percent = 1
      }

      // Execute step callback, then...
      let value = easingFn ? easingFn(percent) : percent
      value = isNaN(value) ? 0 : value
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        this.running[id] = null
        completedCallback &&
          completedCallback(
            desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond),
            id,
            percent === 1 || duration == null,
          )
      } else if (render) {
        lastFrame = now
        requestAnimationFrame(step)
      }
    }

    // Mark as running
    this.running[id] = true
  
    // Init first step
    requestAnimationFrame(step)

    // Return unique animation ID
    return id
  }

  stop(id: number) {
    const cleared = this.running[id] != null
    if (cleared) {
      this.running[id] = null
      this.setForceStopped(true)
    }
    return cleared
  }

  setForceStopped(forceStopped: boolean) {
    this.forceStopped = forceStopped
  }

  isRunning(id: number) {
    return this.running[id] != null
  }
}

export const easeOutCubic = (per: number) => {
  return Math.pow(per - 1, 3) + 1
}

export const easeInOutCubic = (per: number) => {
  if ((per /= 0.5) < 1) {
    return 0.5 * Math.pow(per, 3)
  }

  return 0.5 * (Math.pow(per - 2, 3) + 2)
}

export const ease: any = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function(t: number) {
      return 1 + --t * t * t * t * t
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function(t: number) {
      return t * (2 - t)
    }
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function(t: number) {
      return 1 - --t * t * t * t
    }
  }
}