export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    vendor
    featuredImage {
      id
      altText
      url
      width
      height
    }
    secondaryImage: images(first: 100) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    totalInventory
    variants(first: 100) {
        nodes {
          title
          image {
            id
            altText
            url
            width
            height
        }
      }
    }
    selectedOrFirstAvailableVariant {
      compareAtPrice {
        ...MoneyProductItem
      }
    }
    options {
      name
      optionValues {
        name
        swatch {
          color
        }
      }
    }
  }
` as const;
