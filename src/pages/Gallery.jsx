import { useState, useEffect, useRef } from 'react';
import { Play, Camera, Film, X, ZoomIn } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import RichLinkPreview from '../components/RichLinkPreview';
import { FEATURED_PRESS_LINKS } from '../data/content';
import { cmsFetch, CMS_PATHS } from '../lib/cms';
import '../styles/pages.css';
import './Gallery.css';

// 9th edition (15 November 2026) — the latest gala night, photographed by FAITHFYN.
// Every photo carries the www.faithfynphotography.com watermark along its bottom
// edge; portrait frames are anchored to the bottom in the gallery CSS (see
// .gallery-card-portrait) so the watermark is never cropped off.
export const NINTH_EDITION_PHOTOS = [
  {
    "id": "n1",
    "span": "wide",
    "tag": "Official Backdrop",
    "title": "BOEA 9th Edition — Official Backdrop Wall",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-backdrop-wall.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n2",
    "span": "normal",
    "tag": "Photo Wall",
    "title": "Ushers at the 9th Edition Photo Wall",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-photo-wall-ushers.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n3",
    "span": "normal",
    "tag": "Photo Wall",
    "title": "Guests at the 9th Edition Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-photo-wall-guests.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n4",
    "span": "normal",
    "tag": "Black Carpet",
    "title": "Black Carpet Interview — 9th Edition",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-black-carpet-interview.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n5",
    "span": "normal",
    "tag": "Black Carpet",
    "title": "Guests at the 9th Edition Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-backdrop-guests.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n6",
    "span": "normal",
    "tag": "Black Carpet",
    "title": "Black Carpet Interview Trio",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-backdrop-interview-trio.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n7",
    "span": "wide",
    "tag": "Stage",
    "title": "9th Edition Stage Screen",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-stage-screen.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n8",
    "span": "normal",
    "tag": "Venue",
    "title": "The Hall — Chandeliers and Red-Carpet Aisle",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-hall-chandeliers.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n9",
    "span": "wide",
    "tag": "The Hall",
    "title": "A Packed Hall — 9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-packed-hall.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n10",
    "span": "normal",
    "tag": "Stage",
    "title": "Live Band on Stage",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-live-band.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n11",
    "span": "wide",
    "tag": "Stage",
    "title": "Cultural Dance Troupe Mid-Performance",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dance-troupe.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n12",
    "span": "normal",
    "tag": "Stage",
    "title": "Acrobatic Lift — Dance Troupe",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-acrobatic-lift.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n13",
    "span": "normal",
    "tag": "Stage",
    "title": "Traditional Dance Couple",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dance-couple.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n14",
    "span": "normal",
    "tag": "Stage",
    "title": "Host in Red on Stage",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-host-red-dress.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n15",
    "span": "normal",
    "tag": "Stage",
    "title": "MC at the Podium — 9th Edition Banner",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-mc-podium.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n16",
    "span": "normal",
    "tag": "Stage",
    "title": "Young Performer in Blue on Stage",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-girl-blue-gown.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n17",
    "span": "normal",
    "tag": "Stage",
    "title": "Young Dancer with the Troupe",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-boy-dancing.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n18",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Trophy Handover and Handshake",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-trophy-handover.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n19",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Handshake and Trophy — Award Recipient",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handshake-trophy.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n20",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Winner with Trophy and Mic",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-winner-trophy-mic.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n21",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Trophy Handover — Award Recipient",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handover-woman.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n22",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Award Handover — Recipient in Blue",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handover-woman-blue.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n23",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Handshake at the 9th Edition Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handshake-backdrop.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n24",
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Dignitaries at the Gala Table",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dignitaries.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n25",
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Guests in Conversation",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-guests-conversation.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n26",
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Host with a Special Guest",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-host-elderly-guest.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n27",
    "span": "wide",
    "tag": "The Hall",
    "title": "The Hall from the Back — Gala in Full Swing",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-hall-from-back.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n28",
    "span": "normal",
    "tag": "Celebration",
    "title": "Celebration at the Table",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-celebration-table.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n29",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Group Photo on Stage — Best of Edo Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-stage-group-photo.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n30",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Trophy Held Aloft",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-trophy-aloft.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n31",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0652.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n32",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0655.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n33",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0661.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n34",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0662.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n35",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0664.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n36",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0667.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n37",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0680.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n38",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0714.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n39",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0728.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n40",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0748.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n41",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0758.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n42",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0759.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n43",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0778.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n44",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0781.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n45",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0784.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n46",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0786.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n47",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0791.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n48",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0797.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n49",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0801.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n50",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0802.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n51",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0804.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n52",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0807.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n53",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0809.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n54",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0810.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n55",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0811.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n56",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0813.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n57",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0815.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n58",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0817.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n59",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0818.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n60",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0822.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n61",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0825.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n62",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0833.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n63",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0834.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n64",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0835.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n65",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0850.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n66",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0852.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n67",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0856.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n68",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0857.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n69",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0865.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n70",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0872.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n71",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0874.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n72",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0875.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n73",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0876.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n74",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0877.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n75",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0880.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n76",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0888.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n77",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0889.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n78",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0891.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n79",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0900.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n80",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0902.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n81",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0907.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n82",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0914.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n83",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0921.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n84",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0925.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n85",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0933.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n86",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0951.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n87",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0952.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n88",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0954.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n89",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0955.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n90",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0956.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n91",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0962.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n92",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0966.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n93",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0967.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n94",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0975.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n95",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0976.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n96",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0990.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n97",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0991.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n98",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0993.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n99",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0995.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n100",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_0998.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n101",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1004.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n102",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1014.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n103",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1045.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n104",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1048.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n105",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1050.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n106",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1052.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n107",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1067.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n108",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1072.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n109",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1077.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n110",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1079.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n111",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1080.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n112",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1083.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n113",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1085.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n114",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1090.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n115",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1107.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n116",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1128.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n117",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1129.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n118",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1134.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n119",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1141.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n120",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1157.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n121",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1164.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n122",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1166.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n123",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1168.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n124",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1175.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n125",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1178.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n126",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1185.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n127",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1193.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n128",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1195.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n129",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1197.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n130",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1199.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n131",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1201.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n132",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1203.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n133",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1206.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n134",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1214.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n135",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1215.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n136",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1217.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n137",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1220.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n138",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1221.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n139",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1226.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n140",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1228.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n141",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1234.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n142",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1239.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n143",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1252.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n144",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1261.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n145",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1262.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n146",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1264.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n147",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1266.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n148",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1267.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n149",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1270.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n150",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1272.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n151",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1273.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n152",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1275.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n153",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1277.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n154",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1278.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n155",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1282.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n156",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1288.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n157",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1292.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n158",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1293.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n159",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1299.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n160",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1303.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n161",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1305.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n162",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1309.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n163",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1310.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n164",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dsc_1313.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n165",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02585.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n166",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02592.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n167",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02593.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n168",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02594.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n169",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02599.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n170",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02604.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n171",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02605.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n172",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02607.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n173",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02619.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n174",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02621.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n175",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02624.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n176",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02625.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n177",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02626.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n178",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02630.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n179",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02634.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n180",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02635.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n181",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02638.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n182",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02640.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n183",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02650.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n184",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02663.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n185",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02667.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n186",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02675.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n187",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02682.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n188",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02684.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n189",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02696.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n190",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02698.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n191",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02700.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n192",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02708.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n193",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02713.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n194",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02719.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n195",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02726.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n196",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02727.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n197",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02733.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n198",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02740.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n199",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02743.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n200",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02753.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n201",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02755.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n202",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02756.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n203",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02757.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n204",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02762.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n205",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02767.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n206",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02770.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n207",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02773.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n208",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02775.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n209",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02780.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n210",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02785.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n211",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02786.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n212",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02793.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n213",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02796.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n214",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02799.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n215",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02800.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n216",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02802.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n217",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02803.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n218",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02808.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n219",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02813.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n220",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02821.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n221",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02823.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n222",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02824.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n223",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02828.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n224",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02830.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n225",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02832.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n226",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02834.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n227",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02837.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n228",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02848.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n229",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02849.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n230",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02850.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n231",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02856.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n232",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02858.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n233",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02861.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n234",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02867.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n235",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02868.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n236",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02873.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n237",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02875.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n238",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02878.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n239",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02883.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n240",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02887.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n241",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02888.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n242",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02889.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n243",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02894.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n244",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02895.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n245",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02905.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n246",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02906.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n247",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02918.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n248",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02920.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n249",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02921.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n250",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02923.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n251",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02927.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n252",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02929.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n253",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02936.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n254",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02939.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n255",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02941.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n256",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02948.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n257",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02951.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n258",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02966.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n259",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02970.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n260",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02977.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n261",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02987.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n262",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02990.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n263",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_02999.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n264",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03004.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n265",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03008.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n266",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03027.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n267",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03035.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n268",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03043.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n269",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03050.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n270",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03053.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n271",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03055.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n272",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03061.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n273",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03066.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n274",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03068.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n275",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03074.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n276",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03083.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n277",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03087.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n278",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03094.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n279",
    "span": "normal",
    "tag": "9th Edition",
    "title": "9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-ff_03100.jpg",
    "edition": "9th",
    "orientation": "landscape"
  }
];

