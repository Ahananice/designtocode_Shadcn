import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Design to Code</h1>
          <p className="text-muted-foreground text-lg">
            Paste a UI screenshot into the Claude conversation and use{' '}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">@design-to-code</code>{' '}
            to generate production-ready Shadcn/ui components.
          </p>
        </div>

        {/* How it works */}
        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
            <CardDescription>Three steps to go from design to code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: '1', title: 'Paste screenshot', desc: 'Drop a UI design image into Claude Code' },
                { step: '2', title: 'Agent generates', desc: 'The @design-to-code agent creates a TSX component + Storybook story' },
                { step: '3', title: 'PR created', desc: 'A GitHub PR is opened automatically for review' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {step}
                  </span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Gallery */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Component Gallery</h2>
          <p className="text-muted-foreground">Available Shadcn/ui building blocks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Button</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          {/* Input + Label */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Input & Label</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="example-input">Component name</Label>
              <Input id="example-input" placeholder="e.g. UserProfileCard" />
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select</CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Textarea */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Textarea</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Describe the component you want to generate..." />
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={33} />
              <Progress value={66} />
              <Progress value={100} />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground pb-8">
          Run <code className="bg-muted px-1.5 py-0.5 rounded font-mono">npm run storybook</code> to browse components in Storybook &nbsp;·&nbsp; Use <code className="bg-muted px-1.5 py-0.5 rounded font-mono">@design-to-code</code> in Claude to generate new ones
        </p>
      </div>
    </div>
  )
}

export default App
