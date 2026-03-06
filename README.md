# @philiprehberger/react-ui-kit

Accessible React UI component library with Tailwind CSS.

## Installation

```bash
npm install @philiprehberger/react-ui-kit clsx tailwind-merge
```

## Components

### Display
- **Button** - Multi-variant button with loading states
- **Card** - Container with CardHeader, CardBody, CardFooter
- **Badge** - Status indicators (DiscountBadge, NewBadge, FeaturedBadge)
- **Skeleton** - Loading placeholders (TextSkeleton, AvatarSkeleton, CardSkeleton)

### Form
- **Input** - Text input, select, and textarea with validation states
- **Checkbox** - Accessible checkbox with label
- **RadioGroup** - Grouped radio buttons
- **FormInput** - Input with form validation integration
- **FormSelect** - Select with form validation integration
- **FormTextarea** - Textarea with character count
- **FormField** - Field wrappers (TextField, EmailField, PasswordField, etc.)
- **FormGroup** / **FormRow** - Layout helpers

### Overlay
- **Modal** - Dialog with focus trap and keyboard navigation
- **Dropdown** - Dropdown menu with keyboard support
- **Tooltip** - Hover tooltip with positioning
- **ConfirmDialog** - Confirmation dialog with variants
- **Toast** - Toast notifications (ToastProvider + useToast)

### Navigation
- **Tabs** - Compound component tabs (Tabs.List, Tabs.Tab, Tabs.Panel)
- **Pagination** - Page navigation with ellipsis

### Data
- **DataList** - Generic list with grid/stack layouts (GridList, StackList)

### Accessibility
- **LiveRegionProvider** - Screen reader announcements (useAnnounce)

## Usage

```tsx
import { Button, Card, Input, Modal } from '@philiprehberger/react-ui-kit';

<Card variant="bordered" padding="lg">
  <Input label="Email" type="email" required />
  <Button variant="primary" size="md">Submit</Button>
</Card>
```

## License

MIT