// Previous editions — the existing site images, unchanged.
export const PREVIOUS_EDITION_PHOTOS = [
  {
    "id": 1,
    "span": "wide",
    "tag": "Official Backdrop",
    "title": "Best of Edo Awards 5th Edition Backdrop",
    "meta": "Official BOEA Stage & Photo Wall",
    "image": "/assets/boea_5th_edition_backdrop.jpeg",
    "edition": "previous"
  },
  {
    "id": 2,
    "span": "normal",
    "tag": "Award Poster",
    "title": "BOEA 6th Edition — Official Award Poster",
    "meta": "Strictly Entertainment Edition Showcase",
    "image": "/assets/boea_6th_edition_poster.jpeg",
    "edition": "previous"
  },
  {
    "id": 3,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Coral Bead Regalia & Edo Heritage",
    "meta": "Great Benin Cultural Symbols & Regalia",
    "image": "/assets/coral_beads.jpeg",
    "edition": "previous"
  },
  {
    "id": 4,
    "span": "wide",
    "tag": "Black Carpet",
    "title": "BOEA Official Black Carpet Backdrop",
    "meta": "Best of Edo Awards Ceremonial Wall",
    "image": "/assets/boea_red_carpet_backdrop.jpeg",
    "edition": "previous"
  },
  {
    "id": 5,
    "span": "normal",
    "tag": "Trophy Emblem",
    "title": "The Great Benin Award Trophy",
    "meta": "Symbol of Excellence, Leadership & Distinction",
    "image": "/assets/boea_6th_edition_poster.jpeg",
    "edition": "previous"
  },
  {
    "id": 6,
    "span": "normal",
    "tag": "Cultural Textiles",
    "title": "Esan Weaving & Heritage Motifs",
    "meta": "Esanland Cultural Heritage Preservation",
    "image": "/assets/coral_bead.jpeg",
    "edition": "previous"
  },
  {
    "id": 7,
    "span": "normal",
    "tag": "Highland Landscape",
    "title": "Ososo Hills — Edo North Highland Majesty",
    "meta": "Natural Heritage of Edo State",
    "image": "/assets/ososo_hills.png",
    "edition": "previous"
  },
  {
    "id": 8,
    "span": "normal",
    "tag": "Media Wall",
    "title": "BOEA Official Media & Photo Wall",
    "meta": "Best of Edo Awards Official Press Wall",
    "image": "/assets/boea_photo_wall.jpeg",
    "edition": "previous"
  }
];

