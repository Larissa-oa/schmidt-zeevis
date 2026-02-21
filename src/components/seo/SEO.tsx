/**
 * SEO — injects per-page <title> and <meta> tags into <head>.
 * Drop this at the top of any page component.
 */
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  /** Canonical path, e.g. "/collections/verse-vis" */
  canonical?: string;
  /** Absolute URL for og:image */
  ogImage?: string;
}

const BASE_TITLE = "Schmidt Zeevis";
const BASE_URL = "https://schmidtzeevis-webwinkel3.lovable.app";
const DEFAULT_DESCRIPTION =
  "Premium verse vis en zeevruchten, rechtstreeks van Nederlandse vissers naar uw deur.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const setMeta = (selector: string, attribute: string, value: string) => {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [attr, val] = selector.replace("meta[", "").replace("]", "").split('="');
    el.setAttribute(attr, val.replace('"', ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
};

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
}: SEOProps) => {
  const fullTitle = `${title} | ${BASE_TITLE}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Standard meta
    setMeta('meta[name="description"]', "content", description);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);

    // Twitter
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    // Canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [fullTitle, description, ogImage, canonicalUrl]);

  return null;
};

export default SEO;
