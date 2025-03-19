---
name: "📚 Documentation Issue"
description: "Report an issue with the project documentation"
labels: ["documentation"]
assignees: []
body:
  - type: markdown
    attributes:
      value: "## 📖 Documentation Issue\nHelp us improve the documentation!"

  - type: textarea
    id: description
    attributes:
      label: "Describe the issue"
      description: "What part of the documentation needs improvement?"
      placeholder: "The docs on X are unclear/missing information."
    validations:
      required: true

  - type: textarea
    id: suggested-improvements
    attributes:
      label: "Suggested improvement"
      description: "How should we improve the documentation?"
      placeholder: "I suggest adding more examples for X."
    validations:
      required: false

  - type: textarea
    id: additional-context
    attributes:
      label: "Additional context"
      description: "Any other information?"
      placeholder: "Any more details?"
    validations:
      required: false
---