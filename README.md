# @philiprehberger/react-ui-kit

[![CI](https://github.com/philiprehberger/ts-react-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-react-ui-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/react-ui-kit.svg)](https://www.npmjs.com/package/@philiprehberger/react-ui-kit)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-react-ui-kit)](https://github.com/philiprehberger/ts-react-ui-kit/commits/main)

Accessible React UI component library with Tailwind CSS

## Installation

```bash
npm install @philiprehberger/react-ui-kit clsx tailwind-merge
```

## Usage

```tsx
import { Button, Card, Input, Modal } from '@philiprehberger/react-ui-kit';

<Card variant="bordered" padding="lg">
  <Input label="Email" type="email" required />
  <Button variant="primary" size="md">Submit</Button>
</Card>
```

### Display

```tsx
import { Button, Badge, Skeleton, Spinner } from '@philiprehberger/react-ui-kit';

<Button isLoading>Save</Button>
<Badge variant="success">Active</Badge>
<Skeleton width="60%" height={24} />
<Spinner size="md" label="Loading users" />
```

### Form

```tsx
import { FormInput, FormSelect, FormTextarea } from '@philiprehberger/react-ui-kit';

<FormInput name="email" label="Email" type="email" required />
<FormSelect name="role" label="Role" options={[{ value: 'admin', label: 'Admin' }]} />
<FormTextarea name="bio" label="Bio" maxLength={280} />
```

### Overlay

```tsx
import { Modal, ConfirmDialog, ToastProvider, useToast } from '@philiprehberger/react-ui-kit';

<Modal isOpen={open} onClose={close} title="Settings">
  ...
</Modal>
```

### Navigation & Data

```tsx
import { Tabs, Pagination, DataList } from '@philiprehberger/react-ui-kit';

<Tabs>
  <Tabs.List>
    <Tabs.Tab id="general">General</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="general">...</Tabs.Panel>
</Tabs>
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
| `Spinner` | Accessible loading spinner with size variants |
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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-react-ui-kit)

🐛 [Report issues](https://github.com/philiprehberger/ts-react-ui-kit/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-react-ui-kit/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
