// Image assets from new-images, keyed for product.image
import doradeImg from "@/assets/new-images/dorade.jpg";
import forelImg from "@/assets/new-images/forel.jpg";
import grietImg from "@/assets/new-images/griet.jpg";
import hamachiImg from "@/assets/new-images/hamachi.jpg";
import escargotsImg from "@/assets/new-images/escargots.jpg";
import CoquillesImg from "@/assets/new-images/Coquilles.jpg";
import kokkelsImg from "@/assets/new-images/kokkels.jpg";
import krabImg from "@/assets/new-images/krab.jpg";
import BarbecuespierenImg from "@/assets/new-images/Barbecuespieren.jpg";
import garnalenImg from "@/assets/new-images/garnalen.jpg";
import gerechtenImg from "@/assets/new-images/gerechten.jpg";
import KreeftImg from "@/assets/new-images/Kreeft.jpg";
import sashimiSchotelImg from "@/assets/new-images/sashimi-schotel.jpg";
import japansImg from "@/assets/new-images/japans.jpg";
import zalmSashimiImg from "@/assets/new-images/zalm-sashimi.jpg";
import azijnImg from "@/assets/new-images/azijn.jpg";
import crabMeatImg from "@/assets/new-images/crab-meat.jpg";
import kreeftSauzenImg from "@/assets/new-images/kreeft-sauzen.jpg";
import ansjovisImg from "@/assets/new-images/ansjovis.jpg";
import broodImg from "@/assets/new-images/brood.jpg";
import conservenImg from "@/assets/new-images/conserven.jpg";
import filermessenImg from "@/assets/new-images/filermessen.jpg";
import sokkenImg from "@/assets/new-images/sokken.jpg";
import oceanParadiseImg from "@/assets/new-images/ocean-paradise.jpg";
import chefsCatchImg from "@/assets/new-images/chefs-catch.jpg";
import schmidtRoyaleImg from "@/assets/new-images/schmidt-royale.jpg";
import mosselenImg from "@/assets/new-images/mosselen.jpg";
import vismeelImg from "@/assets/new-images/vismeel.jpg";
import fruitsDeMerImg from "@/assets/new-images/fruits-de-mer.jpg";
import kibellingImg from "@/assets/new-images/kibelling.jpg";
import gebakkenscholImg from "@/assets/new-images/gebakkenschol.jpg";
import aioliImg from "@/assets/new-images/aioli.jpg";
import sojasausImg from "@/assets/new-images/sojasaus.jpg";
import tonijnTatakiImg from "@/assets/new-images/tonijn-tataki.jpg";
import lobsterMacImg from "@/assets/new-images/lobster-mac-n-cheese.jpg";
import saladezalmbosuiImg from "@/assets/new-images/saladezalmbosui.jpg";
import sashimischotelImg from "@/assets/new-images/sashimischotel.jpg";
import zoutImg from "@/assets/new-images/zout.jpg";
import oestersImg from "@/assets/new-images/oesters.jpg";
import langoustineImg from "@/assets/new-images/langoustine.jpg";
import zalmTatakiImg from "@/assets/new-images/zalm-tataki.jpg";
import piriPiriImg from "@/assets/new-images/piri-piri.jpg";
import bisqueImg from "@/assets/new-images/bisque.jpg";
import bouillonImg from "@/assets/new-images/bouillon.jpg";

export const newProductImages: Record<string, string> = {
  dorade: doradeImg,
  forel: forelImg,
  griet: grietImg,
  hamachi: hamachiImg,
  escargots: escargotsImg,
  Coquilles: CoquillesImg,
  kokkels: kokkelsImg,
  krab: krabImg,
  Barbecuespieren: BarbecuespierenImg,
  garnalen: garnalenImg,
  gerechten: gerechtenImg,
  Kreeft: KreeftImg,
  "sashimi-schotel": sashimiSchotelImg,
  japans: japansImg,
  tonijn: sashimiSchotelImg,
  "tonijn-tataki": tonijnTatakiImg,
  "zalm-sashimi": zalmSashimiImg,
  azijn: azijnImg,
  sojasaus: sojasausImg,
  "lobster-mac-n-cheese": lobsterMacImg,
  saladezalmbosui: saladezalmbosuiImg,
  sashimischotel: sashimischotelImg,
  zout: zoutImg,
  "crab-meat": crabMeatImg,
  "kreeft-sauzen": kreeftSauzenImg,
  ansjovis: ansjovisImg,
  brood: broodImg,
  conserven: conservenImg,
  filermessen: filermessenImg,
  sokken: sokkenImg,
  "ocean-paradise": oceanParadiseImg,
  "chefs-catch": chefsCatchImg,
  "schmidt-royale": schmidtRoyaleImg,
  mosselen: mosselenImg,
  vismeel: vismeelImg,
  "fruits-de-mer": fruitsDeMerImg,
  kibelling: kibellingImg,
  gebakkenschol: gebakkenscholImg,
  aioli: aioliImg,
  oesters: oestersImg,
  langoustine: langoustineImg,
  "zalm-tataki": zalmTatakiImg,
  "piri-piri": piriPiriImg,
  bisque: bisqueImg,
  bouillon: bouillonImg,
};

export const getNewProductImage = (key: string): string | undefined =>
  newProductImages[key];
