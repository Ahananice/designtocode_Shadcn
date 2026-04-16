import type { Preview, Decorator } from '@storybook/react'
import '../src/index.css'
import { ComponentHeader } from './ComponentHeader'

/**
 * Global decorator — prepends the LYRA component header to every story.
 * The header reads `context.title` (e.g. "Components/Button") and
 * displays the last path segment as the component name.
 */
const withComponentHeader: Decorator = (Story, context) => (
  <div>
    <ComponentHeader title={context.title} />
    <Story />
  </div>
)

const preview: Preview = {
  decorators: [withComponentHeader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
