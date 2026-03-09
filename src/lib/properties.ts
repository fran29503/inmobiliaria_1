export interface Property {
  address: string
  price: string
  priceRaw: number
  beds: number
  baths: number
  sqft: number
  neighborhood: string
  city: string
  url: string
  images: string[]
}

const raw = [
  {
    address: "19986 NE 5th Ct Unit 4D, Miami, FL 33179",
    price: "$419,000",
    beds: 2, baths: 2, sqft: 1700, neighborhood: "Miami",
    url: "https://www.redfin.com/FL/Miami/19986-NE-5th-Ct-33179/unit-4D/home/43005618",
    image_urls: "https://ssl.cdn-redfin.com/system_files/media/1183548_JPG/item_53.jpg;https://ssl.cdn-redfin.com/system_files/media/1183548_JPG/genLdpUgcMediaBrowserUrlComp/item_15.jpg;https://ssl.cdn-redfin.com/system_files/media/1183548_JPG/genLdpUgcMediaBrowserUrlComp/item_77.jpg;https://ssl.cdn-redfin.com/system_files/media/1183548_JPG/genLdpUgcMediaBrowserUrlComp/item_82.jpg;https://ssl.cdn-redfin.com/system_files/media/1183548_JPG/genLdpUgcMediaBrowserUrlComp/item_37.jpg"
  },
  {
    address: "269 NE 110th Ter, Miami, FL 33161",
    price: "$649,000",
    beds: 4, baths: 3, sqft: 1500, neighborhood: "Miami",
    url: "https://www.redfin.com/FL/Miami/269-NE-110th-Ter-33161/home/43015796",
    image_urls: "https://ssl.cdn-redfin.com/photo/107/bigphoto/474/F10543474_1.jpg;https://ssl.cdn-redfin.com/photo/107/mbphotov3/474/genMid.F10543474_9_1.jpg;https://ssl.cdn-redfin.com/photo/107/mbphotov3/474/genMid.F10543474_27_1.jpg;https://ssl.cdn-redfin.com/photo/107/mbphotov3/474/genMid.F10543474_14_1.jpg;https://ssl.cdn-redfin.com/photo/107/mbphotov3/474/genMid.F10543474_21_1.jpg"
  },
  {
    address: "7401 SW 21st St, Miami, FL 33155",
    price: "$649,900",
    beds: 6, baths: 3, sqft: 1694, neighborhood: "Miami",
    url: "https://www.redfin.com/FL/Miami/7401-SW-21st-St-33155/home/43420721",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/518/A11952518_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/518/genMid.A11952518_7_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/518/genMid.A11952518_23_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/518/genMid.A11952518_12_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/518/genMid.A11952518_18_1.jpg"
  },
  {
    address: "14601 NW 10th Ave, Miami, FL 33168",
    price: "$625,000",
    beds: 3, baths: 1, sqft: 1679, neighborhood: "Miami",
    url: "https://www.redfin.com/FL/Miami/14601-NW-10th-Ave-33168/home/42998620",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/512/A11952512_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/512/genMid.A11952512_11_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/512/genMid.A11952512_33_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/512/genMid.A11952512_17_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/512/genMid.A11952512_26_0.jpg"
  },
  {
    address: "9590 SW 51st Ter, Miami, FL 33165",
    price: "$775,000",
    beds: 3, baths: 2, sqft: 1872, neighborhood: "Miami",
    url: "https://www.redfin.com/FL/Miami/9590-SW-51st-Ter-33165/home/43081916",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/402/A11952402_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/402/genMid.A11952402_6_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/402/genMid.A11952402_18_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/402/genMid.A11952402_9_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/402/genMid.A11952402_14_0.jpg"
  },
  {
    address: "Brickell Tower, Miami, FL 33130",
    price: "$1,050,000",
    beds: 2, baths: 2.5, sqft: 1119, neighborhood: "Brickell",
    url: "https://www.redfin.com/FL/Miami/Undisclosed-address-33130/home/79132961",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/135/A11950135_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/135/genMid.A11950135_9_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/135/genMid.A11950135_29_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/135/genMid.A11950135_15_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/135/genMid.A11950135_23_1.jpg"
  },
  {
    address: "55 SW 9th St #2305, Miami, FL 33130",
    price: "$595,000",
    beds: 1, baths: 2, sqft: 826, neighborhood: "Brickell",
    url: "https://www.redfin.com/FL/Miami/55-SW-9th-St-33130/unit-2305/home/79135275",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/374/A11952374_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/374/genMid.A11952374_5_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/374/genMid.A11952374_17_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/374/genMid.A11952374_9_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/374/genMid.A11952374_13_1.jpg"
  },
  {
    address: "1408 Brickell Bay Dr #807, Miami, FL 33131",
    price: "$438,000",
    beds: 1, baths: 1, sqft: 787, neighborhood: "Brickell",
    url: "https://www.redfin.com/FL/Miami/1408-Brickell-Bay-Dr-33131/unit-807/home/42767272",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/745/A11949745_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/745/genMid.A11949745_5_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/745/genMid.A11949745_17_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/745/genMid.A11949745_9_1.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/745/genMid.A11949745_13_1.jpg"
  },
  {
    address: "1425 Brickell Ave Unit 58E, Miami, FL 33131",
    price: "$5,195,000",
    beds: 3, baths: 4, sqft: 3357, neighborhood: "Brickell",
    url: "https://www.redfin.com/FL/Miami/1425-Brickell-Ave-33131/unit-58E/home/43304695",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/012/A11950012_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/012/genMid.A11950012_10_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/012/genMid.A11950012_30_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/012/genMid.A11950012_16_0.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/012/genMid.A11950012_24_0.jpg"
  },
  {
    address: "540 Brickell Key Dr #705, Miami, FL 33131",
    price: "$349,000",
    beds: 1, baths: 1.5, sqft: 700, neighborhood: "Brickell",
    url: "https://www.redfin.com/FL/Miami/540-Brickell-Key-Dr-33131/unit-705/home/42762036",
    image_urls: "https://ssl.cdn-redfin.com/photo/105/bigphoto/861/A11947861_3.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/861/genMid.A11947861_9_3.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/861/genMid.A11947861_28_3.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/861/genMid.A11947861_15_3.jpg;https://ssl.cdn-redfin.com/photo/105/mbphotov3/861/genMid.A11947861_22_3.jpg"
  },
  {
    address: "1628 Wellesley Ave, Los Angeles, CA 90025",
    price: "$1,700,000",
    beds: 4, baths: 4, sqft: 2797, neighborhood: "Los Angeles",
    url: "https://www.redfin.com/CA/Los-Angeles/1628-Wellesley-Ave-90025/home/6755938",
    image_urls: "https://ssl.cdn-redfin.com/photo/40/bigphoto/847/26642847_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/847/genMid.26642847_3_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/847/genMid.26642847_11_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/847/genMid.26642847_6_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/847/genMid.26642847_9_0.jpg"
  },
  {
    address: "11575 Amanda Dr, Studio City, CA 91604",
    price: "$2,099,000",
    beds: 4, baths: 3, sqft: 15000, neighborhood: "Los Angeles",
    url: "https://www.redfin.com/CA/Studio-City/11575-Amanda-Dr-91604/home/5250241",
    image_urls: "https://ssl.cdn-redfin.com/system_files/media/1005054_JPG/item_195.jpg;https://ssl.cdn-redfin.com/system_files/media/1005054_JPG/genLdpUgcMediaBrowserUrlComp/item_146.jpg;https://ssl.cdn-redfin.com/system_files/media/1005054_JPG/genLdpUgcMediaBrowserUrlComp/item_194.jpg;https://ssl.cdn-redfin.com/system_files/media/1005054_JPG/genLdpUgcMediaBrowserUrlComp/item_142.jpg;https://ssl.cdn-redfin.com/system_files/media/1005054_JPG/genLdpUgcMediaBrowserUrlComp/item_180.jpg"
  },
  {
    address: "1745 S Bundy Dr, Los Angeles, CA 90025",
    price: "$1,299,000",
    beds: 2, baths: 1, sqft: 1022, neighborhood: "Los Angeles",
    url: "https://www.redfin.com/CA/Los-Angeles/1745-S-Bundy-Dr-90025/home/6756119",
    image_urls: "https://ssl.cdn-redfin.com/system_files/media/1186605_JPG/item_4.jpg;https://ssl.cdn-redfin.com/system_files/media/1186605_JPG/genLdpUgcMediaBrowserUrlComp/item_1.jpg;https://ssl.cdn-redfin.com/system_files/media/1186605_JPG/genLdpUgcMediaBrowserUrlComp/item_10.jpg;https://ssl.cdn-redfin.com/system_files/media/1186605_JPG/genLdpUgcMediaBrowserUrlComp/item_7.jpg;https://ssl.cdn-redfin.com/system_files/media/1186605_JPG/genLdpUgcMediaBrowserUrlComp/item_13.jpg"
  },
  {
    address: "11215 Wilbur Ave, Porter Ranch, CA 91326",
    price: "$1,099,000",
    beds: 5, baths: 4.5, sqft: 2450, neighborhood: "Los Angeles",
    url: "https://www.redfin.com/CA/Porter-Ranch/11215-Wilbur-Ave-91326/home/17245565",
    image_urls: "https://ssl.cdn-redfin.com/system_files/media/1155037_JPG/item_2.jpg;https://ssl.cdn-redfin.com/system_files/media/1155037_JPG/genLdpUgcMediaBrowserUrlComp/item_36.jpg;https://ssl.cdn-redfin.com/system_files/media/1155037_JPG/genLdpUgcMediaBrowserUrlComp/item_1.jpg;https://ssl.cdn-redfin.com/system_files/media/1155037_JPG/genLdpUgcMediaBrowserUrlComp/item_5.jpg;https://ssl.cdn-redfin.com/system_files/media/1155037_JPG/genLdpUgcMediaBrowserUrlComp/item_10.jpg"
  },
  {
    address: "1348 Kellam Ave, Los Angeles, CA 90026",
    price: "$1,700,000",
    beds: 4, baths: 2.5, sqft: 1400, neighborhood: "Los Angeles",
    url: "https://www.redfin.com/CA/Los-Angeles/1348-Kellam-Ave-90026/home/7053663",
    image_urls: "https://ssl.cdn-redfin.com/photo/40/bigphoto/945/26642945_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/945/genMid.26642945_9_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/945/genMid.26642945_28_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/945/genMid.26642945_15_0.jpg;https://ssl.cdn-redfin.com/photo/40/mbphotov3/945/genMid.26642945_22_0.jpg"
  },
  {
    address: "2250 NW 59th St, Boca Raton, FL 33496",
    price: "$1,749,900",
    beds: 4, baths: 2.5, sqft: 3374, neighborhood: "Boca Raton",
    url: "https://www.redfin.com/FL/Boca-Raton/2250-NW-59th-St-33496/home/42298069",
    image_urls: "https://ssl.cdn-redfin.com/photo/106/bigphoto/739/RX-11157739_0.jpg;https://ssl.cdn-redfin.com/photo/106/bcsphoto/452/genBcs.RX-11104452_0.jpg;https://ssl.cdn-redfin.com/photo/106/bcsphoto/452/genBcs.RX-11104452_1_0.jpg;https://ssl.cdn-redfin.com/photo/106/bcsphoto/452/genBcs.RX-11104452_12_0.jpg;https://ssl.cdn-redfin.com/photo/106/bcsphoto/876/genBcs.RX-11127876_0.jpg"
  },
  {
    address: "775 Park Dr W, Boca Raton, FL 33432",
    price: "$4,395,000",
    beds: 4, baths: 4.5, sqft: 4017, neighborhood: "Boca Raton",
    url: "https://www.redfin.com/FL/Boca-Raton/775-Park-Dr-W-33432/home/176060217",
    image_urls: "https://ssl.cdn-redfin.com/photo/106/bigphoto/736/RX-11157736_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/736/genMid.RX-11157736_7_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/736/genMid.RX-11157736_23_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/736/genMid.RX-11157736_12_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/736/genMid.RX-11157736_18_0.jpg"
  },
  {
    address: "9288 Lake Serena Dr, Boca Raton, FL 33496",
    price: "$898,000",
    beds: 4, baths: 2.5, sqft: 2744, neighborhood: "Boca Raton",
    url: "https://www.redfin.com/FL/Boca-Raton/9288-Lake-Serena-Dr-33496/home/42241245",
    image_urls: "https://ssl.cdn-redfin.com/photo/106/bigphoto/713/RX-11157713_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/713/genMid.RX-11157713_10_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/713/genMid.RX-11157713_30_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/713/genMid.RX-11157713_16_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/713/genMid.RX-11157713_24_0.jpg"
  },
  {
    address: "9082 Boca Gardens Pkwy Unit C, Boca Raton, FL 33496",
    price: "$445,000",
    beds: 3, baths: 2.1, sqft: 1845, neighborhood: "Boca Raton",
    url: "https://www.redfin.com/FL/Boca-Raton/9082-Boca-Gardens-Pkwy-33496/unit-C/home/42238037",
    image_urls: "https://ssl.cdn-redfin.com/photo/106/bigphoto/638/RX-11157638_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/638/genMid.RX-11157638_6_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/638/genMid.RX-11157638_18_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/638/genMid.RX-11157638_9_0.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/638/genMid.RX-11157638_14_0.jpg"
  },
  {
    address: "550 S Ocean Blvd #2001, Boca Raton, FL 33432",
    price: "$2,075,000",
    beds: 2, baths: 2, sqft: 1479, neighborhood: "Boca Raton",
    url: "https://www.redfin.com/FL/Boca-Raton/550-S-Ocean-Blvd-33432/unit-2001/home/42322919",
    image_urls: "https://ssl.cdn-redfin.com/photo/106/bigphoto/680/RX-11157680_1.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/680/genMid.RX-11157680_8_1.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/680/genMid.RX-11157680_24_1.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/680/genMid.RX-11157680_13_1.jpg;https://ssl.cdn-redfin.com/photo/106/mbphotov3/680/genMid.RX-11157680_19_1.jpg"
  },
  {
    address: "11748 140th St, Jamaica, NY 11436",
    price: "$769,000",
    beds: 4, baths: 3, sqft: 1112, neighborhood: "New York",
    url: "https://www.redfin.com/NY/Jamaica/11748-140th-St-11436/home/20718345",
    image_urls: "https://ssl.cdn-redfin.com/system_files/media/1187671_JPG/item_1.jpg;https://ssl.cdn-redfin.com/system_files/media/1187671_JPG/genLdpUgcMediaBrowserUrlComp/item_4.jpg;https://ssl.cdn-redfin.com/system_files/media/1187671_JPG/genLdpUgcMediaBrowserUrlComp/item_7.jpg;https://ssl.cdn-redfin.com/system_files/media/1187671_JPG/genLdpUgcMediaBrowserUrlComp/item_11.jpg;https://ssl.cdn-redfin.com/system_files/media/1187671_JPG/genLdpUgcMediaBrowserUrlComp/item_14.jpg"
  },
  {
    address: "19125 115th Rd, Saint Albans, NY 11412",
    price: "$699,000",
    beds: 3, baths: 1.5, sqft: 1620, neighborhood: "New York",
    url: "https://www.redfin.com/NY/Saint-Albans/19125-115th-Rd-11412/home/20742062",
    image_urls: "https://ssl.cdn-redfin.com/system_files/media/1187010_JPG/item_2.jpg;https://ssl.cdn-redfin.com/system_files/media/1187010_JPG/genLdpUgcMediaBrowserUrlComp/item_6.jpg;https://ssl.cdn-redfin.com/system_files/media/1187010_JPG/genLdpUgcMediaBrowserUrlComp/item_12.jpg;https://ssl.cdn-redfin.com/system_files/media/1187010_JPG/genLdpUgcMediaBrowserUrlComp/item_16.jpg;https://ssl.cdn-redfin.com/system_files/media/1187010_JPG/genLdpUgcMediaBrowserUrlComp/item_24.jpg"
  },
  {
    address: "555 W End Ave — The Solarium, New York, NY 10024",
    price: "$18,000,000",
    beds: 3, baths: 3.5, sqft: 3420, neighborhood: "New York",
    url: "https://www.redfin.com/NY/New-York/555-W-End-Ave-10024/unit-The-Solarium/home/183800072",
    image_urls: "https://ssl.cdn-redfin.com/photo/211/bigphoto/186/RLS10975186_1F.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/186/genMid.RLS10975186_1_1H.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/186/genMid.RLS10975186_3_1H.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/186/genMid.RLS10975186_2_1I.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/186/genMid.RLS10975186_4_1I.jpg"
  },
  {
    address: "555 W End Ave — The Library, New York, NY 10024",
    price: "$9,900,000",
    beds: 5, baths: 5.5, sqft: 3463, neighborhood: "New York",
    url: "https://www.redfin.com/NY/New-York/555-W-End-Ave-10024/unit-The-Library/home/167452795",
    image_urls: "https://ssl.cdn-redfin.com/photo/211/bigphoto/187/RLS10975187_1F.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/187/genMid.RLS10975187_2_1I.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/187/genMid.RLS10975187_8_1H.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/187/genMid.RLS10975187_4_1H.jpg;https://ssl.cdn-redfin.com/photo/211/mbphotov3/187/genMid.RLS10975187_6_1H.jpg"
  },
  {
    address: "3901 Nostrand Ave Apt 4B, Brooklyn, NY 11235",
    price: "$449,000",
    beds: 2, baths: 1, sqft: 1100, neighborhood: "New York",
    url: "https://www.redfin.com/NY/Brooklyn/3901-Nostrand-Ave-11235/unit-4B/home/200193410",
    image_urls: "https://ssl.cdn-redfin.com/photo/269/bigphoto/361/953361_0.jpg;https://ssl.cdn-redfin.com/photo/269/mbphotov3/361/genMid.953361_4_0.jpg;https://ssl.cdn-redfin.com/photo/269/mbphotov3/361/genMid.953361_12_0.jpg;https://ssl.cdn-redfin.com/photo/269/mbphotov3/361/genMid.953361_6_0.jpg;https://ssl.cdn-redfin.com/photo/269/mbphotov3/361/genMid.953361_10_0.jpg"
  },
]

function parsePrice(price: string): number {
  return parseInt(price.replace(/[$,]/g, ""))
}

function getCity(neighborhood: string): string {
  if (neighborhood === "Miami" || neighborhood === "Brickell") return "Miami"
  if (neighborhood === "Los Angeles") return "Los Angeles"
  if (neighborhood === "Boca Raton") return "Boca Raton"
  if (neighborhood === "New York") return "New York"
  return neighborhood
}

export const properties: Property[] = raw.map((p) => ({
  address: p.address,
  price: p.price,
  priceRaw: parsePrice(p.price),
  beds: p.beds,
  baths: p.baths,
  sqft: p.sqft,
  neighborhood: p.neighborhood,
  city: getCity(p.neighborhood),
  url: p.url,
  images: p.image_urls.split(";"),
}))

export const cities = ["All", "Miami", "Boca Raton", "Los Angeles", "New York"]
