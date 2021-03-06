import deserialize from './deserialize/index'
import info from './info/info-module'
import remote from './remote/index.js'
import serialize from './serialize/serialize-module'
import sounds from './sounds/sounds-module'
import states from './states/states-module'
import transitions from './transitions/index'
import undo from './undo/undo-module'
import { Phonebook } from 'assets/javascript/phonebook/phonebook'
import { ModuleTree } from 'vuex'

/**
 * Initialize the `vuex` modules to be used in the store.
 *
 * Modules:
 * * `store.initial` (Manages the initial state ID)
 * * `store.states` (State machine states and their inherent properties).
 * * `store.transitions` (Transitions between states)
 * * `store.sounds` (Speech and sound files)
 *
 * And these stateless modules:
 * * `serialize`
 * * `deserialize`
 *
 * @param {object} phonebook Initial root state, in phonebook format, to initialize the submodules with initial data
 * @returns {object} `vuex` module for states
 */
export default function createModules (phonebook: Phonebook): ModuleTree<object> {
  return {
    info: info(phonebook),
    deserialize: deserialize(),
    states: states(phonebook),
    transitions: transitions(phonebook.transitions),
    sounds: sounds(phonebook),
    serialize: serialize(),
    remote: remote(),
    undo: undo()
  }
}
