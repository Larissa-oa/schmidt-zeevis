"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, Filter, X, Grid3X3 } from "lucide-react";
import SEO from "@/components/seo/SEO";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { collections, getCollectionBySlug, getProductsByCollection } from "@/data/collections";
import { getCollectionImage } from "@/data/collectionImageMap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import groeneVisImage from "@/assets/Groene-vis.png";
import blauweVisImage from "@/assets/Blauwe-vis.png";

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const collection = getCollectionBySlug(slug || "");
  
  // Get search query from URL params
  const urlSearchQuery = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  
  // Update search query when URL param changes
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);
  const [attributeFilters, setAttributeFilters] = useState<string[]>([]);
  const [showAllCollections, setShowAllCollections] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const collectionProducts = collection ? getProductsByCollection(collection.id) : getProductsByCollection("1");
  const filteredProducts = collectionProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAttributes =
      attributeFilters.length === 0 ||
      attributeFilters.some((f) =>
        f === "in-het-seizoen"
          ? product.inHetSeizoen
          : f === "lokaal-gevangen"
            ? product.lokaalGevangen
            : f === "duurzaam"
              ? product.duurzaam
              : false
      );
    return matchesSearch && matchesAttributes;
  });

  const visibleCollections = showAllCollections ? collections : collections.slice(0, 6);

  const toggleAttribute = (value: string) => {
    setAttributeFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useBodyScrollLock(sidebarOpen);

  const seoTitle = collection ? collection.name : "Alle Producten";
  const seoDescription = collection
    ? `Ontdek onze ${collection.name.toLowerCase()} bij Schmidt Zeevis — verse, premium kwaliteit rechtstreeks van de haven.`
    : "Bekijk het volledige assortiment verse vis en zeevruchten van Schmidt Zeevis.";

  return (
    <PageLayout mainClassName="bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/collections/${slug || "alle-producten"}`}
      />
      <div className="bg-secondary/50">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections/alle-producten" className="hover:text-primary transition-colors">Collecties</Link>
            {collection && (
              <>
                <span>/</span>
                <span className="text-foreground font-medium">{collection.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
        
        {/* Header: collection image with overlay for readable, defined header */}
        <div className="relative min-h-[180px] md:min-h-[220px] overflow-hidden border-b border-border/60">
          {/* Background image - more visible, per collection */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${getCollectionImage(collection?.slug || "alle-producten")})`,
              opacity: 0.65,
              backgroundPosition: (collection?.slug || "alle-producten") === "alle-producten" ? "72% center" : "center",
            }}
            aria-hidden
          />
          {/* Overlay: left to right, light and fades away toward the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/45 via-background/20 to-transparent" />
          {/* Defined header content area */}
          <div className="container relative z-10 pt-6 pb-8 md:pt-8 md:pb-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] max-w-4xl">
              {collection?.name || "Alle Producten"}
            </h1>
            {collection && (
              <p className="mt-3 mb-0 text-foreground/90 max-w-2xl text-base md:text-lg drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {collection.description}
              </p>
            )}
          </div>
        </div>

        <div className="container pb-8 pt-6">
          {/* Search Bar - Narrower */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Zoek producten..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 text-base rounded-xl border-border bg-card"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="md:hidden mb-4 w-full"
            onClick={() => setSidebarOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <div className="flex gap-8">
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-foreground/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar */}
            <aside
              className={`
                fixed md:relative inset-y-0 left-0 z-50 md:z-auto
                w-full md:w-64 flex-shrink-0
                bg-card md:bg-transparent
                transform transition-transform duration-300 md:transform-none
                flex flex-col
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" }
              `}
            >
              <div className="flex-1 overflow-y-auto p-6 md:p-0 pb-24 md:pb-0">
                {/* Mobile Close Button */}
                <div className="flex items-center justify-between mb-6 md:hidden">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-5">
                  {/* Attribute Filter: In het seizoen / Lokaal gevangen / Duurzaam */}
                  <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
                    <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      Kenmerken
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Filter op seizoen, herkomst en duurzaamheid
                    </p>
                    <div className="space-y-2">
                      {[
                        { value: "in-het-seizoen", label: "In het seizoen", isFish: true, colorClass: "text-accent-green", bgClass: "bg-accent-green/15", borderClass: "border-l-4 border-accent-green", selectedRing: "ring-2 ring-accent-green/50 ring-offset-2", checkboxClass: "data-[state=checked]:bg-accent-green data-[state=checked]:border-accent-green" },
                        { value: "lokaal-gevangen", label: "Lokaal gevangen", isFish: false, isBlueFish: true, colorClass: "text-primary", bgClass: "bg-secondary", borderClass: "border-l-4 border-primary/40", selectedRing: "ring-2 ring-primary/30 ring-offset-2", checkboxClass: "data-[state=checked]:bg-primary data-[state=checked]:border-primary" },
                        { value: "duurzaam", label: "Duurzaam", isFish: false, isBlueFish: true, colorClass: "text-primary", bgClass: "bg-secondary", borderClass: "border-l-4 border-primary/40", selectedRing: "ring-2 ring-primary/30 ring-offset-2", checkboxClass: "data-[state=checked]:bg-primary data-[state=checked]:border-primary" },
                      ].map((option) => {
                        const isChecked = attributeFilters.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className={`flex items-center gap-3 cursor-pointer rounded-lg p-3 border-l-4 ${option.borderClass} ${option.bgClass} transition-all ${isChecked ? option.selectedRing : ""} hover:opacity-90`}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => toggleAttribute(option.value)}
                              className={`border-2 ${option.checkboxClass}`}
                            />
                            <span className="flex flex-col gap-0.5 flex-1">
                              <span className={`text-sm font-semibold flex items-center gap-2 ${option.colorClass}`}>
                                {option.isFish ? (
                                  <img src={groeneVisImage} alt="In het seizoen" className="h-4 w-4 object-contain scale-x-[-1]" />
                                ) : option.isBlueFish ? (
                                  <img src={blauweVisImage} alt="Lokaal" className="h-4 w-4 object-contain" />
                                ) : null}
                                {option.label}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Other Collections - Single column list */}
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4 text-primary" />
                      Collecties
                    </h3>
                    <div className="flex flex-col gap-1">
                      {visibleCollections.map((col) => (
                        <Link
                          key={col.id}
                          to={`/collections/${col.slug}`}
                          className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                            col.slug === slug
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-secondary"
                          }`}
                        >
                          {col.name}
                        </Link>
                      ))}
                    </div>
                    {collections.length > 6 && (
                      <button
                        onClick={() => setShowAllCollections(!showAllCollections)}
                        className="flex items-center justify-center gap-1 mt-3 text-sm text-primary hover:underline w-full"
                      >
                        {showAllCollections ? (
                          <>
                            Minder tonen <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Meer tonen <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} producten gevonden
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Geen producten gevonden
                  </h3>
                  <p className="text-muted-foreground">
                    Probeer een andere zoekopdracht of pas je filters aan.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
    </PageLayout>
  );
};

export default CollectionPage;
