# useEventListener

> **Note:** This guide demonstrates a custom implementation for learning purposes. For production applications, consider using [VueUse's useEventListener](https://vueuse.org/core/useEventListener/) from their excellent [utility collection](https://vueuse.org/). The VueUse version offers additional features and SSR support.

Efficiently add event listeners to DOM elements or global objects with automatic cleanup when the component unmounts. This composable handles common use cases like tracking scroll position, window resizing, keyboard input, or custom DOM events.

## Function Definition

```ts
import { onMounted, onUnmounted, toValue } from "vue";
import type { MaybeRef } from "vue";

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
    const el = toValue(target);
    el?.removeEventListener(event, handler, options);
  };

  onMounted(() => {
    const el = toValue(target);
    el?.addEventListener(event, handler, options);
  });

  onUnmounted(() => {
    cleanup();
  });

  return cleanup;
}
```

## Usage Example

```ts
import { useEventListener } from "./composables/useEventListener";

const element = ref<HTMLElement | null>(null);

// Listen for click events on a specific element
useEventListener(element, "click", () => {
  console.log("Element clicked!");
});

// Listen for window resize events
useEventListener(window, "resize", () => {
  console.log("Window resized!");
});
```

### Notes:

- The composable accepts both direct EventTarget objects and refs (via MaybeRef type)
- Automatically cleans up event listeners when the component is unmounted
- Works with any DOM element, window, document, or other event targets
- Supports standard addEventListener options (capture, passive, once, etc.)
- Can be used with both native DOM events and custom events

## Use Cases

### Keyboard Shortcuts

```ts
import { ref } from "vue";
import { useEventListener } from "./composables/useEventListener";

export default {
  setup() {
    const isCtrlPressed = ref(false);

    useEventListener(window, "keydown", (e: KeyboardEvent) => {
      // Handle Ctrl+S for save
      if (e.key === "s" && e.ctrlKey) {
        e.preventDefault();
        saveDocument();
      }

      // Track modifier key state
      if (e.key === "Control") {
        isCtrlPressed.value = true;
      }
    });

    useEventListener(window, "keyup", (e: KeyboardEvent) => {
      if (e.key === "Control") {
        isCtrlPressed.value = false;
      }
    });

    const saveDocument = () => {
      console.log("Document saved!");
    };

    return { isCtrlPressed };
  },
};
```

### Scroll Position Tracking

```ts
import { ref, computed } from "vue";
import { useEventListener } from "./composables/useEventListener";

export default {
  setup() {
    const scrollY = ref(0);
    const isScrollingDown = ref(false);
    const lastScrollY = ref(0);

    useEventListener(
      window,
      "scroll",
      () => {
        scrollY.value = window.scrollY;
        isScrollingDown.value = scrollY.value > lastScrollY.value;
        lastScrollY.value = scrollY.value;
      },
      { passive: true }
    );

    const scrollProgress = computed(() => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? Math.min(scrollY.value / docHeight, 1) : 0;
    });

    return { scrollY, isScrollingDown, scrollProgress };
  },
};
```

### Click Outside Detection

```ts
import { ref } from "vue";
import { useEventListener } from "./composables/useEventListener";

export default {
  setup() {
    const dropdown = ref<HTMLElement | null>(null);
    const isOpen = ref(false);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    // Close dropdown when clicking outside
    useEventListener(window, "click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdown.value && !dropdown.value.contains(target) && isOpen.value) {
        isOpen.value = false;
      }
    });

    return { dropdown, isOpen, toggle };
  },
};
```

### Dynamic Event Handling

```ts
import { ref, computed } from "vue";
import { useEventListener } from "./composables/useEventListener";

export default {
  setup() {
    const isTouch = ref(false);
    const eventType = computed(() => (isTouch.value ? "touchstart" : "click"));
    const button = ref<HTMLButtonElement | null>(null);

    // Detect touch device
    useEventListener(
      window,
      "touchstart",
      () => {
        isTouch.value = true;
      },
      { once: true }
    );

    // Use computed event type
    useEventListener(button, eventType.value, (e) => {
      console.log(`Button activated via ${eventType.value}`);
    });

    return { button };
  },
};
```

### Media Query Change Detection

```ts
import { ref } from "vue";
import { useEventListener } from "./composables/useEventListener";

export default {
  setup() {
    const isMobile = ref(window.matchMedia("(max-width: 768px)").matches);

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    useEventListener(mediaQuery, "change", (e: MediaQueryListEvent) => {
      isMobile.value = e.matches;
    });

    return { isMobile };
  },
};
```

### Removing Event Listeners Manually

```ts
import { ref } from "vue";
import { useEventListener } from "./composables/useEventListener";

export default {
  setup() {
    const count = ref(0);
    const maxClicks = 5;

    // Store the cleanup function
    const cleanup = useEventListener(window, "click", () => {
      count.value++;

      // Remove the event listener after maxClicks
      if (count.value >= maxClicks) {
        cleanup();
        console.log("Click listener removed after 5 clicks");
      }
    });

    return { count };
  },
};
```
