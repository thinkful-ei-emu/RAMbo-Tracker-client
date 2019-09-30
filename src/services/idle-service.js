/* This service manages when a user has gone idle */

let _timeoutId;
let _idleCallback = null;
let _notIdleEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart"
];
let _EIGHTPOINTSEVENSIX_MINUTES_IN_MS = 8.76 * 60 * 1000;

const IdleService = {
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback;
  },
  resetIdleTimer() {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _EIGHTPOINTSEVENSIX_MINUTES_IN_MS);
  },
  registerIdleTimerResets() {
    _notIdleEvents.forEach(event =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  unRegisterIdleResets() {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach(event =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  }
};

export default IdleService;
