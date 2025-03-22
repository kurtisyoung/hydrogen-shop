import {useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/lib/variants';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface ProductCardProps {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}

export function ProductCard({product, loading}: ProductCardProps) {
  const variantUrl = useVariantUrl(product.handle);
  const [hovered, setHovered] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(product.featuredImage);
  const secondaryImages = product.secondaryImage?.nodes || [];
  const [hoverImage, setHoverImage] = useState(
    secondaryImages[1] || secondaryImages[0],
  );
  const options = product.options || [];
  const colours =
    options?.filter((x) => x.name === 'Color')?.[0]?.optionValues || [];
  const [selectedColour, setSelectedColour] = useState(
    colours?.[0]?.name.toLowerCase(),
  );
  const variants = product.variants?.nodes || [];
  const soldOut = !product?.totalInventory;

  // On Sale
  const compareAtPrice =
    product.selectedOrFirstAvailableVariant?.compareAtPrice;

  // // Dumby data used to test the sale price
  // const compareAtPrice = {
  //   amount: '20',
  //   currencyCode: 'CAD',
  // };

  const isSelectedColour = (colourName: string) =>
    selectedColour === colourName.toLowerCase();

  // Set new Feature Image onClick of colour swatch
  const handleColourOnClick = (value: {
    name: string;
    swatch?: {color?: string | null} | null;
  }) => {
    const currentColour = value.name.toLowerCase();

    const selectFeaturedImage =
      variants.find((x) => x.title.toLowerCase().includes(currentColour))
        ?.image || featuredImage;

    const selectHoverImage =
      secondaryImages.find((x) => {
        const secondaryImageUrl = x.url.toLowerCase();
        return (
          secondaryImageUrl.includes(currentColour) &&
          secondaryImageUrl.includes('02')
        );
      }) || hoverImage;

    setFeaturedImage(selectFeaturedImage);
    setSelectedColour(currentColour);
    setHoverImage(selectHoverImage);
  };

  return (
    <div>
      <Link
        className="group relative"
        key={product.id}
        prefetch="intent"
        to={variantUrl}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          {featuredImage && (
            <Image
              alt={featuredImage.altText || product.title}
              aspectRatio="1/1"
              data={featuredImage}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
            />
          )}
          {hoverImage && hovered && (
            <Image
              alt={hoverImage.altText || product.title}
              aspectRatio="1/1"
              data={hoverImage}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className="absolute inset-0 opacity-100 transition-opacity duration-300"
            />
          )}
        </div>
        {(soldOut || compareAtPrice) && (
          <div className="absolute top-4 left-3">
            {soldOut && (
              <span className="text-white text-center text-base font-medium w-23 h-8 bg-black rounded-full flex items-center justify-center mb-2">
                Sold Out
              </span>
            )}
            {compareAtPrice && (
              <span className="text-red-500 text-center text-base font-medium w-23 h-8 border-red-500 border rounded-full flex items-center justify-center">
                On Sale!
              </span>
            )}
          </div>
        )}
      </Link>
      {colours.length > 0 && (
        <div className="flex space-x-2 mt-4">
          <div className="flex space-x-1">
            {colours.map((value) => (
              <button
                key={value.name}
                className={`h-5 w-5 rounded-full cursor-pointer border border-gray-300 mr-2 ${
                  isSelectedColour(value.name)
                    ? 'outline-solid outline-1 outline-offset-1 outline-blue-950'
                    : ''
                }`}
                style={{
                  backgroundColor:
                    value.swatch?.color || value.name.toLowerCase(),
                }}
                onClick={() => handleColourOnClick(value)}
              />
            ))}
          </div>
        </div>
      )}
      <Link to={variantUrl}>
        <div className="mt-4">
          <div className="flex flex-start justify-between flex-col">
            {product.vendor && (
              <span className="text-sm text-black-500">{product.vendor}</span>
            )}
            <h4 className="text-base font-medium text-blue-950 mt-0 mb-0">
              {product.title}
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            {compareAtPrice && (
              <Money
                data={compareAtPrice}
                className="text-sm text-gray-500 line-through"
              />
            )}
            <Money
              data={product.priceRange.minVariantPrice}
              className={`text-sm font-medium text-gray-900 ${
                compareAtPrice ? 'text-red-500' : ''
              }`}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
