export const business = {
  name: "ADVA Labor Services Inc.",
  office: "(303) 598-9385",
  officeHref: "tel:+13035989385",
  email: "advalabor@gmail.com",
  location: "Aurora, Colorado",
  address: "720 Billings St, Unit A, Aurora, CO 80011",
  contacts: [
    { name: "Jessie Lopez", phone: "(720) 707-7257", href: "tel:+17207077257" },
    {
      name: "Raquel Gallardo",
      phone: "(720) 557-1051",
      href: "tel:+17205571051",
    },
  ],
} as const;

// Company-supplied public content. No unsupported numbers, credentials, or project attribution.
export const services = [
  {
    id: "earthwork",
    number: "01",
    title: "Earthwork & site preparation",
    short: "Earthwork",
    description:
      "Mass excavation, grading, cut and fill, and preparation for the work ahead.",
    scopes: [
      "Mass excavation",
      "Site grading",
      "Cut & fill",
      "Site preparation",
    ],
    image: "/redesign/excavation.webp",
    alt: "Excavator and bucket on a construction site, from ADVA’s existing photo archive.",
  },
  {
    id: "demolition",
    number: "02",
    title: "Demolition & hauling",
    short: "Demolition & hauling",
    description:
      "Structural demolition, debris removal, and hauling for site development.",
    scopes: ["Structural demolition", "Debris removal", "Material hauling"],
    image: "/redesign/fieldwork.webp",
    alt: "Heavy equipment on an active construction site, from ADVA’s existing photo archive.",
  },
  {
    id: "utilities",
    number: "03",
    title: "Underground utilities",
    short: "Underground utilities",
    description:
      "Water, sewer, storm drainage, and the infrastructure below grade.",
    scopes: [
      "Water infrastructure",
      "Sewer infrastructure",
      "Storm drainage",
      "Underground installation",
    ],
    image: "/redesign/utilities.webp",
    alt: "Open utility trench with pipe, from ADVA’s existing photo archive.",
  },
  {
    id: "environmental",
    number: "04",
    title: "Environmental services",
    short: "Environmental",
    description:
      "Discuss environmental and hazardous-material requirements with the ADVA team.",
    scopes: ["Environmental scope review", "Hazardous-material requirements"],
    image: null,
    alt: "",
  },
] as const;

export const photographs = [
  {
    id: "excavation",
    title: "Excavation & site preparation",
    category: "Earthwork",
    image: "/redesign/excavation.webp",
    alt: services[0].alt,
    orientation: "landscape",
  },
  {
    id: "fieldwork",
    title: "Equipment in the field",
    category: "Earthwork",
    image: "/redesign/fieldwork.webp",
    alt: services[1].alt,
    orientation: "landscape",
  },
  {
    id: "utilities",
    title: "Work below grade",
    category: "Utilities",
    image: "/redesign/utilities.webp",
    alt: services[2].alt,
    orientation: "portrait",
  },
  {
    id: "grading",
    title: "Grading & preparation",
    category: "Site preparation",
    image: "/redesign/grading.webp",
    alt: "Graded site with curbs, cones, and construction work in the background, from ADVA’s existing photo archive.",
    orientation: "landscape",
  },
  {
    id: "site",
    title: "Preparing the site",
    category: "Site preparation",
    image: "/redesign/site.webp",
    alt: "Construction site with finished curbs and temporary traffic cones, from ADVA’s existing photo archive.",
    orientation: "portrait",
  },
  {
    id: "trench",
    title: "Utility installation",
    category: "Utilities",
    image: "/redesign/trench.webp",
    alt: "Open utility trench with pipes and connections, from ADVA’s existing photo archive.",
    orientation: "portrait",
  },
] as const;
