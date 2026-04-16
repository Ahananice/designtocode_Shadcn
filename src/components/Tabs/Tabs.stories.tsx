import type { Meta, StoryObj } from '@storybook/react'
import { Box } from 'lucide-react'
import { Tabs } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['compact', 'full'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const baseItems = [
  { value: 'tab1', label: 'First Tab',  content: <p className="text-sm text-muted-foreground">First Tab content</p>  },
  { value: 'tab2', label: 'Second Tab', content: <p className="text-sm text-muted-foreground">Second Tab content</p> },
  { value: 'tab3', label: 'Third Tab',  content: <p className="text-sm text-muted-foreground">Third Tab content</p>  },
]

/** Compact, left-aligned — top row of the design */
export const Compact: Story = {
  args: { variant: 'compact', orientation: 'horizontal', defaultValue: 'tab1', items: baseItems },
}

/** Full-width horizontal — bottom row of the design */
export const FullHorizontal: Story = {
  args: { variant: 'full', orientation: 'horizontal', defaultValue: 'tab1', items: baseItems },
  decorators: [(Story) => <div style={{ width: 760 }}><Story /></div>],
  parameters: { layout: 'padded' },
}

/** Vertical, compact — tab list on the left, active indicator on the right edge */
export const Vertical: Story = {
  args: { variant: 'compact', orientation: 'vertical', defaultValue: 'tab1', items: baseItems },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
  parameters: { layout: 'padded' },
}

/** Vertical, full-height — list takes equal space vertically */
export const VerticalFull: Story = {
  args: { variant: 'full', orientation: 'vertical', defaultValue: 'tab1', items: baseItems },
  decorators: [(Story) => <div style={{ width: 500, height: 260 }}><Story /></div>],
  parameters: { layout: 'padded' },
}

/** With icons — matches the spec-states panel in the design */
export const WithIcons: Story = {
  args: {
    variant: 'compact',
    orientation: 'horizontal',
    defaultValue: 'tab1',
    items: [
      { value: 'tab1', label: 'Tab Section', icon: <Box className="h-4 w-4" />, content: <p className="text-sm text-muted-foreground">Section 1</p> },
      { value: 'tab2', label: 'Tab Section', icon: <Box className="h-4 w-4" />, content: <p className="text-sm text-muted-foreground">Section 2</p> },
      { value: 'tab3', label: 'Tab Section', icon: <Box className="h-4 w-4" />, content: <p className="text-sm text-muted-foreground">Section 3</p> },
    ],
  },
}

/** Vertical with icons */
export const VerticalWithIcons: Story = {
  args: {
    variant: 'compact',
    orientation: 'vertical',
    defaultValue: 'tab1',
    items: [
      { value: 'tab1', label: 'Tab Section', icon: <Box className="h-4 w-4" />, content: <p className="text-sm text-muted-foreground">Section 1 content</p> },
      { value: 'tab2', label: 'Tab Section', icon: <Box className="h-4 w-4" />, content: <p className="text-sm text-muted-foreground">Section 2 content</p> },
      { value: 'tab3', label: 'Tab Section', icon: <Box className="h-4 w-4" />, content: <p className="text-sm text-muted-foreground">Section 3 content</p> },
    ],
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: { layout: 'padded' },
}

/** Disabled tab */
export const WithDisabled: Story = {
  args: {
    variant: 'compact',
    orientation: 'horizontal',
    defaultValue: 'tab1',
    items: [
      { value: 'tab1', label: 'First Tab',  content: <p className="text-sm text-muted-foreground">First</p>  },
      { value: 'tab2', label: 'Second Tab', content: <p className="text-sm text-muted-foreground">Second</p>, disabled: true },
      { value: 'tab3', label: 'Third Tab',  content: <p className="text-sm text-muted-foreground">Third</p>  },
    ],
  },
}