// Fallback gallery: 9th edition first, then previous editions.
export const INITIAL_PHOTOS = [...NINTH_EDITION_PHOTOS, ...PREVIOUS_EDITION_PHOTOS];

export const INITIAL_VIDEOS = [
  {
    "id": "vid-1",
    "title": "BOEA Gala Night \u2014 Official Highlights",
    "meta": "Best of Edo Award \u2014 Event Coverage",
    "duration": "1:00",
    "tag": "Gala Night",
    "thumb": "/assets/boea_red_carpet_backdrop.jpeg",
    "src": "/assets/boea_video_1.mp4"
  },
  {
    "id": "vid-2",
    "title": "BOEA Award Night \u2014 Stage Moments",
    "meta": "Best of Edo Award \u2014 Ceremony Coverage",
    "duration": "0:36",
    "tag": "Ceremony",
    "thumb": "/assets/boea_5th_edition_backdrop.jpeg",
    "src": "/assets/boea_video_2.mp4"
  },
  {
    "id": "vid-3",
    "title": "BOEA Event Highlights — Atmosphere",
    "meta": "Best of Edo Award — Event Atmosphere",
    "duration": "0:35",
    "tag": "Highlights",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/assets/boea_video_3.mp4"
  },
  {
    "id": "vid-4",
    "title": "BOEA Award Night — Black Carpet Coverage",
    "meta": "Best of Edo Award — Black Carpet",
    "duration": "0:59",
    "tag": "Black Carpet",
    "thumb": "/assets/boea_6th_edition_poster.jpeg",
    "src": "/assets/boea_video_4.mp4"
  },
  {
    "id": "vid-5",
    "title": "BOEA Cultural Showcase & Heritage Acts",
    "meta": "Best of Edo Award — Cultural Acts",
    "duration": "0:30",
    "tag": "Entertainment",
    "thumb": "/assets/coral_beads.jpeg",
    "src": "/assets/boea_video_5.mp4"
  },
  {
    "id": "vid-6",
    "title": "BOEA Award Moment — Special Recognition",
    "meta": "Best of Edo Award — Special Presentation",
    "duration": "0:15",
    "tag": "Award Moment",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/assets/boea_video_6.mp4"
  },
  {
    "id": "vid-renamed-1",
    "title": "BOEA Gala Highlights & Stage Clip 1",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:35",
    "tag": "Gala Night",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/images/boea_video_clip_01.mp4"
  },
  {
    "id": "vid-renamed-2",
    "title": "BOEA Gala Highlights & Stage Clip 2",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:40",
    "tag": "Stage Ceremony",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/images/boea_video_clip_02.mp4"
  },
  {
    "id": "vid-renamed-3",
    "title": "BOEA Gala Highlights & Stage Clip 3",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:45",
    "tag": "Gala Night",
    "thumb": "/assets/boea_5th_edition_backdrop.jpeg",
    "src": "/images/boea_video_clip_03.mp4"
  },
  {
    "id": "vid-renamed-4",
    "title": "BOEA Gala Highlights & Stage Clip 4",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:50",
    "tag": "Stage Ceremony",
    "thumb": "/assets/boea_red_carpet_backdrop.jpeg",
    "src": "/images/boea_video_clip_04.mp4"
  },
  {
    "id": "vid-renamed-5",
    "title": "BOEA Gala Highlights & Stage Clip 5",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:55",
    "tag": "Gala Night",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/images/boea_video_clip_05.mp4"
  },
  {
    "id": "vid-renamed-6",
    "title": "BOEA Gala Highlights & Stage Clip 6",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:30",
    "tag": "Stage Ceremony",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/images/boea_video_clip_06.mp4"
  },
  {
    "id": "vid-renamed-7",
    "title": "BOEA Official Awardees Gala Documentary",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "2:15",
    "tag": "Official Documentary",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/images/boea_gala_documentary.mp4"
  },
  {
    "id": "vid-renamed-8",
    "title": "EPP Media Executive Press Coverage",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "1:45",
    "tag": "Media Press",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/images/boea_epp_press_coverage.mp4"
  }
];

