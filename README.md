# @philiprehberger/react-ui-kit

[![CI](https://github.com/philiprehberger/ts-react-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-react-ui-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/react-ui-kit.svg)](https://www.npmjs.com/package/@philiprehberger/react-ui-kit)
[![License](https://img.shields.io/github/license/philiprehberger/ts-react-ui-kit)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ec6cb9)](https://github.com/sponsors/philiprehberger)

Accessible React UI component library with Tailwind CSS

## Installation

```bash
npm install @philiprehberger/react-ui-kit clsx tailwind-merge
```

## Usage

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

## Examples

```tsx
import { Button, Card, Input, Modal } from '@philiprehberger/react-ui-kit';

<Card variant="bordered" padding="lg">
  <Input label="Email" type="email" required />
  <Button variant="primary" size="md">Submit</Button>
</Card>
```

## API

### Components

| Component | Description |
|-----------|-------------|
| `Button` | Multi-variant button with loading states |
| `Card`, `CardHeader`, `CardBody`, `CardFooter`, `CompoundCard` | Container with header/body/footer slots |
| `Badge`, `DiscountBadge`, `NewBadge`, `FeaturedBadge` | Status indicator badges |
| `Input` | Text input, select, and textarea with validation states |
| `Checkbox` | Accessible checkbox with label |
| `RadioGroup` | Grouped radio buttons |
| `Modal` | Dialog with focus trap and keyboard navigation |
| `Dropdown` | Dropdown menu with keyboard support |
| `Tabs` | Compound component tabs (Tabs.List, Tabs.Tab, Tabs.Panel) |
| `Tooltip` | Hover tooltip with positioning |
| `ConfirmDialog` | Confirmation dialog with variants |
| `Pagination` | Page navigation with ellipsis |
| `Skeleton`, `TextSkeleton`, `AvatarSkeleton`, `CardSkeleton` | Loading placeholders |
| `DataList`, `GridList`, `StackList`, `DataListSkeleton`, `DataListEmpty` | Generic data list with layouts |

### Form Components

| Component | Description |
|-----------|-------------|
| `FormField`, `TextField`, `EmailField`, `PasswordField`, `SearchField`, `NumberField` | Field wrappers with validation |
| `FormGroup`, `FormRow` | Form layout helpers |
| `FormInput` | Input with form validation integration |
| `FormSelect` | Select with form validation integration |
| `FormTextarea` | Textarea with character count |

### Providers & Hooks

| Export | Type | Description |
|--------|------|-------------|
| `ToastProvider` | Component | Toast notification context provider |
| `useToast()` | Hook | Show toast notifications |
| `LiveRegionProvider` | Component | Screen reader announcement provider |
| `useAnnounce()` | Hook | Trigger screen reader announcements |

### Utilities

| Export | Description |
|--------|-------------|
| `cn(...inputs)` | Merge class names (clsx + tailwind-merge) |

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
