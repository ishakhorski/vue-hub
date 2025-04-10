# Error Boundaries: Handling Errors Gracefully

Error boundaries are specialized Vue components designed to catch and handle JavaScript errors thrown by their child components without disrupting the entire application. By isolating errors within specific parts of your UI, you can provide a smoother user experience and maintain application stability.

## Why Use Error Boundaries?

In complex applications, errors are inevitable. Consider these scenarios:

- **API failures**: A backend endpoint might return an unexpected result or be temporarily unavailable.
- **Invalid user input**: Users might submit data that your components don’t anticipate.
- **Unhandled edge cases**: Logical errors within a component might trigger runtime exceptions.

Without error boundaries, any of these issues could potentially crash your entire application, frustrating users and complicating debugging efforts. Error boundaries help by:

- Displaying meaningful fallback UI when errors occur.
- Capturing error information for logging and debugging.
- Ensuring one broken component doesn't affect the overall app experience.

## Implementing Basic Error Boundaries in Vue

Here's how to create a straightforward error boundary component:

```vue
<script setup>
import { ref, onErrorCaptured } from "vue";

const hasError = ref(false);

function resetError() {
  hasError.value = false;
}

// Capture errors from child components
onErrorCaptured((err, instance, info) => {
  console.error("Captured error:", err, "Info:", info);
  hasError.value = true;
  // Returning true stops further propagation of the error
  return true;
});
</script>

<template>
  <div>
    <slot v-if="!hasError" />
    <div v-else>
      <p>Oops! Something went wrong.</p>
      <button @click="resetError">Try again</button>
    </div>
  </div>
</template>
```

### Usage Example

Wrap any component that might encounter errors:

```html
<ErrorBoundary>
  <UserProfile />
</ErrorBoundary>
```

## Understanding `onErrorCaptured`

- **Purpose**: Captures errors emitted from child components within the tree.
- **Control flow**:
  - Returning `true` stops the error from propagating further.
  - Returning `false` or nothing allows Vue to propagate the error to higher-level error handlers.

## Advanced Usage: Reporting Errors to Logging Services

Error boundaries can be easily integrated with services like Sentry, Bugsnag, or custom logging solutions:

```js
import { ref, onErrorCaptured } from "vue";
import { sendErrorToLoggingService } from "./loggingService";

const hasError = ref(false);

onErrorCaptured((err, instance, info) => {
  sendErrorToLoggingService({
    error: err,
    componentName: instance?.type?.name || "AnonymousComponent",
    info,
  });
  hasError.value = true;
  return true;
});
```

## Real-World Use Cases

### Case 1: Isolating Dashboard Widgets

If one widget fails, the rest of the dashboard remains operational.

```html
<Dashboard>
  <ErrorBoundary>
    <SalesWidget />
  </ErrorBoundary>
  <ErrorBoundary>
    <UserActivityWidget />
  </ErrorBoundary>
</Dashboard>
```

### Case 2: Safe Third-party Integrations

Use error boundaries when embedding external components or widgets:

```html
<ErrorBoundary>
  <ExternalPaymentGateway />
</ErrorBoundary>
```

### Case 3: Incremental Feature Deployment

Wrap new or experimental features, so issues do not affect the entire app:

```html
<ErrorBoundary>
  <ExperimentalChatbot />
</ErrorBoundary>
```

## Tips and Best Practices

- **Scope appropriately**: Don't wrap your entire app in one error boundary; isolate logical sections.
- **Fallback UI**: Provide clear, user-friendly messages to explain issues and possible next steps (e.g., retry buttons).
- **Error logging**: Always log detailed errors to assist in troubleshooting.
- **Combine with other Vue features**:
  - Use with `<Suspense>` for managing asynchronous components and loading states.
  - Combine with `v-if` conditions for dynamic error handling.

## Limitations

While powerful, error boundaries have specific limitations:

- They **don’t catch asynchronous errors** from:
  - Promises
  - Callbacks (like `setTimeout`)
  - Non-Vue JavaScript code running outside the component tree.
- They only handle errors originating from **child components**, not from siblings or parent components.

## Conclusion

Error boundaries significantly enhance your Vue applications by isolating errors, providing graceful recovery, and improving overall resilience. Adopt them strategically to enhance user experience and simplify debugging.

## Further Reading

- [Vue Official Docs: Handling Errors](https://vuejs.org/guide/scaling-up/error-handling.html)
- [Vue API Reference for `onErrorCaptured`](https://vuejs.org/api/options-lifecycle.html#onerrorcaptured)
- [Integrating Error Boundaries with External Logging Services](https://docs.sentry.io/platforms/javascript/guides/vue/)
