# Creating a Promise-Based Confirm Modal

This guide demonstrates how to create a **promise-based confirm modal** using a composable to manage the modal state globally. This approach allows you to invoke the modal and await user confirmation seamlessly with `async/await`.

## Step 1: Create the Modal State Composable

Define a composable named `useConfirmModal.ts` to handle the modal's state and provide a function to trigger it.

**`composables/useConfirmModal.ts`**:
```ts
import { reactive } from 'vue';

interface IConfirmModalOptions {
    title: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
}

interface IConfirmModalState {
    visible: boolean;
    resolve: (confirmed: boolean) => void;
    options: IConfirmModalOptions;
}

const defaultOptions: IConfirmModalOptions = {
    title: '',
    message: '',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
};

const confirmModalState = reactive<IConfirmModalState>({
    visible: false,
    resolve: (_confirmed: boolean) => {},
    options: { ...defaultOptions },
});

const useConfirmModal = () => {
    const onConfirm = (options: IConfirmModalOptions) => {
        return new Promise<boolean>((resolve) => {
            confirmModalState.resolve = (confirmed) => {
                resolve(confirmed);
                confirmModalState.visible = false;
                confirmModalState.options = { ...defaultOptions };
            };
            confirmModalState.options = { ...defaultOptions, ...options };
            confirmModalState.visible = true;
        });
    };

    return {
        onConfirm,
    };
};

export { confirmModalState };
export default useConfirmModal;
```

## Step 2: Build the Confirm Modal Component

Create a modal component that listens to the shared state and handles user actions.

**`components/ConfirmModalModule.vue`**:
```vue
<script setup lang="ts">
import { confirmModalState } from '@/composables/useConfirmModal';

const onSubmit = () => {
    confirmModalState.resolve(true);
};

const onCancel = () => {
    confirmModalState.resolve(false);
};
</script>

<template>
    <dialog v-if="confirmModalState.visible" open class="modal-backdrop">
        <div class="modal-content">
            <h2 class="modal-title">{{ confirmModalState.options.title }}</h2>
            <p class="modal-message">{{ confirmModalState.options.message }}</p>
            <div class="modal-actions">
                <button @click="onCancel">
                    {{ confirmModalState.options.cancelText || 'Cancel' }}
                </button>
                <button @click="onSubmit">
                    {{ confirmModalState.options.confirmText || 'Confirm' }}
                </button>
            </div>
        </div>
    </dialog>
</template>
```

## Step 3: Register the Modal Globally

Add the modal component to your app's root layout so it can be accessed globally.

**`App.vue`**:
```vue
<script setup lang="ts">
import ConfirmModalModule from '@/components/ConfirmModalModule.vue';
</script>

<template>
    <!-- Main app layout -->
    <router-view />

    <!-- Global Confirm Modal -->
    <ConfirmModalModule />
</template>
```

## Step 4: Use the Confirm Modal Anywhere

You can now use the modal in any component by importing the composable and calling `onConfirm`.

**Example Usage**:
```vue
<script setup lang="ts">
import useConfirmModal from '@/composables/useConfirmModal';

const { onConfirm } = useConfirmModal();

const handleDelete = async () => {
    const isConfirmed = await onConfirm({
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        cancelText: 'No',
        confirmText: 'Yes, delete',
    });

    if (isConfirmed) {
        // Perform the delete action
        alert('Item deleted');
    } else {
        alert('Action cancelled');
    }
};
</script>

<template>
    <button @click="handleDelete">Delete</button>
</template>
```

---

## Summary

This pattern provides a clean and reusable way to implement confirm modals in Vue 3:

- The composable manages state and returns a promise.
- The modal component listens to shared state and resolves the promise.
- Any component can use it without prop drilling or excessive boilerplate.

With this setup, your confirm modals are now powerful, simple, and reactive!