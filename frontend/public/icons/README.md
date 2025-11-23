# Custom Icons Directory

## Purpose

This directory is reserved for **project-specific custom icons** that are not available in the `@untitledui/icons` package.

## When to Use This Directory

Add icons here when:

- **Brand-specific assets**: Company logos, mascots, brand marks
- **Custom illustrations**: Project-specific diagrams, infographics
- **Multi-color icons**: Complex icons that require multiple colors
- **Static images**: Icons that don't need dynamic props (size, color)

## File Naming Convention

Use **kebab-case** for file names:

```
/public/icons/
├── logo-osm-rfq.svg              # Brand logo
├── custom-workflow-diagram.svg   # Custom illustrations
└── category-specific/            # Group by feature/module
    ├── rfq-status-pending.svg
    ├── rfq-status-approved.svg
    └── rfq-status-rejected.svg
```

## Usage Example

### Method A: Next.js Image Component (Recommended)

```tsx
import Image from 'next/image';

function Logo() {
  return (
    <Image
      src="/icons/logo-osm-rfq.svg"
      alt="OSM RFQ Logo"
      width={120}
      height={40}
    />
  );
}
```

### Method B: Direct SVG Import

```tsx
function CustomIcon() {
  return (
    <img
      src="/icons/custom-workflow-diagram.svg"
      alt="Workflow Diagram"
      className="w-24 h-24"
    />
  );
}
```

### Method C: React Component Wrapper (For Frequent Use)

```tsx
// src/commons/components/icons/custom.tsx
export function OsmRfqLogo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/icons/logo-osm-rfq.svg"
      alt="OSM RFQ"
      width={size}
      height={size * 0.33} // Maintain aspect ratio
    />
  );
}
```

## Icon Optimization

Before adding SVG files:

1. **Optimize with SVGO**: Use [SVGOMG](https://jakearchibald.github.io/svgomg/)
2. **Remove metadata**: Strip unnecessary comments, titles, descriptions
3. **Set viewBox**: Ensure `viewBox` attribute is correctly set
4. **Check file size**: Aim for < 10KB per icon

## Standard UI Icons

For standard UI icons (arrows, check marks, user icons, etc.), use the `@untitledui/icons` package:

```tsx
import { ArrowRight, Check, User } from '@/commons/components/icons';
```

See full list: [src/commons/components/icons/index.ts](../../src/commons/components/icons/index.ts)

## Current Status

**This directory is intentionally empty** and serves as a placeholder for future custom icon assets.

All standard UI icons are managed via the `@untitledui/icons` npm package.

---

## Related Documentation

- [Hybrid Icon Management System](../../../docs/frontend/하이브리드%20아이콘%20관리%20시스템.md)
- [Icon Exports Index](../../src/commons/components/icons/index.ts)
- [Button Component](../../src/commons/components/button/index.tsx)

---

Last Updated: 2025-11-21
Maintainer: OSM RFQ Development Team
