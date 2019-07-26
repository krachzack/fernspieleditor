import uuid from '../../util/random/uuid.js'
import random from '../../util/random/text.js'
import defaultSound from './default-sound.js'

export default function startupPhonebook () {
  const ringAgainLaterStateId = uuid()
  const ringingStateId = uuid()
  const speakingStateId = uuid()
  const greetingSoundId = uuid()

  return {
    /// Name of the currently focused state or null if nothing selected.
    focusedStateId: null,
    initial: ringingStateId,
    states: states(),
    transitions: transitions(),
    sounds: sounds(),
    vendor: {
      // fernspieleditor additions to the core format
      fernspieleditor: vendor()
    }
  }

  function states () {
    return {
      [ringAgainLaterStateId]: {
        name: 'Pause',
        description: 'Does nothing for a while and rings again afterwards',
        sounds: [],
        ring: 0.0,
        terminal: false
      },
      [ringingStateId]: {
        name: 'Ring',
        description: '',
        sounds: [],
        ring: 0.5,
        terminal: false
      },
      [speakingStateId]: {
        name: 'Introduce',
        description: '',
        sounds: [ greetingSoundId ],
        ring: 0.0,
        terminal: false
      }
    }
  }

  function transitions () {
    return {
      any: {
        pick_up: speakingStateId,
        hang_up: ringAgainLaterStateId
      },
      [ringAgainLaterStateId]: {
        timeout: {
          after: 60.0,
          to: ringingStateId
        }
      },
      [ringingStateId]: {
        timeout: {
          after: 1.5,
          to: ringingStateId
        }
      },
      [speakingStateId]: {
        timeout: {
          after: 5.0,
          to: speakingStateId
        }
      }
    }
  }

  function sounds () {
    return {
      [greetingSoundId]: {
        ...defaultSound(),
        name: 'Introduction',
        volume: 0.9,
        backoff: 0.2,
        loop: false,
        speech: `Hey there! This is ${random.name()} speaking.... You know, the ${random.adjective()} ${random.job()} from bowling. We often talked about ${random.topic()} back in the eighties.`
      }
    }
  }

  function vendor () {
    return {
      any: {
        network: {
          position: {
            x: 100,
            y: 100
          }
        }
      },
      [ringAgainLaterStateId]: {
        network: {
          position: {
            x: 300,
            y: 100
          }
        }
      },
      [ringingStateId]: {
        network: {
          position: {
            x: 500,
            y: 100
          }
        }
      },
      [speakingStateId]: {
        network: {
          position: {
            x: 500,
            y: 300
          }
        }
      }
    }
  }
}