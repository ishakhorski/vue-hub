# useHasPermission

This utility function helps determine if a user has a specific permission by leveraging Vue's reactivity system.

## Function Definition

```ts
import { computed, toValue } from 'vue'
import type { MaybeRef } from 'vue'

/**
 * Checks if the user has the required permission.
 * 
 * @param userPermissions - A reactive reference or plain array of user permissions.
 * @param requiredPermission - The permission to check for.
 * @returns A computed boolean indicating if the user has the required permission.
 */
export const useHasPermission = (
    userPermissions: MaybeRef<UserPermission[]>,
    requiredPermission: UserPermission
) => {
    return computed<boolean>(() => {
        const permissions = toValue(userPermissions) ?? []
        return permissions.includes(requiredPermission)
    })
}
```

## Usage Example

```ts
import { ref } from 'vue'

enum UserPermission {
    View = 'View',
    Edit = 'Edit',
}

// Define a reactive reference for user permissions, typically fetched from a user model or JWT token.
const userPermissions = ref<UserPermission[]>([UserPermission.View])

const isCanView = useHasPermission(userPermissions, UserPermission.View) // isCanView.value === true
```

### Notes:
- The `MaybeRef` type allows the function to accept both reactive and non-reactive inputs for `userPermissions`.
- Ensure that the `requiredPermission` matches the type and value of the items in `userPermissions`.
- The `toValue` utility is used to handle both reactive and non-reactive inputs seamlessly.
- The example demonstrates the use of an `enum` for managing permissions, which improves code readability and maintainability.
