import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    type:      { control: 'radio', options: ['single', 'range', 'multiRange'] },
    disabled:  { control: 'boolean' },
    required:  { control: 'boolean' },
    showHelp:  { control: 'boolean' },
    showMarks: { control: 'boolean' },
    min:       { control: 'number' },
    max:       { control: 'number' },
    step:      { control: 'number' },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single ───────────────────────────────────────────────────────────────────

export const Single: Story = {
  args: {
    type: 'single',
    label: 'Slider Label',
    defaultValue: [3],
    min: 0,
    max: 10,
    step: 1,
    showMarks: true,
    markLabels: ['0','1','2','3','4','5','6','7','8','9','10'],
  },
}

// ─── Range ────────────────────────────────────────────────────────────────────

export const Range: Story = {
  args: {
    type: 'range',
    label: 'Slider Label',
    defaultValue: [2, 6],
    min: 0,
    max: 10,
    step: 1,
    showMarks: true,
    markLabels: ['0','1','2','3','4','5','6','7','8','9','10'],
  },
}

// ─── Multi-range ──────────────────────────────────────────────────────────────

export const MultiRange: Story = {
  args: {
    type: 'multiRange',
    label: 'Slider Label',
    showMarks: true,
    markLabels: ['0','1','2','3','4','5','6','7','8','9','10'],
  },
}

// ─── With label extras ────────────────────────────────────────────────────────

export const WithRequired: Story = {
  args: {
    type: 'single',
    label: 'Confidence',
    required: true,
    defaultValue: [60],
    min: 0,
    max: 100,
  },
}

export const WithHelp: Story = {
  args: {
    type: 'single',
    label: 'Threshold',
    showHelp: true,
    helpText: 'Controls the detection sensitivity.',
    defaultValue: [50],
    min: 0,
    max: 100,
  },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    type: 'single',
    label: 'Locked setting',
    defaultValue: [40],
    min: 0,
    max: 100,
    disabled: true,
  },
}

// ─── All variants overview ────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-10">
      {/* Single */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Single
        </p>
        <Slider
          type="single"
          label="Slider Label"
          defaultValue={[3]}
          min={0}
          max={10}
          step={1}
          showMarks
          markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
        />
      </div>

      {/* Range */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Range
        </p>
        <Slider
          type="range"
          label="Slider Label"
          defaultValue={[2, 6]}
          min={0}
          max={10}
          step={1}
          showMarks
          markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
        />
      </div>

      {/* Multi-range */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-lyra-fg-secondary">
          Multi-range
        </p>
        <Slider
          type="multiRange"
          label="Slider Label"
          showMarks
          markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
        />
      </div>
    </div>
  ),
}

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide w-28">
              Type
            </th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">
              Default
            </th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-lyra-fg-secondary uppercase tracking-wide">
              Disabled
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-lyra-border-subtle">
          {/* Single */}
          <tr>
            <td className="px-3 py-4 text-lyra-fg-secondary font-medium align-top">Single</td>
            <td className="px-3 py-4">
              <Slider
                type="single"
                label="Slider Label"
                defaultValue={[3]}
                min={0} max={10} step={1}
                showMarks
                markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
              />
            </td>
            <td className="px-3 py-4">
              <Slider
                type="single"
                label="Slider Label"
                defaultValue={[3]}
                min={0} max={10} step={1}
                showMarks
                markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
                disabled
              />
            </td>
          </tr>
          {/* Range */}
          <tr>
            <td className="px-3 py-4 text-lyra-fg-secondary font-medium align-top">Range</td>
            <td className="px-3 py-4">
              <Slider
                type="range"
                label="Slider Label"
                defaultValue={[2, 6]}
                min={0} max={10} step={1}
                showMarks
                markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
              />
            </td>
            <td className="px-3 py-4">
              <Slider
                type="range"
                label="Slider Label"
                defaultValue={[2, 6]}
                min={0} max={10} step={1}
                showMarks
                markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
                disabled
              />
            </td>
          </tr>
          {/* Multi-range */}
          <tr>
            <td className="px-3 py-4 text-lyra-fg-secondary font-medium align-top">Multi-range</td>
            <td className="px-3 py-4">
              <Slider
                type="multiRange"
                label="Slider Label"
                showMarks
                markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
              />
            </td>
            <td className="px-3 py-4">
              <Slider
                type="multiRange"
                label="Slider Label"
                showMarks
                markLabels={['0','1','2','3','4','5','6','7','8','9','10']}
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
}
