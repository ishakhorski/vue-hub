---
name: "🐛 Bug Report"
description: "Report a bug to help us improve"
labels: ["bug"]
assignees: []
body:
  - type: markdown
    attributes:
      value: "## 🐞 Bug Report\nA clear and concise description of the problem."

  - type: textarea
    id: description
    attributes:
      label: "Describe the bug"
      description: "A clear and concise description of what the bug is."
      placeholder: "When I try to do X, Y happens instead of Z."
    validations:
      required: true

  - type: textarea
    id: steps-to-reproduce
    attributes:
      label: "Steps to reproduce"
      description: "Steps to reproduce the behavior"
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true

  - type: textarea
    id: expected-behavior
    attributes:
      label: "Expected behavior"
      description: "What did you expect to happen?"
      placeholder: "I expected X to happen but instead Y happened."
    validations:
      required: true

  - type: textarea
    id: actual-behavior
    attributes:
      label: "Actual behavior"
      description: "What actually happened?"
      placeholder: "Describe what happened."
    validations:
      required: true

  - type: textarea
    id: additional-context
    attributes:
      label: "Additional context"
      description: "Any other information?"
      placeholder: "Any more details?"
    validations:
      required: false
---