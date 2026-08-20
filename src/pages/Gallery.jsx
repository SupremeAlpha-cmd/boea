import { useState, useEffect } from 'react';
import { Play, Camera, Film, X, ZoomIn } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import RichLinkPreview from '../components/RichLinkPreview';
import { FEATURED_PRESS_LINKS } from '../data/content';
import '../styles/pages.css';
import './Gallery.css';

export const INITIAL_PHOTOS = [
  {
    "id": 1,
    "span": "wide",
    "tag": "Official Backdrop",
    "title": "Best of Edo Awards 5th Edition Backdrop",
    "meta": "Official BOEA Stage & Photo Wall",
    "image": "/assets/boea_5th_edition_backdrop.jpeg"
  },
  {
    "id": 2,
    "span": "normal",
    "tag": "Award Poster",
    "title": "BOEA 6th Edition \u2014 Official Award Poster",
    "meta": "Strictly Entertainment Edition Showcase",
    "image": "/assets/boea_6th_edition_poster.jpeg"
  },
  {
    "id": 3,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Coral Bead Regalia & Edo Heritage",
    "meta": "Great Benin Cultural Symbols & Regalia",
    "image": "/assets/coral_beads.jpeg"
  },
  {
    "id": 4,
    "span": "wide",
    "tag": "Red Carpet",
    "title": "BOEA Official Red Carpet Backdrop",
    "meta": "Best of Edo Awards Ceremonial Wall",
    "image": "/assets/boea_red_carpet_backdrop.jpeg"
  },
  {
    "id": 5,
    "span": "normal",
    "tag": "Trophy Emblem",
    "title": "The Great Benin Award Trophy",
    "meta": "Symbol of Excellence, Leadership & Distinction",
    "image": "/assets/boea_6th_edition_poster.jpeg"
  },
  {
    "id": 6,
    "span": "normal",
    "tag": "Cultural Textiles",
    "title": "Esan Weaving & Heritage Motifs",
    "meta": "Esanland Cultural Heritage Preservation",
    "image": "/assets/coral_bead.jpeg"
  },
  {
    "id": 7,
    "span": "normal",
    "tag": "Highland Landscape",
    "title": "Ososo Hills \u2014 Edo North Highland Majesty",
    "meta": "Natural Heritage of Edo State",
    "image": "/assets/ososo_hills.png"
  },
  {
    "id": 8,
    "span": "normal",
    "tag": "Media Wall",
    "title": "BOEA Official Media & Photo Wall",
    "meta": "Best of Edo Awards Official Press Wall",
    "image": "/assets/boea_photo_wall.jpeg"
  },
  {
    "id": 9,
    "span": "wide",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #1",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_01.jpeg"
  },
  {
    "id": 10,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #2",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_02.jpeg"
  },
  {
    "id": 11,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #3",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_03.jpeg"
  },
  {
    "id": 12,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #4",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_04.jpeg"
  },
  {
    "id": 13,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #5",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_05.jpeg"
  },
  {
    "id": 14,
    "span": "wide",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #6",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_06.jpeg"
  },
  {
    "id": 15,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #7",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_07.jpeg"
  },
  {
    "id": 16,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #8",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_08.jpeg"
  },
  {
    "id": 17,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #9",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_09.jpeg"
  },
  {
    "id": 18,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #10",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_10.jpeg"
  },
  {
    "id": 19,
    "span": "wide",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #11",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_11.jpeg"
  },
  {
    "id": 20,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #12",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_12.jpeg"
  },
  {
    "id": 21,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #13",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_13.jpeg"
  },
  {
    "id": 22,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #14",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_14.jpeg"
  },
  {
    "id": 23,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #15",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_15.jpeg"
  },
  {
    "id": 24,
    "span": "wide",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #16",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_16.jpeg"
  },
  {
    "id": 25,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #17",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_17.jpeg"
  },
  {
    "id": 26,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #18",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_18.jpeg"
  },
  {
    "id": 27,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #19",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_19.jpeg"
  },
  {
    "id": 28,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #20",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_20.jpeg"
  },
  {
    "id": 29,
    "span": "wide",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #21",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_21.jpeg"
  },
  {
    "id": 30,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #22",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_22.jpeg"
  },
  {
    "id": 31,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #23",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_23.jpeg"
  },
  {
    "id": 32,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #24",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_24.jpeg"
  },
  {
    "id": 33,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #25",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_25.jpeg"
  },
  {
    "id": 34,
    "span": "wide",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #26",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_26.jpeg"
  },
  {
    "id": 35,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #27",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_27.jpeg"
  },
  {
    "id": 36,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #28",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_28.jpeg"
  },
  {
    "id": 37,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #29",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_29.jpeg"
  },
  {
    "id": 38,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #30",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_30.jpeg"
  },
  {
    "id": 39,
    "span": "wide",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #31",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_31.jpeg"
  },
  {
    "id": 40,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #32",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_32.jpeg"
  },
  {
    "id": 41,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #33",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_33.jpeg"
  },
  {
    "id": 42,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #34",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_34.jpeg"
  },
  {
    "id": 43,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #35",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_35.jpeg"
  },
  {
    "id": 44,
    "span": "wide",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #36",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_36.jpeg"
  },
  {
    "id": 45,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #37",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_37.jpeg"
  },
  {
    "id": 46,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #38",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_38.jpeg"
  },
  {
    "id": 47,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #39",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_39.jpeg"
  },
  {
    "id": 48,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #40",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_40.jpeg"
  },
  {
    "id": 49,
    "span": "wide",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #41",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_41.jpeg"
  },
  {
    "id": 50,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #42",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_42.jpeg"
  },
  {
    "id": 51,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #43",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_43.jpeg"
  },
  {
    "id": 52,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #44",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_44.jpeg"
  },
  {
    "id": 53,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #45",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_45.jpeg"
  },
  {
    "id": 54,
    "span": "wide",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #46",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_46.jpeg"
  },
  {
    "id": 55,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #47",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_47.jpeg"
  },
  {
    "id": 56,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #48",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_48.jpeg"
  },
  {
    "id": 57,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #49",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_49.jpeg"
  },
  {
    "id": 58,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #50",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_50.jpeg"
  },
  {
    "id": 59,
    "span": "wide",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #51",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_51.jpeg"
  },
  {
    "id": 60,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #52",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_52.jpeg"
  },
  {
    "id": 61,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #53",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_53.jpeg"
  },
  {
    "id": 62,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #54",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_54.jpeg"
  },
  {
    "id": 63,
    "span": "normal",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #55",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_55.jpeg"
  },
  {
    "id": 64,
    "span": "wide",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #56",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_56.jpeg"
  },
  {
    "id": 65,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #57",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_57.jpeg"
  },
  {
    "id": 66,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #58",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_58.jpeg"
  },
  {
    "id": 67,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #59",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_59.jpeg"
  },
  {
    "id": 68,
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #60",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_60.jpeg"
  },
  {
    "id": 69,
    "span": "wide",
    "tag": "Official Gala",
    "title": "Best of Edo Award Gala Moment #61",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_61.jpeg"
  },
  {
    "id": 70,
    "span": "normal",
    "tag": "Red Carpet",
    "title": "Best of Edo Award Gala Moment #62",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_62.jpeg"
  },
  {
    "id": 71,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Best of Edo Award Gala Moment #63",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_gallery_photo_63.jpeg"
  },
  {
    "id": 72,
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Best of Edo Award Gala Moment #64",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_brand_alt_logo.jpeg"
  },
  {
    "id": 73,
    "span": "normal",
    "tag": "Behind The Scenes",
    "title": "Best of Edo Award Gala Moment #65",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_brand_award_image.jpeg"
  },
  {
    "id": 74,
    "span": "wide",
    "tag": "Dignitaries",
    "title": "Best of Edo Award Gala Moment #66",
    "meta": "Official BOEA Ceremonial Showcase",
    "image": "/images/boea_brand_logo+branding.jpeg"
  }
];

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
    "title": "BOEA Award Night — Red Carpet Coverage",
    "meta": "Best of Edo Award — Red Carpet",
    "duration": "0:59",
    "tag": "Red Carpet",
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

