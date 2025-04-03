# useEventListener

Efficiently add event listeners to DOM elements or global objects with automatic cleanup when the component unmounts. This composable handles common use cases like tracking scroll position, window resizing, keyboard input, or custom DOM events.

## Function Definition

```ts
import { onMounted, onUnmounted, toValue } from 'vue'
import type { MaybeRef } from 'vue'

/**
 * A composable that registers an event listener on a target when the component is mounted
 * and automatically removes it when the component is unmounted.
 *
 * @param {MaybeRef<EventTarget>} target - A reference to the event target (can be reactive or not).
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param {EventListenerOrEventListenerObject} handler - The function or object that receives a notification when an event occurs.
 * @param {AddEventListenerOptions} [options] - Optional options to customize the event listener behavior.
 * 
 * @return {Function} A cleanup function that removes the event listener when called
 */
export function useEventListener<T extends EventTarget = EventTarget>(
  target: MaybeRef<T>,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
) {
  const cleanup = () => {
    const el = toValue(target)
    el?.removeEventListener(event, handler, options)
  }

  onMounted(() => {
    const el = toValue(target)
    el?.addEventListener(event, handler, options)
  })

  onUnmounted(() => {
    cleanup()
  })

  return cleanup;
}
```

## Usage Example

```ts
import { useEventListener } from './composables/useEventListener'

const element = ref<HTMLElement | null>(null)

// Listen for click events on a specific element
useEventListener(element, 'click', () => {
  console.log('Element clicked!')
})

// Listen for window resize events
useEventListener(window, 'resize', () => {
  console.log('Window resized!')
})
```

### Notes:

- The composable accepts both direct EventTarget objects and refs (via MaybeRef type)
- Automatically cleans up event listeners when the component is unmounted
- Works with any DOM element, window, document, or other event targets
- Supports standard addEventListener options (capture, passive, once, etc.)
- Can be used with both native DOM events and custom events