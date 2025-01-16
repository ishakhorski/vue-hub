# Understanding `refDebounced` and `watchDebounced`

VueUse is a collection of essential utilities for Vue 3, providing reactive utilities and abstractions to simplify development. Among its features, `refDebounced` and `watchDebounced` are particularly useful for optimizing reactivity by controlling how frequently changes propagate. Here's an overview of these utilities and when to use them.

## What is `refDebounced`?

The `refDebounced` is a utility that creates a debounced version of a reactive reference (ref). Debouncing means that updates to the reactive value are delayed until a specified period of inactivity (the debounce duration). This is especially helpful in scenarios where frequent updates could overwhelm the system or lead to inefficient computations.

### Syntax

```sh
import { refDebounced } from '@vueuse/core';

const debouncedRef = refDebounced(originalRef, delay);
```

- **originalRef**: The source reactive ref.
- **delay**: The debounce duration in milliseconds.

### Use Cases

- **Input Validation**: When building forms, you might want to debounce updates to prevent validation logic from running on every keystroke.
- **API Calls**: To avoid sending a request for each change, you can debounce updates to wait until the user stops typing.
- **Performance Optimization**: Reduces the frequency of updates to components or complex computations, improving performance.

### Example

```sh
import { ref, computed } from 'vue';
import { refDebounced } from '@vueuse/core';

const searchQuery = ref('');
const debouncedQuery = refDebounced(searchQuery, 300);

watch(debouncedQuery, (newQuery) => {
  console.log(`Search API called with query: ${newQuery}`);
});
```

## What is `watchDebounced`?

The `watchDebounced` is a wrapper around Vue's watch function that adds debounce functionality to the watcher. Instead of firing immediately on reactive changes, the callback is delayed until the source stops changing for the specified debounce duration.

```sh
import { watchDebounced } from '@vueuse/core';

watchDebounced(source, callback, { debounce });
```

- **source**: The reactive reference or getter to watch.
- **callback**: A function to execute after the debounce delay.
- **debounce**: The delay in milliseconds.

### Use Cases

- **Complex Watch Logic**: Use it when the watch logic involves expensive computations or asynchronous tasks.
- **Avoid Rapid Triggering**: Prevent watchers from being triggered repeatedly during rapid updates.
- **Smooth User Experience**: Use it in scenarios where instantaneous updates might be disruptive, like UI animations or input-driven updates.

### Example

```sh
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';

const searchQuery = ref('');

watchDebounced(
  searchQuery,
  (newQuery) => {
    console.log(`Debounced watcher triggered: ${newQuery}`);
  },
  { debounce: 300 }
);
```

## Choosing Between `refDebounced` and `watchDebounced`

Use `refDebounced` when you want to create a debounced version of a ref to share across multiple components or logics. It's suitable for when the debounced value needs to be part of the reactivity system.

Use `watchDebounced` when you want to debounce the execution of a watcher callback rather than creating a debounced reactive reference.

## Conclusion

Both `refDebounced` and `watchDebounced` are powerful tools in the VueUse library that help manage reactivity more efficiently. They reduce unnecessary computations or updates, improve performance, and enhance the user experience in applications. Use them strategically based on whether you need a debounced reactive reference or a debounced watcher.