export default function Gallery() {
  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const savedPhotos = localStorage.getItem('boea-gallery-photos');
    if (savedPhotos) {
      try { setPhotos(JSON.parse(savedPhotos)); } catch (e) { setPhotos(INITIAL_PHOTOS); }
    } else {
      setPhotos(INITIAL_PHOTOS);
    }

    const savedVideos = localStorage.getItem('boea-gallery-videos');
    if (savedVideos) {
      try {
        const parsed = JSON.parse(savedVideos);
        const sanitized = parsed.map((v) =>
          v.thumb === '/assets/boea_photo_wall.jpeg'
            ? { ...v, thumb: '/assets/boea_brand_award_image.jpeg' }
            : v
        );
        setVideos(sanitized);
      } catch (e) {
        setVideos(INITIAL_VIDEOS);
      }
    } else {
      setVideos(INITIAL_VIDEOS);
    }
  }, []);

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
            <div className="gallery-bento">
              {photos.map((item) => (
                <article
                  key={item.id}
                  className={`gallery-card gallery-card-${item.span || 'normal'}`}
                  onClick={() => setActivePhoto(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActivePhoto(item)}
                >
                  <div className="gallery-card-bg" style={{ backgroundImage: `url("${item.image}")` }} />
                  <div className="gallery-card-shade" />
                  <span className="gallery-zoom-btn" aria-label="View photo"><ZoomIn size={18} /></span>
                  <div className="gallery-card-caption">
                    {item.tag && <span className="label-caps gallery-card-tag">{item.tag}</span>}
                    <h3 className="gallery-card-title">{item.title}</h3>
                    {item.meta && <p className="caption gallery-card-meta">{item.meta}</p>}
                  </div>
                </article>
              ))}
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
