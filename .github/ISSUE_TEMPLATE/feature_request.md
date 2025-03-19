---
name: "✨ Feature Request"
description: "Suggest an idea for this project"
labels: ["enhancement"]
assignees: []
body:
  - type: markdown
    attributes:
      value: "## 🚀 Feature Request\nDescribe the feature you’d like to see."

  - type: textarea
    id: description
    attributes:
      label: "Describe the feature"
      description: "A clear and concise description of what the feature is."
      placeholder: "I would like to have X feature that allows Y."
    validations:
      required: true

  - type: textarea
    id: use-case
    attributes:
      label: "Use case"
      description: "What is the problem this feature would solve?"
      placeholder: "This feature would help in situations where..."
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: "Alternatives considered"
      description: "Have you considered any alternatives?"
      placeholder: "I also thought about doing X instead of Y."
    validations:
      required: false

  - type: textarea
    id: additional-context
    attributes:
      label: "Additional context"
      description: "Any other information?"
      placeholder: "Additional notes or screenshots."
    validations:
      required: false
---