/**
 * Shared collection image mapping — single source of truth.
 * Used by CollectionsGrid and CollectionPage.
 */
import alleImage from "@/assets/collection/alle.png";
import versevisImage from "@/assets/new-category-image/verse-vis-Photoroom.png";
import schalpImage from "@/assets/new-category-image/schaal-Photoroom.png";
import kantAnKlaarImage from "@/assets/new-category-image/kant-en-klaar-Photoroom.png";
import sushiensashimiImage from "@/assets/new-category-image/sushi-Photoroom.png";
import olieenazijnImage from "@/assets/collection/olieenazijn.png";
import specialsImage from "@/assets/new-category-image/Special-Photoroom.png";
import deliImage from "@/assets/new-category-image/delicatessen-Photoroom.png";
import sauzenImage from "@/assets/collection/sauzen.png";
import schotelImage from "@/assets/new-category-image/schotels-Photoroom.png";
import diepvriesImage from "@/assets/new-category-image/diepvries-Photoroom.png";
import conservenImage from "@/assets/collection/conserven.png";
import kruidenImage from "@/assets/collection/kruiden.png";
import merchandiseImage from "@/assets/collection/merchandise.png";
import diversenImage from "@/assets/collection/diversen.png";
import versevangstImage from "@/assets/collection/versevangst.png";

export const COLLECTION_IMAGES: Record<string, string> = {
  "alle-producten": versevisImage,
  "verse-vis": alleImage,
  "schaal-en-schelpdieren": schalpImage,
  "klaar-en-klaar": kantAnKlaarImage,
  "sushi-en-sashimi": sushiensashimiImage,
  "olie-en-azijn": olieenazijnImage,
  "specials": specialsImage,
  "delicatessen": deliImage,
  "sauzen": sauzenImage,
  "schotels": schotelImage,
  "diepvries": diepvriesImage,
  "conserven": conservenImage,
  "kruiden-en-specerijen": kruidenImage,
  "merchandise": merchandiseImage,
  "diversen": diversenImage,
  "vangst-van-de-maand": versevangstImage,
};

export const DEFAULT_COLLECTION_IMAGE = alleImage;

export const getCollectionImage = (slug: string): string =>
  COLLECTION_IMAGES[slug] || DEFAULT_COLLECTION_IMAGE;
