# Hydrogen Shop

I am using the `Mock.shop` API since it contains more than just product data and I wanted to style the whole website instead of just the Product Card.

## Things I've changed

### Created a Product Card component

This component includes:

- Colour swatch selector that changes the colour of the featured and hovered image
- Hover image which changes when a colour is selected as mentioned
- Sold Out badge
- Sale badge and price comparison for sale items

### Product Details Page

- Added more feature images for each colour that will change when the selected colour changes
- Styled the colour swatches to match the new Product Cards
- Styled the size selector and add to cart CTA to match each other

### Collections Page

- Product Card integration and updated the GraphQL calls to accommodate the new attributes required
- Styled the heading and description to match the new Product Cards
- Update the pagination to match the new CTA styles

### Home Page

- Moved the H1 into the center of the Banner Image to create a Hero Banner
- Styled the Recommendation cards to match the new Product Cards

### Blogs (News)

- Styled the Article Items to match the rest of the site
- Styled the Blog page to make the article easier to read

## What's included

- Remix
- TailwindCSS
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