// Photo cards use CSS background images, so native loading="lazy" does not
// apply. This wrapper only sets the background once the card is near the
// viewport (200px root margin) — with 279 photos in the 9th-edition group
// the page must not fetch them all on first paint.
function LazyPhotoCard({ item, onOpen }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <article
      ref={ref}
      className={`gallery-card gallery-card-${item.span || 'normal'}${item.orientation === 'portrait' ? ' gallery-card-portrait' : ''}`}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(item)}
    >
      <div
        className="gallery-card-bg"
        style={visible ? { backgroundImage: `url("${item.image}")` } : undefined}
      />
      <div className="gallery-card-shade" />
      <span className="gallery-zoom-btn" aria-label="View photo"><ZoomIn size={18} /></span>
      <div className="gallery-card-caption">
        {item.tag && <span className="label-caps gallery-card-tag">{item.tag}</span>}
        <h3 className="gallery-card-title">{item.title}</h3>
        {item.meta && <p className="caption gallery-card-meta">{item.meta}</p>}
      </div>
    </article>
  );
}

export default function Gallery() {
  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const sanitizeVideos = (list) =>
      list.map((v) =>
        v.thumb === '/assets/boea_photo_wall.jpeg'
          ? { ...v, thumb: '/assets/boea_brand_award_image.jpeg' }
          : v
      );
    // The 9th-edition set is always present: CMS photos still render, and the
    // new set is merged in (deduped by image) so the two-group layout shows
    // even before the admin adds anything to the CMS.
    const mergePhotos = (list) => {
      const seen = new Set(list.map((p) => p.image));
      const missing = NINTH_EDITION_PHOTOS.filter((p) => !seen.has(p.image));
      return [...missing, ...list];
    };
    cmsFetch(CMS_PATHS.galleryPhotos, INITIAL_PHOTOS).then((list) => {
      if (!cancelled) setPhotos(Array.isArray(list) ? mergePhotos(list) : INITIAL_PHOTOS);
    });
    cmsFetch(CMS_PATHS.galleryVideos, INITIAL_VIDEOS).then((list) => {
      if (!cancelled) setVideos(Array.isArray(list) ? sanitizeVideos(list) : INITIAL_VIDEOS);
    });
    return () => { cancelled = true; };
  }, []);

  const isNinthEdition = (item) =>
    item.edition === '9th' ||
    (typeof item.image === 'string' && item.image.includes('/assets/boea-9th-'));
  const ninthPhotos = photos.filter(isNinthEdition);
  const previousPhotos = photos.filter((p) => !isNinthEdition(p));

  return (
    <main>
      <PageHero
        eyebrow="Gallery & Media"
        title="Moments of Excellence"
        intro="Explore our official photography and event highlights celebrating Edo royalty, cultural heritage, and contemporary achievers across past editions."
      />

      <section className="page-section section">
        <div className="container">
          <div className="gallery-header-row">
            <div className="gallery-tabs">
              <button type="button" className={`gallery-tab ${tab === 'photos' ? 'active' : ''}`} onClick={() => setTab('photos')}>
                <Camera size={18} />
                Photo Gallery ({photos.length})
              </button>
              <button type="button" className={`gallery-tab ${tab === 'videos' ? 'active' : ''}`} onClick={() => setTab('videos')}>
                <Film size={18} />
                Video Gallery ({videos.length})
              </button>
            </div>
            <span className="gallery-count label-caps text-muted">
              Past Editions Archive
            </span>
          </div>

          {tab === 'photos' ? (
            <div>
              {ninthPhotos.length > 0 && (
                <section className="gallery-group" aria-label="9th edition photos">
                  <div className="gallery-group-head">
                    <span className="label-caps gold-text">The latest</span>
                    <h2 className="headline-md gallery-group-title">9th edition</h2>
                    <p className="body-sm text-muted">
                      15 November 2026 — fresh from the black carpet, the stage and the awards.
                    </p>
                  </div>
                  <div className="gallery-bento">
                    {ninthPhotos.map((item) => (
                      <LazyPhotoCard key={item.id} item={item} onOpen={setActivePhoto} />
                    ))}
                  </div>
                </section>
              )}
              {previousPhotos.length > 0 && (
                <section className="gallery-group" aria-label="Previous edition photos">
                  <div className="gallery-group-head">
                    <span className="label-caps gold-text">Archive</span>
                    <h2 className="headline-md gallery-group-title">Previous edition</h2>
                    <p className="body-sm text-muted">
                      Moments from earlier editions of the Best of Edo Awards.
                    </p>
                  </div>
                  <div className="gallery-bento">
                    {previousPhotos.map((item) => (
                      <LazyPhotoCard key={item.id} item={item} onOpen={setActivePhoto} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div>
              <div className="gallery-videos-grid" style={{ marginBottom: '3rem' }}>
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="gallery-video-card"
                    onClick={() => setActiveVideo(video)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveVideo(video)}
                  >
                    <div className="gallery-video-bg" style={{ backgroundImage: `url("${video.thumb}")` }} />
                    <div className="gallery-video-overlay" />
                    <span className="gallery-duration-badge">{video.duration}</span>
                    <span className="gallery-play-btn" title="Play Video"><Play size={28} fill="currentColor" /></span>
                    <div className="gallery-card-caption">
                      <span className="label-caps gallery-card-tag">{video.tag}</span>
                      <h3 className="gallery-card-title">{video.title}</h3>
                      <p className="caption gallery-card-meta">{video.meta}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Broadcast Reels Section */}
              <div style={{ background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem 1.5rem', marginTop: '2rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <span className="label-caps gold-text">Social Media Broadcast Reels</span>
                  <h3 className="headline-md" style={{ margin: '0.25rem 0' }}>Featured Television & Social Video Links</h3>
                  <p className="body-sm text-muted" style={{ margin: 0 }}>
                    Watch official broadcast reels and social media video links covering the Best of Edo Award Gala nights.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {FEATURED_PRESS_LINKS.filter((item) => item.type === 'video').map((item) => (
                    <RichLinkPreview key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      {activePhoto && (
        <div className="video-modal-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div style={{ textAlign: 'left' }}>
                <span className="label-caps gold-text">{activePhoto.tag}</span>
                <h3 className="headline-md" style={{ margin: 0 }}>{activePhoto.title}</h3>
              </div>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActivePhoto(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="photo-modal-img-wrap">
              <img src={activePhoto.image} alt={activePhoto.title} className="photo-modal-img" />
            </div>
            {activePhoto.meta && (
              <p className="body-sm text-muted" style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                {activePhoto.meta}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div style={{ textAlign: 'left' }}>
                <span className="label-caps gold-text">{activeVideo.tag}</span>
                <h3 className="headline-md" style={{ margin: 0 }}>{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="video-modal-player-wrap">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                className="video-modal-player"
              />
            </div>
          </div>
        </div>
      )}

      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate Someone Now"
      />
    </main>
  );
}
