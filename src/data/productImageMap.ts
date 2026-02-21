/**
 * Shared product image mapping — single source of truth for slug-to-fallback-image lookups.
 * Used by ProductCard, QuickAddModal, CartDrawer, CartPage, and ProductPage.
 */
import { Product } from "@/data/collections";
import { getNewProductImage } from "@/data/productImageAssets";

import salmonImage from "@/assets/salmon-collection.jpg";
import shrimpImage from "@/assets/shrimp-collection.jpg";
import oysterImage from "@/assets/oyster-collection.jpg";
import mackerelImage from "@/assets/mackerel-collection.jpg";
import octopusTentaclesImage from "@/assets/octopus-tentacles.png";
import dutchShrimpImage from "@/assets/dutch-shrimp.avif";
import oceanParadiseImage from "@/assets/ocean-paradise.png";
import zeebassImage from "@/assets/zeebass.avif";

/** Fallback images keyed by product slug */
export const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  "octopus-tentakels": octopusTentaclesImage,
  "hollandse-garnalen-fresh": dutchShrimpImage,
  "ocean-paradise": oceanParadiseImage,
  "zeebaars-fresh": zeebassImage,
  "verse-zalm-filet": salmonImage,
  "hollandse-garnalen": shrimpImage,
  "zeeuwse-platte-oesters": oysterImage,
  "zeeuwse-kreeft": mackerelImage,
};

/** Default placeholder when no image is found */
export const DEFAULT_PRODUCT_IMAGE = salmonImage;

/** Resolve the best available image for a product */
export const getProductImage = (product: Product): string =>
  (product.image && getNewProductImage(product.image)) ||
  PRODUCT_FALLBACK_IMAGES[product.slug] ||
  DEFAULT_PRODUCT_IMAGE;
