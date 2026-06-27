<p align="center">
  <a align='center' href="https://tailwindcss-radix.vercel.app">
    <picture>
      <source srcset="https://raw.githubusercontent.com/ecklf/tailwindcss-radix/main/demo/public/static/og.webp">
      <img width="967" height="auto" src="https://raw.githubusercontent.com/ecklf/tailwindcss-radix/main/demo/public/static/og.png" />
    </picture>
  </a>
</p>

<p align="center">
  Utilities and variants for styling Radix state
</p>

<div align="center">

<a href="https://tailwindcss.com">![tailwindcss v3 ready](https://img.shields.io/badge/tailwindcss-v3%20ready-0F172A?logo=tailwindcss&style=flat&labelColor=38bdf8&logoColor=ffffff)</a>
<a href="https://www.npmjs.com/package/tailwindcss-radix">![npm version](https://img.shields.io/npm/v/tailwindcss-radix.svg)</a>
<a href="https://www.npmjs.com/package/tailwindcss-radix">![npm downloads](https://img.shields.io/npm/dm/tailwindcss-radix.svg)</a>

</div>

## Installation

```sh
yarn add tailwindcss-radix
```

```sh
npm i tailwindcss-radix
```

## Demo

Click on the banner to check out the demo components. You can find the code inside the [demo](https://github.com/ecklf/tailwindcss-radix/tree/main/demo) folder.

## Usage

Add the plugin to your plugins array:

```js
module.exports = {
  theme: {
    // --snip--
  },
  variants: {
    // --snip--
  },
  plugins: [
    // Initialize with default values (see options below)
    require("tailwindcss-radix")(),
  ],
};
```

### Options

```ts
require("tailwindcss-radix")({
  // Default: `radix`
  variantPrefix: "rdx",
  // Default: `false`
  // Cannot be enabled in combination with `variantPrefix: ""`
  skipAttributeNames: false,
});
```

```ts
// Example 1: Generates `rdx-[state/side/orientation]-*` utilities for `data-[state/side/orientation]="*"`
variantPrefix: "rdx",
skipAttributeNames: false

// Example 2: Generates `[state/side/orientation]-*` utilities for `data-[state/side/orientation]="*"`
variantPrefix: "",
skipAttributeNames: false

// Example 3: Generates `rdx-*` utilities for `data-[state/side/orientation]="*"`
variantPrefix: "rdx",
skipAttributeNames: true
```

### Styling state

#### Basic usage

This plugin works with CSS attribute selectors. Use the variants based on the `data-*` attribute added by Radix.

```tsx
import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const App = () => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="border-black radix-state-open:border-2">
        Trigger
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Content>
        <DropdownMenuPrimitive.Item>Item</DropdownMenuPrimitive.Item>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Root>
  );
};

export default App;
```

#### Accessing parent state

Sometimes we want to access state in the child of the trigger element. This can be achieved by adding the `group` class to the parent element and the `group-*` variants on the child element.

Example usage of a conditional transform for a Radix `Accordion`:

```tsx
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Accordion = () => {
  return (
    <AccordionPrimitive.Root type="multiple">
      <AccordionPrimitive.Item value="item-1">
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger className="group">
            <div className="flex items-center">
              Item 1
              <ChevronDownIcon className="w-5 h-5 ml-2 transform group-radix-state-open:rotate-180" />
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content>Content 1</AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
      <AccordionPrimitive.Item value="item-2">
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger className="group">
            <div className="flex items-center">
              Item 2
              <ChevronDownIcon className="w-5 h-5 ml-2 transform group-radix-state-open:rotate-180" />
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content>Content 2</AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

export default App;
```

#### Disabled state

Use the generated `disabled` variant.

```tsx
import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

const ContextMenu = () => {
  return (
    // --snip--
    <ContextMenuPrimitive.Item
      disabled
      className="radix-disabled:opacity-50 radix-disabled:cursor-not-allowed"
    >
      Item
    </ContextMenuPrimitive.Item>
    // --snip--
  );
};
```

### Animation

#### Origin position

Use the generated `origin-*` utilities to transform from the content position origin.

```css
.origin-radix-dropdown-menu {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}

.origin-radix-hover-card {
  transform-origin: var(--radix-hover-card-content-transform-origin);
}

.origin-radix-context-menu {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}

.origin-radix-popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}

.origin-radix-tooltip {
  transform-origin: var(--radix-tooltip-content-transform-origin);
}
```

#### Content size

Use the generated `h-*` and `w-*` utilities to animate the size of the content when it opens/closes.

```css
.h-radix-accordion {
  height: var(--radix-accordion-content-height);
}

.w-radix-accordion {
  width: var(--radix-accordion-content-width);
}

.h-radix-collapsible {
  height: var(--radix-collapsible-content-height);
}

.w-radix-collapsible {
  width: var(--radix-collapsible-content-width);
}
```

Example usage with the `<Transition/>` component from `@headlessui/react`:

```tsx
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Transition } from "@headlessui/react";

const AnimatedAccordion = () => {
  return (
    // --snip--
    <AccordionPrimitive.Content forceMount className="overflow-hidden">
      <Transition
        show={currentItem === "item-1"}
        enter="ease-out duration-300"
        enterFrom="h-0"
        enterTo="h-radix-accordion"
        leave="ease-in duration-300"
        leaveFrom="h-radix-accordion"
        leaveTo="h-0"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          ullam, ratione veniam voluptate nobis sunt laboriosam aperiam harum
          fugit corrupti alias magnam officiis nihil minima eum excepturi natus
          similique? Cupiditate reprehenderit, hic sequi modi nemo odit esse
          quas adipisci perferendis beatae deserunt ducimus itaque molestias
          quibusdam porro assumenda laudantium id!
        </p>
      </Transition>
    </AccordionPrimitive.Content>
    // --snip--
  );
};
```

## License

MIT

<!-- [<img src="https://raw.githubusercontent.com/ecklf/tailwindcss-radix/main/demo/public/static/og.png" width="967">](https://tailwindcss-radix.vercel.app)
[![tailwindcss v3 ready](https://img.shields.io/badge/tailwindcss-v3%20ready-0F172A?logo=tailwindcss&style=flat&labelColor=38bdf8&logoColor=ffffff)](https://tailwindcss.com)
[![npm version](https://img.shields.io/npm/v/tailwindcss-radix.svg)](https://www.npmjs.com/package/tailwindcss-radix)
[![npm downloads](https://img.shields.io/npm/dm/tailwindcss-radix.svg)](https://www.npmjs.com/package/tailwindcss-radix) -->
