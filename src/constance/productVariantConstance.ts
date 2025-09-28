// utils/variantSchema.ts

// ---------- Types ----------
export type InputType =
  | "select"
  | "multiselect"
  | "text"
  | "number"
  | "color"
  | "boolean";

export type VariantDef = {
  key: string;
  label: string;
  input: InputType;
  values?: string[];
  unit?: string;
  required?: boolean;
};

// ---------- Helpers ----------
const yesno = ["Yes", "No"] as const;

const assign = (
  map: Record<string, VariantDef[]>,
  names: string[],
  defs: VariantDef[]
) => {
  names.forEach((n) => (map[n] = defs));
};

const sel = (key: string, label: string, values: string[], unit?: string) => ({
  key,
  label,
  input: "select" as const,
  values,
  ...(unit ? { unit } : {}),
});

const num = (key: string, label: string, unit?: string) => ({
  key,
  label,
  input: "number" as const,
  ...(unit ? { unit } : {}),
});

const txt = (key: string, label: string) => ({
  key,
  label,
  input: "text" as const,
});

const col = (key: string, label: string) => ({
  key,
  label,
  input: "color" as const,
});

// ---------- Shared option banks ----------
const RAM = ["2 GB", "3 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB"];
const STORAGE = [
  "32 GB",
  "64 GB",
  "128 GB",
  "256 GB",
  "512 GB",
  "1 TB",
  "2 TB",
];
const BAT_MOBILE = ["3000 mAh", "4000 mAh", "5000 mAh", "6000 mAh"];
const BAT_FEATURE = ["800 mAh", "1000 mAh", "1200 mAh", "1500 mAh"];
const MONITOR_SIZES = ['22"', '24"', '25"', '27"', '29"', '32"', '34"'];
const RES_ALL = ["1080p", "1440p", "4K", "5K", "UWQHD"];
const PANEL = ["IPS", "VA", "TN", "OLED", "Mini-LED", "QLED"];
const REFRESH = ["60 Hz", "75 Hz", "120 Hz", "144 Hz", "165 Hz", "240 Hz"];
const WIFI_STD = ["Wi-Fi 4", "Wi-Fi 5", "Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7"];
const BANDS = ["Single Band", "Dual Band", "Tri Band"];
const USB_DATA = ["USB 2.0", "USB 3.0", "USB 3.2 Gen1", "USB 3.2 Gen2", "USB4"];
const POWER_W = [
  "10 W",
  "18 W",
  "20 W",
  "30 W",
  "45 W",
  "60 W",
  "65 W",
  "87 W",
  "100 W",
  "120 W",
  "140 W",
];
const TV_SIZES = ['32"', '40"', '43"', '50"', '55"', '65"', '75"'];


export const buildVariantSchema = (): Record<string, VariantDef[]> => {
  const SCHEMA: Record<string, VariantDef[]> = {};
  SCHEMA["Smartphones & Tablets"] = [
    col("color", "Color"),
    sel("ram", "RAM", RAM),
    sel("storage", "Storage", STORAGE.slice(0, 6)),
    sel("battery", "Battery", BAT_MOBILE),
  ];
  SCHEMA["Feature Phones"] = [
    col("color", "Color"),
    sel("dualSim", "Dual SIM", [...yesno]),
    sel("battery", "Battery", BAT_FEATURE),
    sel("torch", "Torch Light", [...yesno]),
  ];
  SCHEMA["Monitors & Displays"] = [
    sel("size", "Size", MONITOR_SIZES),
    sel("resolution", "Resolution", RES_ALL),
    sel("panel", "Panel Type", PANEL),
    sel("refresh", "Refresh Rate", REFRESH),
  ];
  SCHEMA["Cameras & Photography"] = [
    num("mp", "Megapixel", "MP"),
    sel("video", "Video", ["1080p", "4K", "6K", "8K"]),
    sel("lensType", "Lens Mount", ["Fixed", "Interchangeable"]),
    sel("stabil", "Stabilization", ["Optical", "Electronic", "None"]),
  ];
  SCHEMA["DSLRs & Mirrorless Cameras"] = [
    sel("mount", "Lens Mount", [
      "Canon RF",
      "Canon EF",
      "Nikon Z",
      "Nikon F",
      "Sony E",
      "Fuji X",
      "MFT",
      "L-Mount",
    ]),
    sel("sensor", "Sensor Size", [
      "Full-Frame",
      "APS-C",
      "Micro 4/3",
      "Medium Format",
    ]),
    sel("video", "Video", ["4K30", "4K60", "6K", "8K"]),
    sel("ibis", "IBIS", [...yesno]),
  ];
  SCHEMA["Drones & Action Cameras"] = [
    sel("camera", "Camera", ["1080p", "2.7K", "4K", "5.3K"]),
    sel("flightTime", "Flight Time", ["10 min", "20 min", "30 min", "45 min"]),
    sel("range", "Control Range", ["100 m", "500 m", "1 km", "5 km"]),
    sel("gimbal", "Gimbal Stabilization", [...yesno]),
  ];
  SCHEMA["Wearables & Smartwatches"] = [
    sel("dial", "Dial Size", ["40mm", "41mm", "44mm", "45mm", "49mm"]),
    sel("strap", "Strap Material", ["Silicone", "Leather", "Metal", "Fabric"]),
    sel("batteryLife", "Battery Life", [
      "1 day",
      "3 days",
      "5 days",
      "7+ days",
    ]),
    sel("waterRes", "Water Resistance", ["IP67", "IP68", "5 ATM", "10 ATM"]),
  ];
  SCHEMA["Audio Devices"] = [
    sel("type", "Type", ["In-Ear", "On-Ear", "Over-Ear", "Speaker"]),
    sel("connectivity", "Connectivity", [
      "Wired",
      "Bluetooth 5.0",
      "Bluetooth 5.2",
    ]),
    sel("mic", "Microphone", [...yesno]),
    sel("driver", "Driver Size", ["8 mm", "10 mm", "40 mm", "50 mm"]),
  ];
  SCHEMA["Home Audio Systems"] = [
    sel("channels", "Channels", ["2.0", "2.1", "3.1", "5.1", "7.1"]),
    sel("power", "Power", ["50 W", "100 W", "200 W", "400 W"]),
    sel("connectivity", "Connectivity", [
      "Bluetooth",
      "Wi-Fi",
      "HDMI ARC",
      "Optical",
    ]),
    sel("subwoofer", "Subwoofer", [...yesno]),
  ];
  SCHEMA["Projectors & Accessories"] = [
    sel("brightness", "Brightness", [
      "1500 lm",
      "2500 lm",
      "3500 lm",
      "5000 lm",
    ]),
    sel("resolution", "Resolution", ["720p", "1080p", "4K"]),
    sel("throw", "Throw", ["Short Throw", "Standard", "Ultra Short Throw"]),
    sel("lamp", "Light Source", ["LED", "Laser", "UHP"]),
  ];
  SCHEMA["VR Headsets & Gaming Gear"] = [
    sel("platform", "Platform", ["PC", "PlayStation", "Standalone"]),
    sel("resEye", "Resolution/Eye", ["1440×1600", "1832×1920", "2160×2160"]),
    sel("tracking", "Tracking", ["Inside-out", "External"]),
    sel("refresh", "Refresh Rate", ["72 Hz", "90 Hz", "120 Hz"]),
  ];
  SCHEMA["E-Readers & Tablets"] = [
    sel("display", "Display Type", ["E-Ink", "LCD"]),
    sel("size", "Screen Size", ['7"', '8"', '10.2"', '11"']),
    sel("storage", "Storage", ["8 GB", "16 GB", "32 GB", "64 GB", "128 GB"]),
    sel("connectivity", "Connectivity", ["Wi-Fi", "Wi-Fi + Cellular"]),
  ];
  SCHEMA["Car Electronics"] = [
    sel("din", "Head Unit Size", ["Single DIN", "Double DIN"]),
    sel("compat", "Smartphone", ["Android Auto", "CarPlay", "Both", "None"]),
    sel("channels", "Audio Channels", ["2.0", "4.0", "5.1"]),
    sel("camSupport", "Rear Camera Support", [...yesno]),
  ];
  SCHEMA["Smart Home Devices"] = [
    sel("protocol", "Protocol", ["Wi-Fi", "Zigbee", "Z-Wave", "Thread", "BLE"]),
    sel("assistant", "Voice Assistant", [
      "Alexa",
      "Google Assistant",
      "Siri",
      "No Voice",
    ]),
    sel("power", "Power Source", ["Battery", "Mains", "USB"]),
    sel("hub", "Hub Required", [...yesno]),
  ];
  SCHEMA["Networking Devices"] = [
    sel("wifi", "Wi-Fi Standard", WIFI_STD),
    sel("speed", "Max Speed", [
      "AC1200",
      "AX1800",
      "AX3000",
      "AX5400",
      "BE7000+",
    ]),
    sel("bands", "Bands", BANDS),
    sel("ports", "LAN Ports", ["2", "4", "8", "10"]),
  ];
  SCHEMA["Calculators & Electronic Gadgets"] = [
    sel("type", "Type", ["Basic", "Scientific", "Financial", "Graphing"]),
    sel("power", "Power", ["Battery", "Solar", "Hybrid"]),
    sel("digits", "Digits", ["8", "10", "12", "14"]),
    sel("programmable", "Programmable", [...yesno]),
  ];
  SCHEMA["Office Electronics"] = [
    sel("device", "Device Type", ["Printer", "Scanner", "Fax", "Copier"]),
    sel("duplex", "Duplex", [...yesno]),
    sel("connectivity", "Connectivity", ["USB", "Wi-Fi", "Ethernet"]),
    sel("ppm", "Speed (PPM)", ["10", "20", "30", "40+"]),
  ];
  SCHEMA["Walkie Talkies & Communication Devices"] = [
    sel("range", "Range", ["2 km", "5 km", "8 km", "10+ km"]),
    sel("channels", "Channels", ["16", "22", "128"]),
    sel("waterproof", "Waterproof", [...yesno]),
    sel("battery", "Battery Type", ["AA", "AAA", "Li-ion"]),
  ];
  SCHEMA["Portable Media Players"] = [
    sel("storage", "Storage", ["16 GB", "32 GB", "64 GB", "128 GB"]),
    sel("screen", "Screen Size", ['1.8"', '2.4"', '3.2"']),
    sel("bluetooth", "Bluetooth", [...yesno]),
    sel("hires", "Hi-Res Support", [...yesno]),
  ];
  SCHEMA["Headphones & Speakers"] = [
    sel("type", "Type", ["In-Ear", "Over-Ear", "Speaker"]),
    sel("connectivity", "Connectivity", [
      "Wired",
      "Bluetooth 5.0",
      "Bluetooth 5.2",
    ]),
    sel("mic", "Microphone", [...yesno]),
    sel("anc", "Noise Cancellation", [...yesno]),
  ];

  // ===== Mobile Accessories (20) =====
  SCHEMA["Phone Cases & Covers"] = [
    sel("material", "Material", [
      "Silicone",
      "TPU",
      "Polycarbonate",
      "Leather",
      "Fabric",
    ]),
    txt("compat", "Compatibility"),
    sel("protection", "Protection Level", ["Basic", "Shockproof", "MagSafe"]),
    col("color", "Color"),
  ];
  SCHEMA["Screen Protectors"] = [
    sel("material", "Material", ["Tempered Glass", "PET Film"]),
    sel("hardness", "Hardness", ["9H", "8H", "7H"]),
    sel("edge", "Edge", ["2.5D", "3D", "Full Glue"]),
    sel("pack", "Pack Qty", ["1", "2", "3", "5"]),
  ];
  SCHEMA["Chargers & Power Adapters"] = [
    sel("power", "Power", POWER_W),
    sel("ports", "Ports", ["1", "2", "3", "4+"]),
    sel("tech", "Fast Charge Tech", ["PD", "QC", "PPS", "Standard"]),
    sel("cable", "Cable Included", [...yesno]),
  ];
  SCHEMA["Power Banks"] = [
    sel("capacity", "Capacity", [
      "5000 mAh",
      "10000 mAh",
      "20000 mAh",
      "30000 mAh",
    ]),
    sel("output", "Max Output", ["10 W", "18 W", "22.5 W", "45 W", "65 W"]),
    sel("ports", "Ports", ["1", "2", "3"]),
    sel("fastCharge", "Fast Charge", [...yesno]),
  ];
  SCHEMA["Earphones & Headphones"] = [
    sel("type", "Type", ["TWS", "Neckband", "Wired", "Over-Ear"]),
    sel("connectivity", "Connectivity", [
      "Wired",
      "Bluetooth 5.2",
      "Bluetooth 5.3",
    ]),
    sel("mic", "Microphone", [...yesno]),
    sel("anc", "Noise Cancellation", [...yesno]),
  ];
  SCHEMA["Bluetooth Speakers"] = [
    sel("power", "Power", ["5 W", "10 W", "20 W", "40 W"]),
    sel("waterproof", "Waterproof", ["IPX4", "IPX5", "IPX6", "IPX7"]),
    sel("playtime", "Playback Time", ["6 h", "10 h", "20 h"]),
    sel("connectivity", "Connectivity", ["Bluetooth", "AUX", "USB"]),
  ];
  SCHEMA["Car Mounts & Holders"] = [
    sel("mount", "Mount Type", [
      "Magnetic",
      "Clamp",
      "Vent",
      "CD Slot",
      "Suction",
    ]),
    sel("rotation", "360° Rotation", [...yesno]),
    sel("wireless", "Wireless Charging", [...yesno]),
    sel("width", "Max Width", ["70 mm", "85 mm", "100 mm"]),
  ];
  SCHEMA["USB Cables & Connectors"] = [
    sel("type", "Type", [
      "USB-A → USB-C",
      "USB-C → USB-C",
      "USB-A → Micro-B",
      "Lightning → USB-C",
    ]),
    sel("length", "Length", ["0.5 m", "1 m", "1.5 m", "2 m", "3 m"]),
    sel("data", "Data Rate", USB_DATA),
    sel("braided", "Braided", [...yesno]),
  ];
  SCHEMA["Selfie Sticks & Tripods"] = [
    sel("length", "Max Length", ["60 cm", "80 cm", "100 cm", "150 cm"]),
    sel("remote", "BT Remote", [...yesno]),
    sel("tripod", "Tripod Mode", [...yesno]),
    sel("mount", "Mount", ["Phone Clamp", "MagSafe", '1/4" Screw']),
  ];
  SCHEMA["Smartwatch Bands"] = [
    sel("material", "Material", ["Silicone", "Leather", "Metal", "Nylon"]),
    sel("size", "Size", ["38/40/41mm", "42/44/45mm", "49mm"]),
    sel("closure", "Closure", ["Buckle", "Magnetic", "Velcro"]),
    col("color", "Color"),
  ];
  SCHEMA["Wireless Charging Pads"] = [
    sel("output", "Output", ["5 W", "7.5 W", "10 W", "15 W", "25 W"]),
    sel("slots", "Device Slots", ["1", "2", "3"]),
    sel("magsafe", "MagSafe", [...yesno]),
    sel("input", "Input", ["USB-C", "Micro-USB", "Barrel"]),
  ];
  SCHEMA["Phone Camera Lenses"] = [
    sel("lens", "Lens Type", [
      "Wide",
      "Macro",
      "Tele",
      "Fisheye",
      "Anamorphic",
    ]),
    sel("clip", "Clip Type", ["Clamp", "Magnetic"]),
    sel("mag", "Magnification", ["0.6x", "1.33x", "2x", "15x"]),
    sel("glass", "Glass", ["Multi-coated", "Standard"]),
  ];
  SCHEMA["Phone Stands & Holders"] = [
    sel("type", "Type", ["Desktop", "Gooseneck", "Foldable"]),
    sel("adjust", "Adjustable", [...yesno]),
    sel("height", "Height Range", ["10-20 cm", "20-30 cm", "30-50 cm"]),
    sel("foldable", "Foldable", [...yesno]),
  ];
  SCHEMA["Gaming Controllers for Mobiles"] = [
    sel("layout", "Layout", ["Xbox", "PlayStation", "Nintendo"]),
    sel("connection", "Connection", ["Wired", "Bluetooth", "USB-C Direct"]),
    sel("adjust", "Adjustable Width", [...yesno]),
    sel("passthrough", "Pass-through Charge", [...yesno]),
  ];
  SCHEMA["Stylus Pens"] = [
    sel("tip", "Tip Type", ["Active", "Capacitive"]),
    sel("palm", "Palm Rejection", [...yesno]),
    sel("pressure", "Pressure Levels", ["1024", "2048", "4096"]),
    sel("recharge", "Rechargeable", [...yesno]),
  ];
  SCHEMA["Mobile Cleaning Kits"] = [
    sel("kit", "Kit Type", ["Spray + Cloth", "Gel + Cloth", "Wipes"]),
    sel("volume", "Solution Volume", ["50 ml", "100 ml", "200 ml"]),
    sel("antiStatic", "Anti-Static", [...yesno]),
    sel("brush", "Brush Included", [...yesno]),
  ];
  SCHEMA["SIM Card Adapters & Tools"] = [
    sel("pieces", "Pieces", ["3-in-1", "4-in-1", "6-in-1"]),
    sel("material", "Material", ["Plastic", "Metal"]),
    sel("pin", "Ejector Pin", [...yesno]),
    sel("case", "Storage Case", [...yesno]),
  ];
  SCHEMA["Portable Phone Fans & Cooling Accessories"] = [
    sel("type", "Type", ["Snap-on", "Clip", "Handheld"]),
    sel("power", "Power Source", ["USB", "USB-C", "Battery"]),
    sel("speed", "Speed Levels", ["1", "2", "3", "4"]),
    sel("noise", "Noise Level", ["<30 dB", "30-40 dB", "40-50 dB"]),
  ];
  SCHEMA["Phone Wallets & Pouches"] = [
    sel("slots", "Card Slots", ["2", "3", "5"]),
    sel("material", "Material", ["Leather", "TPU", "Fabric"]),
    sel("magsafe", "MagSafe", [...yesno]),
    sel("closure", "Closure", ["Magnetic", "Snap", "Zip"]),
  ];
  SCHEMA["VR Headsets for Mobile"] = [
    sel("fov", "Field of View", ["90°", "100°", "110°"]),
    sel("lensAdj", "Lens Adjustment", [...yesno]),
    sel("controller", "Controller Included", [...yesno]),
    sel("phoneSize", "Phone Size", ['4.7-6.1"', '6.1-6.7"', '6.7-7.2"']),
  ];

  // ===== Computers & Laptops (20) =====
  SCHEMA["Gaming Laptops"] = [
    txt("cpu", "CPU"),
    txt("gpu", "GPU"),
    sel("ram", "RAM", RAM.slice(2, 7)),
    sel("storage", "Storage", STORAGE.slice(2, 6)),
  ];
  SCHEMA["Business Laptops"] = [
    txt("cpu", "CPU"),
    sel("ram", "RAM", RAM.slice(2, 7)),
    sel("storage", "Storage", STORAGE.slice(1, 6)),
    txt("weight", "Weight"),
  ];
  SCHEMA["Laptops"] = [
    sel("display", "Display Size", ['13.3"', '14"', '15.6"', '16"', '17.3"']),
    txt("cpu", "CPU"),
    sel("ram", "RAM", RAM.slice(2, 7)),
    sel("storage", "Storage", STORAGE.slice(1, 6)),
  ];
  SCHEMA["Desktop PCs"] = [
    txt("cpu", "CPU"),
    txt("gpu", "GPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB", "64 GB"]),
    sel("storage", "Storage", ["1 TB", "2 TB", "4 TB"]),
  ];
  SCHEMA["Desktops"] = [
    sel("form", "Form Factor", ["SFF", "Mini Tower", "ATX"]),
    txt("cpu", "CPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
  ];
  SCHEMA["Monitors"] = SCHEMA["Monitors & Displays"];
  SCHEMA["Keyboards & Mice"] = [
    sel("keyboard", "Keyboard Type", ["Membrane", "Mechanical"]),
    sel("switch", "Switch Type", ["Red", "Brown", "Blue"]),
    sel("dpi", "Max DPI", ["3200", "6400", "16000", "26000"]),
    sel("wireless", "Wireless", [...yesno]),
  ];
  SCHEMA["RAM & Graphics Cards"] = [
    sel("component", "Component", ["RAM", "GPU"]),
    sel("capacity", "Capacity/VRAM", ["8 GB", "16 GB", "32 GB", "64 GB"]),
    txt("speed", "Speed/Chipset"),
    sel("interface", "Interface", ["DDR4", "DDR5", "PCIe 4.0", "PCIe 5.0"]),
  ];
  SCHEMA["External Hard Drives & SSD"] = [
    sel("type", "Type", ["HDD", "SSD"]),
    sel("capacity", "Capacity", ["500 GB", "1 TB", "2 TB", "4 TB"]),
    sel("interface", "Interface", ["USB 3.0", "USB-C", "Thunderbolt 3/4"]),
    sel("form", "Form Factor", ["Portable", '2.5"', '3.5"']),
  ];
  SCHEMA["UPS & Power Solutions"] = [
    sel("capacity", "Capacity (VA)", ["650", "1000", "1500", "2200"]),
    sel("outlets", "Outlets", ["2", "4", "6", "8"]),
    sel("avr", "AVR", [...yesno]),
    sel("battery", "Battery Type", ["Lead-acid", "Lithium"]),
  ];
  SCHEMA["Docking Stations"] = [
    sel("interface", "Interface", ["USB-C", "Thunderbolt 3", "Thunderbolt 4"]),
    sel("video", "Video Outputs", ["HDMI", "DP", "HDMI+DP"]),
    sel("pd", "Power Delivery", ["60 W", "85 W", "100 W"]),
    sel("ports", "Total Ports", ["6", "8", "10", "12+"]),
  ];
  SCHEMA["Cooling Pads"] = [
    sel("fans", "Fan Count", ["1", "2", "4", "6"]),
    sel("size", "Max Laptop Size", ['15.6"', '17"']),
    sel("angle", "Adjustable Angle", [...yesno]),
    sel("noise", "Noise Level", ["<20 dB", "20-30 dB", "30-40 dB"]),
  ];
  SCHEMA["Motherboards"] = [
    sel("socket", "CPU Socket", ["LGA1700", "AM4", "AM5"]),
    txt("chipset", "Chipset"),
    sel("form", "Form Factor", ["ATX", "mATX", "ITX"]),
    sel("memory", "Memory Slots", ["2", "4", "8"]),
  ];
  SCHEMA["Processors"] = [
    sel("brand", "Brand", ["Intel", "AMD", "Apple"]),
    txt("series", "Series"),
    sel("cores", "Cores", ["4", "6", "8", "12", "16", "24"]),
    txt("base", "Base Clock (GHz)"),
  ];
  SCHEMA["GPU & Graphics Cards"] = [
    sel("chipset", "Chipset", ["NVIDIA", "AMD", "Intel"]),
    sel("vram", "VRAM", ["6 GB", "8 GB", "12 GB", "16 GB", "24 GB"]),
    sel("length", "Card Length", ["≤250 mm", "251-300 mm", "301-350 mm"]),
    sel("power", "Power Connectors", ["8-pin", "8+8-pin", "12VHPWR"]),
  ];
  SCHEMA["Laptop Bags & Sleeves"] = [
    sel("size", "Size", ['13"', '14"', '15.6"', '16"', '17"']),
    sel("material", "Material", ["Nylon", "Polyester", "Leather", "Neoprene"]),
    sel("type", "Type", ["Backpack", "Sleeve", "Messenger"]),
    sel("water", "Water Resistant", [...yesno]),
  ];
  SCHEMA["Laptop Stands"] = [
    sel("material", "Material", ["Aluminum", "Plastic", "Wood"]),
    sel("adjust", "Adjustable", [...yesno]),
    sel("height", "Height Range", ["0-15 cm", "15-25 cm", "25-35 cm"]),
    sel("foldable", "Foldable", [...yesno]),
  ];
  SCHEMA["Networking Cards & Adapters"] = [
    sel("type", "Type", ["Wi-Fi", "Ethernet", "Bluetooth"]),
    sel("interface", "Interface", ["PCIe", "USB"]),
    sel("speed", "Speed", ["300 Mbps", "1 Gbps", "2.5 Gbps", "10 Gbps"]),
    sel("antennas", "Antennas", ["1", "2", "3", "4"]),
  ];
  SCHEMA["Printers"] = [
    sel("type", "Type", ["Inkjet", "Laser", "Tank", "Dot Matrix"]),
    sel("color", "Color Print", [...yesno]),
    sel("duplex", "Duplex", [...yesno]),
    sel("connectivity", "Connectivity", ["USB", "Wi-Fi", "Ethernet"]),
  ];
  SCHEMA["Scanners"] = [
    sel("type", "Type", ["Flatbed", "ADF", "Sheetfed", "Portable"]),
    sel("resolution", "Optical Resolution", [
      "600 dpi",
      "1200 dpi",
      "2400 dpi",
    ]),
    sel("depth", "Color Depth", ["24-bit", "48-bit"]),
    sel("connectivity", "Connectivity", ["USB", "Wi-Fi"]),
  ];

  // ===== Televisions & Home Entertainment (20) =====
  SCHEMA["LED TVs"] = [
    sel("size", "Size", TV_SIZES),
    sel("resolution", "Resolution", ["1080p", "4K"]),
    sel("panel", "Panel", ["LED", "QLED"]),
    sel("refresh", "Refresh Rate", ["60 Hz", "120 Hz"]),
  ];
  SCHEMA["Smart TVs"] = [
    sel("size", "Size", TV_SIZES),
    sel("os", "OS", ["Android TV", "Google TV", "Tizen", "webOS", "Roku TV"]),
    sel("resolution", "Resolution", ["1080p", "4K"]),
    sel("voice", "Voice Control", [...yesno]),
  ];
  SCHEMA["4K & OLED TVs"] = [
    sel("size", "Size", TV_SIZES),
    sel("panel", "Panel", ["OLED", "QLED", "Mini-LED"]),
    sel("hdr", "HDR", ["HDR10", "HDR10+", "Dolby Vision"]),
    sel("refresh", "Refresh Rate", ["60 Hz", "120 Hz", "144 Hz"]),
  ];
  SCHEMA["Home Theater Systems"] = [
    sel("channels", "Channels", ["2.1", "3.1", "5.1", "7.1"]),
    sel("power", "Power", ["100 W", "200 W", "400 W", "800 W"]),
    sel("connectivity", "Connectivity", [
      "HDMI ARC",
      "eARC",
      "Optical",
      "Bluetooth",
    ]),
    sel("subwoofer", "Subwoofer", [...yesno]),
  ];
  SCHEMA["Soundbars"] = [
    sel("channels", "Channels", ["2.0", "2.1", "3.1", "5.1"]),
    sel("power", "Power", ["80 W", "120 W", "300 W"]),
    sel("subwoofer", "Wireless Subwoofer", [...yesno]),
    sel("atmos", "Dolby Atmos", [...yesno]),
  ];
  SCHEMA["Streaming Devices"] = [
    sel("maxRes", "Max Resolution", ["1080p", "4K", "8K"]),
    sel("storage", "Storage", ["8 GB", "16 GB", "32 GB"]),
    sel("voice", "Voice Remote", [...yesno]),
    sel("ethernet", "Ethernet", [...yesno]),
  ];
  SCHEMA["TV Wall Mounts"] = [
    sel("type", "Type", ["Fixed", "Tilt", "Full-Motion"]),
    sel("vesa", "VESA", ["75x75", "100x100", "200x200", "400x400"]),
    sel("size", "TV Size", ['32"-43"', '43"-55"', '55"-65"', '65"-75"']),
    sel("capacity", "Weight Capacity", ["25 kg", "50 kg", "75 kg"]),
  ];
  SCHEMA["Set-Top Boxes"] = [
    sel("tuner", "Tuner", ["DVB-T2", "DVB-S2", "DVB-C", "IPTV"]),
    sel("dvr", "DVR", [...yesno]),
    sel("hdmi", "HDMI Ports", ["1", "2"]),
    sel("apps", "Apps Support", ["Basic", "Advanced"]),
  ];
  SCHEMA["Remote Controls"] = [
    sel("type", "Type", ["IR", "Bluetooth", "Universal"]),
    sel("programmable", "Programmable", [...yesno]),
    sel("backlit", "Backlit", [...yesno]),
    sel("devices", "Devices Support", ["2", "4", "8", "12"]),
  ];
  SCHEMA["Mini Projectors"] = [
    sel("brightness", "Brightness", ["200 lm", "500 lm", "800 lm", "1000 lm"]),
    sel("resolution", "Resolution", ["480p", "720p", "1080p"]),
    sel("battery", "Built-in Battery", [...yesno]),
    sel("throw", "Throw", ["Short Throw", "Standard"]),
  ];
  SCHEMA["Blu-ray Players"] = [
    sel("region", "Region", ["A", "B", "C", "Free"]),
    sel("uhd", "4K UHD", [...yesno]),
    sel("hdr", "HDR", ["HDR10", "Dolby Vision", "None"]),
    sel("wifi", "Wi-Fi", [...yesno]),
  ];
  SCHEMA["AV Receivers"] = [
    sel("channels", "Channels", ["5.1", "7.2", "9.2", "11.2"]),
    sel("power", "Power/Ch", ["80 W", "100 W", "150 W"]),
    sel("inputs", "HDMI Inputs", ["4", "6", "8", "10"]),
    sel("atmos", "Dolby Atmos", [...yesno]),
  ];
  SCHEMA["Projector Screens"] = [
    sel("size", "Size", ['80"', '100"', '120"', '150"']),
    sel("gain", "Gain", ["0.8", "1.0", "1.2"]),
    sel("ratio", "Aspect Ratio", ["4:3", "16:9", "21:9"]),
    sel("type", "Type", ["Fixed", "Pull-down", "Floor Rising"]),
  ];
  SCHEMA["Media Players"] = [
    sel("maxRes", "Max Resolution", ["1080p", "4K"]),
    sel("storage", "Storage", ["8 GB", "16 GB", "32 GB"]),
    sel("codec", "Codec Support", ["Basic", "Wide"]),
    sel("ethernet", "Ethernet", [...yesno]),
  ];
  SCHEMA["Speakers"] = [
    sel("type", "Type", ["Bookshelf", "Soundbar", "Floorstanding", "Portable"]),
    sel("power", "Power", ["20 W", "50 W", "100 W", "200 W"]),
    sel("connectivity", "Connectivity", [
      "Bluetooth",
      "RCA",
      "Optical",
      "HDMI ARC",
    ]),
    sel("impedance", "Impedance", ["4 Ω", "6 Ω", "8 Ω"]),
  ];
  SCHEMA["Gaming Consoles for TV"] = [
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
    sel("edition", "Edition", ["Standard", "Digital", "Special"]),
    sel("drive", "Optical Drive", [...yesno]),
    sel("target", "Target Resolution", ["1080p", "4K", "8K"]),
  ];
  SCHEMA["HDMI Cables"] = [
    sel("version", "Version", ["1.4", "2.0", "2.1"]),
    sel("length", "Length", ["1 m", "2 m", "3 m", "5 m", "10 m"]),
    sel("bandwidth", "Bandwidth", ["10.2 Gbps", "18 Gbps", "48 Gbps"]),
    sel("braided", "Braided", [...yesno]),
  ];
  SCHEMA["Power Cords"] = [
    sel("length", "Length", ["1 m", "1.5 m", "3 m", "5 m"]),
    sel("connector", "Connector", [
      "Type-G",
      "C13",
      "C5",
      "C7",
      "EU Schuko",
      "US NEMA 5-15",
    ]),
    sel("gauge", "Gauge (AWG)", ["14", "16", "18"]),
    sel("switch", "Inline Switch", [...yesno]),
  ];
  SCHEMA["Universal Remotes"] = [
    sel("devices", "Devices Support", ["2", "4", "8", "12"]),
    sel("programmable", "Programmable", [...yesno]),
    sel("backlit", "Backlit", [...yesno]),
    sel("voice", "Voice Control", [...yesno]),
  ];
  SCHEMA["TV Accessories"] = [
    sel("type", "Accessory Type", [
      "IR Blaster",
      "LED Strip",
      "Remote Cover",
      "Cable Clips",
    ]),
    txt("compat", "Compatibility"),
    col("color", "Color"),
    sel("qty", "Pack Qty", ["1", "2", "4", "6"]),
  ];

  // ===== Kitchen Appliances (20) =====
  SCHEMA["Microwave Ovens"] = [
    sel("capacity", "Capacity", ["20 L", "23 L", "28 L", "32 L"]),
    sel("type", "Type", ["Solo", "Grill", "Convection"]),
    sel("power", "Power", ["700 W", "900 W", "1200 W"]),
    sel("control", "Control", ["Knob", "Touch"]),
  ];
  SCHEMA["Electric Kettles"] = [
    sel("capacity", "Capacity", ["1.0 L", "1.5 L", "1.7 L", "2.0 L"]),
    sel("material", "Material", ["Plastic", "Steel", "Glass"]),
    sel("autoOff", "Auto Shut-Off", [...yesno]),
    sel("power", "Power", ["1200 W", "1500 W", "2000 W"]),
  ];
  SCHEMA["Toasters & Sandwich Makers"] = [
    sel("slots", "Slots/Plates", ["2-Slice", "4-Slice", "Sandwich", "Grill"]),
    sel("power", "Power", ["700 W", "800 W", "1200 W"]),
    sel("functions", "Functions", ["Toast", "Grill", "Defrost"]),
    sel("nonStick", "Non-stick", [...yesno]),
  ];
  SCHEMA["Coffee Makers"] = [
    sel("type", "Type", ["Drip", "Espresso", "Capsule", "French Press"]),
    sel("capacity", "Capacity", ["2 cups", "5 cups", "10 cups"]),
    sel("pressure", "Pressure", ["9 bar", "15 bar", "20 bar"]),
    sel("auto", "Programmable", [...yesno]),
  ];
  SCHEMA["Rice Cookers"] = [
    sel("capacity", "Capacity", ["1 L", "1.8 L", "3 L"]),
    sel("functions", "Functions", ["Cook", "Warm", "Steam"]),
    sel("inner", "Inner Pot", ["Non-stick", "Steel"]),
    sel("power", "Power", ["500 W", "700 W", "900 W"]),
  ];
  SCHEMA["Juicers & Blenders"] = [
    sel("type", "Type", ["Juicer", "Blender", "Mixer Grinder"]),
    sel("jar", "Jar Capacity", ["0.8 L", "1.5 L", "2 L"]),
    sel("power", "Power", ["300 W", "500 W", "750 W", "1000 W"]),
    sel("speed", "Speed Settings", ["2", "3", "5"]),
  ];
  SCHEMA["Induction Cooktops"] = [
    sel("zones", "Zones", ["1", "2", "4"]),
    sel("power", "Power", ["1600 W", "2000 W", "3000 W"]),
    sel("control", "Control", ["Touch", "Knob"]),
    sel("autoOff", "Auto Off", [...yesno]),
  ];
  SCHEMA["Refrigerators"] = [
    sel("type", "Type", [
      "Single Door",
      "Double Door",
      "Side-by-Side",
      "French Door",
    ]),
    sel("capacity", "Capacity", ["200 L", "300 L", "450 L", "600 L"]),
    sel("inverter", "Inverter", [...yesno]),
    sel("rating", "Star Rating", ["2 Star", "3 Star", "4 Star", "5 Star"]),
  ];
  SCHEMA["Dishwashers"] = [
    sel("settings", "Place Settings", ["8", "12", "14"]),
    sel("type", "Type", ["Free-standing", "Built-in", "Table-top"]),
    sel("water", "Water/Cycle", ["8 L", "10 L", "12 L"]),
    sel("noise", "Noise Level", ["44 dB", "48 dB", "52 dB"]),
  ];
  SCHEMA["Food Processors"] = [
    sel("bowl", "Bowl Capacity", ["1.5 L", "2.1 L", "3.1 L"]),
    sel("power", "Power", ["600 W", "750 W", "1000 W"]),
    sel("blades", "Blades", ["3", "5", "7"]),
    sel("speed", "Speeds", ["2", "3", "5"]),
  ];
  SCHEMA["Slow Cookers"] = [
    sel("capacity", "Capacity", ["3 L", "4.5 L", "6 L"]),
    sel("programmable", "Programmable", [...yesno]),
    sel("keepWarm", "Keep Warm", [...yesno]),
    sel("pot", "Pot Material", ["Ceramic", "Metal"]),
  ];
  SCHEMA["Electric Grills"] = [
    sel("plate", "Plate Size", ["Small", "Medium", "Large"]),
    sel("power", "Power", ["1000 W", "1500 W", "2000 W"]),
    sel("temp", "Temperature Control", [...yesno]),
    sel("smokeless", "Smokeless", [...yesno]),
  ];
  SCHEMA["Water Purifiers"] = [
    sel("tech", "Technology", ["RO", "UV", "UF", "RO+UV"]),
    sel("capacity", "Capacity", ["7 L", "10 L", "12 L"]),
    sel("tds", "TDS Controller", [...yesno]),
    sel("install", "Installation", ["Wall", "Counter"]),
  ];
  SCHEMA["Choppers"] = [
    sel("capacity", "Capacity", ["500 ml", "700 ml", "1 L"]),
    sel("power", "Power", ["200 W", "300 W", "500 W"]),
    sel("blade", "Blade Material", ["Steel", "Alloy"]),
    sel("dishwasher", "Dishwasher Safe", [...yesno]),
  ];
  SCHEMA["Bread Makers"] = [
    sel("loaf", "Loaf Size", ["450 g", "680 g", "900 g"]),
    sel("programs", "Programs", ["12", "15", "20"]),
    sel("crust", "Crust Control", [...yesno]),
    sel("delay", "Delay Timer", [...yesno]),
  ];
  SCHEMA["Ice Cream Makers"] = [
    sel("capacity", "Capacity", ["1 L", "1.5 L", "2 L"]),
    sel("compressor", "Compressor", [...yesno]),
    sel("bowl", "Bowl Type", ["Prefreeze", "Self-refrigerating"]),
    sel("timer", "Timer", [...yesno]),
  ];
  SCHEMA["Pressure Cookers"] = [
    sel("capacity", "Capacity", ["3 L", "5 L", "7.5 L"]),
    sel("material", "Material", ["Aluminum", "Steel"]),
    sel("induction", "Induction Base", [...yesno]),
    sel("safety", "Safety Valve", [...yesno]),
  ];
  SCHEMA["Ovens"] = [
    sel("type", "Type", ["OTG", "Convection", "Microwave Convection"]),
    sel("capacity", "Capacity", ["20 L", "32 L", "45 L"]),
    sel("temp", "Temp Range", ["250°C", "300°C"]),
    sel("rotisserie", "Rotisserie", [...yesno]),
  ];
  SCHEMA["Popcorn Makers"] = [
    sel("type", "Type", ["Hot Air", "Stovetop", "Microwave"]),
    sel("capacity", "Capacity", ["50 g", "100 g", "150 g"]),
    sel("scoop", "Measuring Scoop", [...yesno]),
    sel("parts", "Detachable Parts", [...yesno]),
  ];
  SCHEMA["Food Steamers"] = [
    sel("tiers", "Tiers", ["2", "3"]),
    sel("capacity", "Capacity", ["5 L", "9 L"]),
    sel("timer", "Timer", ["30 min", "60 min"]),
    sel("autoOff", "Auto Shut-Off", [...yesno]),
  ];

  // ===== Power Tools (20) =====
  SCHEMA["Drills & Drivers"] = [
    sel("powerType", "Power Type", ["Corded", "Cordless"]),
    sel("chuck", "Chuck Size", ['3/8"', '1/2"']),
    sel("torque", "Max Torque", ["25 Nm", "50 Nm", "80 Nm", "120 Nm"]),
    sel("speed", "Speed Settings", ["1", "2", "3"]),
  ];
  SCHEMA["Angle Grinders"] = [
    sel("disc", "Disc Size", ['4"', '4.5"', '5"', '7"']),
    sel("input", "Power Input", ["600 W", "900 W", "1200 W"]),
    sel("speed", "No-load Speed", ["7000 rpm", "9000 rpm", "11000 rpm"]),
    sel("guard", "Adjustable Guard", [...yesno]),
  ];
  SCHEMA["Circular Saws"] = [
    sel("blade", "Blade Size", ['5.5"', '6.5"', '7.25"']),
    sel("bevel", "Bevel Capacity", ["45°", "50°", "56°"]),
    sel("depth", "Max Depth", ["45 mm", "55 mm", "65 mm"]),
    sel("brushless", "Brushless Motor", [...yesno]),
  ];
  SCHEMA["Welding Machines"] = [
    sel("type", "Type", ["MIG", "TIG", "ARC", "Multi-process"]),
    sel("amp", "Amp Range", ["90 A", "140 A", "200 A", "250 A"]),
    sel("duty", "Duty Cycle", ["20%", "30%", "40%", "60%"]),
    sel("gasless", "Gasless Compatible", [...yesno]),
  ];
  SCHEMA["Heat Guns"] = [
    sel("temp", "Temp Range", ["50-450°C", "50-600°C"]),
    sel("air", "Airflow", ["200 L/min", "400 L/min"]),
    sel("stages", "Heat Stages", ["2", "3"]),
    sel("display", "LCD Display", [...yesno]),
  ];
  SCHEMA["Sanders & Polishers"] = [
    sel("type", "Type", ["Orbital", "Random Orbital", "Belt", "Polisher"]),
    sel("pad", "Pad/Plate Size", ["125 mm", "150 mm"]),
    sel("speed", "Variable Speed", [...yesno]),
    sel("dust", "Dust Bag", [...yesno]),
  ];
  SCHEMA["Electric Screwdrivers"] = [
    sel("powerType", "Power Type", ["Corded", "Cordless"]),
    sel("torque", "Max Torque", ["3 Nm", "5 Nm", "10 Nm"]),
    sel("speed", "Speed", ["200 rpm", "400 rpm"]),
    sel("bits", "Bit Set Included", [...yesno]),
  ];
  SCHEMA["Cutting Machines"] = [
    sel("type", "Type", ["Metal", "Wood", "Tile", "Multi-material"]),
    sel("blade", "Blade Size", ["110 mm", "125 mm", "355 mm"]),
    sel("power", "Power", ["600 W", "1200 W", "2000 W"]),
    sel("speed", "Speed", ["3000 rpm", "5000 rpm"]),
  ];
  SCHEMA["Air Compressors"] = [
    sel("tank", "Tank Size", ["6 L", "24 L", "50 L", "100 L"]),
    sel("hp", "Horsepower", ["1 HP", "2 HP", "3 HP"]),
    sel("cfm", "CFM @90psi", ["2.4", "5.0", "8.5"]),
    sel("portable", "Portable", [...yesno]),
  ];
  SCHEMA["Power Tool Accessories"] = [
    sel("type", "Type", ["Drill Bit", "Saw Blade", "Sanding", "Grinding"]),
    sel("shank", "Shank Size", ["1/4", "3/8", "1/2"]),
    sel("material", "Material", ["HSS", "Carbide", "Diamond"]),
    sel("pieces", "Pieces", ["5", "10", "25", "50"]),
  ];
  SCHEMA["Hammer Drills"] = [
    sel("powerType", "Power Type", ["Corded", "Cordless"]),
    sel("energy", "Impact Energy", ["1.5 J", "2.5 J", "3.5 J"]),
    sel("chuck", "Chuck", ["SDS-Plus", "SDS-Max", "Keyed"]),
    sel("hammer", "Hammer Mode", [...yesno]),
  ];
  SCHEMA["Rotary Tools"] = [
    sel("speed", "Speed Range", ["5-15k rpm", "10-35k rpm"]),
    sel("acc", "Accessories", ["20", "40", "100+"]),
    sel("collet", "Collet Size", ["2.4 mm", "3.2 mm"]),
    sel("power", "Power", ["130 W", "170 W"]),
  ];
  SCHEMA["Bench Grinders"] = [
    sel("wheel", "Wheel Size", ['5"', '6"', '8"']),
    sel("power", "Power", ["250 W", "370 W", "550 W"]),
    sel("speed", "Speed", ["2850 rpm", "3600 rpm"]),
    sel("rest", "Tool Rest", [...yesno]),
  ];
  SCHEMA["Cordless Tools"] = [
    sel("platform", "Platform Voltage", ["12V", "18V", "20V Max"]),
    sel("brushless", "Brushless", [...yesno]),
    sel("battery", "Battery (Ah)", ["2.0", "4.0", "5.0"]),
    sel("charger", "Charger Included", [...yesno]),
  ];
  SCHEMA["Screwdriver Sets"] = [
    sel("pieces", "Pieces", ["6", "12", "24", "40+"]),
    sel("material", "Material", ["Cr-V", "S2 Steel"]),
    sel("magnetic", "Magnetic Tips", [...yesno]),
    sel("case", "Carrying Case", [...yesno]),
  ];
  SCHEMA["Impact Wrenches"] = [
    sel("drive", "Drive Size", ['1/4"', '3/8"', '1/2"']),
    sel("torque", "Max Torque", ["200 Nm", "400 Nm", "700 Nm"]),
    sel("battery", "Battery (Ah)", ["2.0", "4.0", "5.0"]),
    sel("voltage", "System Voltage", ["12V", "18V", "20V Max"]),
  ];
  SCHEMA["Tool Kits"] = [
    sel("pieces", "Pieces", ["32", "56", "108", "168"]),
    sel("box", "Box Type", ["Plastic", "Metal", "Soft Bag"]),
    sel("electric", "Electric Tools Included", [...yesno]),
    sel("battery", "Battery Included", [...yesno]),
  ];
  SCHEMA["Jigsaws"] = [
    sel("stroke", "Stroke Length", ["18 mm", "23 mm", "26 mm"]),
    sel("speed", "Variable Speed", [...yesno]),
    sel("orbital", "Orbital Action", [...yesno]),
    sel("toolLess", "Tool-less Blade Change", [...yesno]),
  ];
  SCHEMA["Nail Guns"] = [
    sel("type", "Type", ["Brad", "Finish", "Framing"]),
    sel("gauge", "Gauge", ["18", "16", "15"]),
    sel("capacity", "Magazine Capacity", ["100", "120", "150"]),
    sel("pressure", "Operating Pressure", ["60-100 psi", "70-120 psi"]),
  ];
  SCHEMA["Tile Cutters"] = [
    sel("length", "Cutting Length", ["600 mm", "900 mm", "1200 mm"]),
    sel("type", "Type", ["Manual", "Wet"]),
    sel("motor", "Motor Power", ["600 W", "800 W", "1200 W"]),
    sel("blade", "Blade Size", ["110 mm", "125 mm"]),
  ];

  // ===== Hardware & Construction (20) =====
  SCHEMA["Hand Tools"] = [
    sel("type", "Type", ["Set", "Wrench", "Plier", "Hammer"]),
    sel("material", "Material", ["Cr-V", "Carbon Steel", "Alloy Steel"]),
    sel("pieces", "Pieces", ["5", "10", "25", "50"]),
    sel("insulated", "Insulated", [...yesno]),
  ];
  SCHEMA["Fasteners"] = [
    sel("type", "Type", ["Screw", "Bolt", "Nail", "Anchor"]),
    sel("size", "Size", ["M4", "M6", "M8", "M10"]),
    sel("material", "Material", ["Steel", "Stainless", "Brass"]),
    sel("finish", "Finish", ["Zinc", "Black", "Plain"]),
  ];
  SCHEMA["Plumbing Supplies"] = [
    sel("material", "Material", ["Brass", "PVC", "CPVC", "PEX"]),
    sel("conn", "Connection", ["Threaded", "Push-fit", "Compression"]),
    sel("diameter", "Diameter", ['1/2"', '3/4"', '1"']),
    sel("pressure", "Pressure Rating", ["PN10", "PN16"]),
  ];
  SCHEMA["Safety Gear"] = [
    sel("type", "Type", ["Helmet", "Gloves", "Goggles", "Shoes"]),
    sel("cert", "Certification", ["EN", "ANSI", "IS"]),
    sel("size", "Size", ["S", "M", "L", "XL"]),
    sel("material", "Material", ["Polymer", "Leather", "Textile"]),
  ];
  SCHEMA["Measuring Tools"] = [
    sel("type", "Type", ["Tape", "Laser", "Level", "Caliper"]),
    sel("range", "Range", ["5 m", "30 m", "50 m"]),
    sel("accuracy", "Accuracy", ["±1 mm", "±2 mm", "±3 mm"]),
    sel("units", "Units", ["Metric", "Imperial", "Both"]),
  ];
  SCHEMA["Paint & Coatings"] = [
    sel("type", "Type", ["Emulsion", "Enamel", "Primer"]),
    col("color", "Color"),
    sel("finish", "Finish", ["Matt", "Satin", "Gloss"]),
    sel("volume", "Volume", ["1 L", "4 L", "10 L", "20 L"]),
  ];
  SCHEMA["Adhesives & Sealants"] = [
    sel("type", "Type", [
      "Epoxy",
      "Cyanoacrylate",
      "Silicone",
      "PU",
      "Acrylic",
    ]),
    sel("cure", "Cure Time", ["Fast", "Standard", "Slow"]),
    sel("color", "Color", ["Clear", "White", "Black", "Grey"]),
    sel("use", "Interior/Exterior", ["Interior", "Exterior", "Both"]),
  ];
  SCHEMA["Door & Window Hardware"] = [
    sel("material", "Material", ["SS", "Brass", "Zinc Alloy"]),
    sel("finish", "Finish", ["SS", "Matt", "Chrome", "Antique"]),
    sel("lock", "Lock Type", ["Mortise", "Cylinder", "Latch"]),
    sel("size", "Size", ["Small", "Medium", "Large"]),
  ];
  SCHEMA["Construction Materials"] = [
    sel("type", "Type", ["Cement", "Steel", "Brick", "Aggregate"]),
    sel("grade", "Grade", ["OPC43", "OPC53", "Mild", "TMT"]),
    sel("size", "Size", ["Std", "Large"]),
    sel("weight", "Weight/Unit", ["—", "—", "—"]),
  ];
  SCHEMA["Gardening Tools"] = [
    sel("type", "Type", ["Shovel", "Rake", "Pruner", "Shear"]),
    sel("handle", "Handle Material", ["Wood", "Fiberglass", "Steel"]),
    sel("length", "Length", ["Short", "Medium", "Long"]),
    sel("head", "Head Material", ["Steel", "Alloy"]),
  ];
  SCHEMA["Power Saws"] = [
    sel("type", "Type", ["Circular", "Reciprocating", "Miter", "Table"]),
    sel("blade", "Blade Size", ['7.25"', '10"', '12"']),
    sel("power", "Power", ["1200 W", "1500 W", "1800 W"]),
    sel("speed", "Speed", ["3800 rpm", "4500 rpm"]),
  ];
  SCHEMA["Tool Storage"] = [
    sel("type", "Type", ["Box", "Chest", "Cabinet", "Bag"]),
    sel("size", "Size", ["Small", "Medium", "Large"]),
    sel("lock", "Lockable", [...yesno]),
    sel("wheels", "Wheels", [...yesno]),
  ];
  SCHEMA["Ladders & Scaffolding"] = [
    sel("type", "Type", ["Step", "Extension", "Telescopic", "Scaffold"]),
    sel("height", "Height", ["6 ft", "10 ft", "16 ft"]),
    sel("material", "Material", ["Aluminum", "Steel", "Fiberglass"]),
    sel("load", "Load Capacity", ["150 kg", "200 kg"]),
  ];
  SCHEMA["Electrical Hardware"] = [
    sel("voltage", "Voltage", ["110 V", "220 V", "415 V"]),
    sel("current", "Current", ["6 A", "16 A", "32 A"]),
    sel("phase", "Phase", ["1-Phase", "3-Phase"]),
    sel("ip", "Protection (IP)", ["IP20", "IP44", "IP65"]),
  ];
  SCHEMA["Building Materials"] = [
    sel("type", "Type", ["Cement", "Steel", "Gypsum", "Board"]),
    sel("grade", "Grade", ["Std", "Premium"]),
    sel("size", "Size", ["Std", "Large"]),
    sel("weight", "Weight/Unit", ["—", "—", "—"]),
  ];
  SCHEMA["Locks & Keys"] = [
    sel("type", "Lock Type", [
      "Padlock",
      "Deadbolt",
      "Door Lock",
      "Smart Lock",
    ]),
    sel("rating", "Security Rating", ["Std", "High", "Premium"]),
    sel("cylinder", "Cylinder", ["5-pin", "6-pin", "Profile"]),
    sel("keys", "Keys Included", ["2", "3", "5"]),
  ];
  SCHEMA["Concrete Tools"] = [
    sel("type", "Type", ["Trowel", "Float", "Edger", "Groover"]),
    sel("size", "Size", ["Small", "Medium", "Large"]),
    sel("material", "Material", ["Steel", "Magnesium", "Plastic"]),
    sel("handle", "Handle", ["Wood", "Rubber", "Fiberglass"]),
  ];
  SCHEMA["Workshop Tools"] = [
    sel("type", "Type", ["Vice", "Anvil", "Clamp", "Bench Tool"]),
    sel("power", "Power Type", ["Manual", "Electric", "Pneumatic"]),
    sel("size", "Size", ["Small", "Medium", "Large"]),
    sel("material", "Material", ["Steel", "Alloy", "Cast Iron"]),
  ];
  SCHEMA["Hardware Accessories"] = [
    sel("type", "Type", ["Bracket", "Hinge", "Caster", "Knob"]),
    sel("material", "Material", ["Steel", "Aluminum", "Plastic"]),
    sel("finish", "Finish", ["SS", "Chrome", "Matt", "Black"]),
    sel("size", "Size", ["S", "M", "L"]),
  ];
  SCHEMA["Workbenches"] = [
    sel("top", "Top Size", ["120×60 cm", "150×70 cm", "180×75 cm"]),
    sel("load", "Load Capacity", ["200 kg", "400 kg", "600 kg"]),
    sel("material", "Material", ["Wood", "Steel", "Composite"]),
    sel("height", "Height Adjustable", [...yesno]),
  ];

  // ===== Lighting & Electrical (20) =====
  const LIGHT_TEMP = ["2700K", "3000K", "4000K", "6500K"];
  assign(
    SCHEMA,
    ["LED Bulbs"],
    [
      sel("watt", "Wattage", ["5 W", "9 W", "12 W", "15 W"]),
      sel("cct", "Color Temperature", LIGHT_TEMP),
      sel("base", "Base", ["B22", "E27", "E14"]),
      sel("dimmable", "Dimmable", [...yesno]),
    ]
  );
  assign(
    SCHEMA,
    ["Tube Lights"],
    [
      sel("length", "Length", ["2 ft", "4 ft"]),
      sel("watt", "Wattage", ["18 W", "22 W", "28 W"]),
      sel("cct", "Color Temperature", LIGHT_TEMP),
      sel("fixture", "Fixture Type", ["Integrated", "T8"]),
    ]
  );
  assign(
    SCHEMA,
    ["Ceiling Lights", "Wall Lamps", "Pendant Lights", "Recessed Lighting"],
    [
      sel("type", "Type", ["Round", "Square", "Panel", "Spot"]),
      sel("watt", "Wattage", ["12 W", "18 W", "24 W", "36 W"]),
      sel("cct", "Color Temperature", LIGHT_TEMP),
      sel("dimmable", "Dimmable", [...yesno]),
    ]
  );
  assign(
    SCHEMA,
    ["Chandeliers"],
    [
      sel("arms", "Arms", ["3", "5", "8", "12"]),
      sel("finish", "Finish", ["Gold", "Chrome", "Black"]),
      sel("bulb", "Bulb Type", ["E14", "E27", "G9"]),
      sel("height", "Height Adjustable", [...yesno]),
    ]
  );
  assign(
    SCHEMA,
    ["Decorative String Lights"],
    [
      sel("length", "Length", ["5 m", "10 m", "20 m"]),
      sel("led", "LED Type", ["Single", "RGB"]),
      sel("power", "Power Source", ["USB", "Mains", "Battery"]),
      sel("ip", "Waterproof", ["IP20", "IP44", "IP65"]),
    ]
  );
  assign(
    SCHEMA,
    ["Extension Boards"],
    [
      sel("sockets", "Sockets", ["3", "4", "6", "8"]),
      sel("cord", "Cord Length", ["1.5 m", "3 m", "5 m"]),
      sel("switch", "Master Switch", [...yesno]),
      sel("surge", "Surge Protection", [...yesno]),
    ]
  );
  assign(
    SCHEMA,
    ["Solar Lights"],
    [
      sel("panel", "Panel Watt", ["2 W", "5 W", "10 W"]),
      sel("battery", "Battery", ["1200 mAh", "2400 mAh", "4000 mAh"]),
      sel("lumens", "Lumens", ["200", "500", "1000"]),
      sel("sensor", "Motion Sensor", [...yesno]),
    ]
  );
  assign(
    SCHEMA,
    ["Emergency Lights"],
    [
      sel("lumens", "Lumens", ["200", "400", "600"]),
      sel("runtime", "Runtime", ["3 h", "6 h", "12 h"]),
      sel("charge", "Charging Time", ["4 h", "6 h", "8 h"]),
      sel("battery", "Battery Type", ["Li-ion", "Lead-acid"]),
    ]
  );
  assign(
    SCHEMA,
    ["Desk Lamps"],
    [
      sel("type", "Type", ["Clamp", "Table", "Gooseneck"]),
      sel("watt", "Wattage", ["5 W", "9 W", "12 W"]),
      sel("cct", "Color Temperature", LIGHT_TEMP),
      sel("usb", "USB Charging", [...yesno]),
    ]
  );
  assign(
    SCHEMA,
    ["Flood Lights", "Outdoor Lighting", "Industrial Lighting"],
    [
      sel("watt", "Wattage", ["20 W", "50 W", "100 W", "200 W"]),
      sel("cct", "Color Temperature", LIGHT_TEMP),
      sel("ip", "IP Rating", ["IP65", "IP66", "IP67"]),
      sel("sensor", "Sensor", [...yesno]),
    ]
  );
  SCHEMA["Smart Lights"] = [
    sel("type", "Type", ["Bulb", "Strip", "Downlight"]),
    sel("protocol", "Protocol", ["Wi-Fi", "Zigbee", "BLE", "Thread"]),
    col("color", "Color"),
    sel("voice", "Voice Assistant", ["Alexa", "Google", "Siri"]),
  ];
  SCHEMA["Track Lighting"] = [
    sel("tracks", "Tracks", ["1 m", "2 m"]),
    sel("heads", "Heads Included", ["2", "3", "4"]),
    sel("watt", "Watt/Head", ["5 W", "10 W"]),
    sel("dimmable", "Dimmable", [...yesno]),
  ];
  SCHEMA["Night Lights"] = [
    sel("sensor", "Sensor", ["Photo", "Motion", "None"]),
    sel("cct", "Color Temperature", LIGHT_TEMP),
    sel("type", "Type", ["Plug-in", "Rechargeable"]),
    sel("levels", "Brightness Levels", ["2", "3", "5"]),
  ];
  SCHEMA["Stage Lighting"] = [
    sel("type", "Type", ["PAR", "Moving Head", "BAR", "Laser"]),
    sel("power", "Power", ["60 W", "120 W", "200 W"]),
    sel("dmx", "DMX Support", [...yesno]),
    sel("beam", "Beam Angle", ["15°", "25°", "45°"]),
  ];

  // ===== Cables & Wires (20) =====
  SCHEMA["USB Cables"] = [
    sel("type", "Type", [
      "USB-A→USB-C",
      "USB-C→USB-C",
      "USB-A→Micro-B",
      "Lightning→USB-C",
    ]),
    sel("length", "Length", ["0.5 m", "1 m", "2 m", "3 m"]),
    sel("data", "Data Rate", USB_DATA),
    sel("braided", "Braided", [...yesno]),
  ];
  SCHEMA["Ethernet Cables"] = [
    sel("category", "Category", ["Cat5e", "Cat6", "Cat6A", "Cat7", "Cat8"]),
    sel("length", "Length", ["1 m", "3 m", "5 m", "10 m", "20 m"]),
    sel("shield", "Shielding", ["UTP", "FTP", "STP", "S/FTP"]),
    sel("boot", "Booted", [...yesno]),
  ];
  SCHEMA["Audio Cables"] = [
    sel("connector", "Connector", ["3.5mm", "RCA", "XLR", "Optical"]),
    sel("length", "Length", ["1 m", "3 m", "5 m", "10 m"]),
    sel("balanced", "Balanced", [...yesno]),
    sel("shield", "Shielding", ["Std", "Quad"]),
  ];
  SCHEMA["Charging Cables"] = [
    sel("connector", "Connector", ["USB-C", "Lightning", "Micro-USB"]),
    sel("length", "Length", ["1 m", "2 m", "3 m"]),
    sel("power", "Power Rating", ["15 W", "30 W", "60 W", "100 W"]),
    sel("braided", "Braided", [...yesno]),
  ];
  SCHEMA["Coaxial Cables"] = [
    sel("length", "Length", ["3 m", "5 m", "10 m", "20 m"]),
    sel("impedance", "Impedance", ["50 Ω", "75 Ω"]),
    sel("connectors", "Connectors", ["F-Type", "BNC"]),
    sel("shield", "Shielding", ["Std", "Quad"]),
  ];
  SCHEMA["Fiber Optic Cables"] = [
    sel("type", "Type", ["Single-mode", "Multi-mode"]),
    sel("connector", "Connector", ["SC", "LC", "ST"]),
    sel("length", "Length", ["1 m", "3 m", "5 m", "10 m", "20 m"]),
    sel("jacket", "Jacket", ["PVC", "LSZH"]),
  ];
  SCHEMA["Cable Organizers"] = [
    sel("type", "Type", ["Sleeve", "Clip", "Tray", "Box"]),
    sel("size", "Size", ["S", "M", "L"]),
    sel("adhesive", "Self-Adhesive", [...yesno]),
    sel("material", "Material", ["Plastic", "Nylon", "Metal"]),
  ];
  SCHEMA["Industrial Wires"] = [
    sel("gauge", "Gauge (AWG)", ["10", "12", "14", "16", "18"]),
    sel("insulation", "Insulation", ["PVC", "XLPE"]),
    sel("voltage", "Voltage", ["300 V", "600 V", "1 kV"]),
    sel("strands", "Strands", ["Single", "Multi"]),
  ];
  SCHEMA["AV Cables"] = [
    sel("type", "Type", ["RCA", "3.5mm", "Component", "Composite"]),
    sel("length", "Length", ["1 m", "3 m", "5 m"]),
    sel("shield", "Shielding", ["Std", "Quad"]),
    sel("plated", "Gold-Plated", [...yesno]),
  ];
  SCHEMA["Lightning Cables"] = [
    sel("mfi", "MFi Certified", [...yesno]),
    sel("length", "Length", ["1 m", "2 m"]),
    sel("braided", "Braided", [...yesno]),
    sel("power", "Power Rating", ["12 W", "20 W"]),
  ];
  SCHEMA["Type-C Cables"] = [
    sel("usb", "USB Version", ["2.0", "3.2", "USB4"]),
    sel("length", "Length", ["1 m", "2 m"]),
    sel("power", "Power", ["60 W", "100 W", "240 W"]),
    sel("emarker", "E-Marker", [...yesno]),
  ];
  SCHEMA["Extension Cords"] = [
    sel("length", "Length", ["3 m", "5 m", "10 m"]),
    sel("sockets", "Sockets", ["3", "4", "6"]),
    sel("rating", "Rating", ["6 A", "10 A", "16 A"]),
    sel("surge", "Surge", [...yesno]),
  ];
  SCHEMA["Speaker Wires"] = [
    sel("gauge", "Gauge (AWG)", ["12", "14", "16"]),
    sel("length", "Length", ["10 m", "20 m", "50 m"]),
    sel("strands", "Strand Count", ["Std", "High"]),
    sel("mark", "Polarity Marked", [...yesno]),
  ];
  SCHEMA["Network Cables"] = SCHEMA["Ethernet Cables"];
  SCHEMA["Monitor Cables"] = [
    sel("type", "Type", ["HDMI", "DP", "DVI", "VGA"]),
    sel("length", "Length", ["1 m", "2 m", "3 m", "5 m"]),
    sel("res", "Resolution Support", ["1080p", "1440p", "4K", "8K"]),
    sel("latch", "Locking Latch", [...yesno]),
  ];
  SCHEMA["Adapter Cables"] = [
    sel("type", "Type", ["USB-C→HDMI", "USB-C→DP", "USB-C→VGA", "USB-A→RJ45"]),
    sel("length", "Length", ["0.15 m", "0.3 m", "1 m"]),
    sel("chip", "Chipset", ["Alt Mode", "DisplayLink"]),
    sel("pass", "Power Pass-through", [...yesno]),
  ];
  SCHEMA["Ribbon Cables"] = [
    sel("pitch", "Pitch", ["0.5 mm", "1.0 mm", "2.54 mm"]),
    sel("pins", "Pins", ["10", "20", "40"]),
    sel("length", "Length", ["10 cm", "30 cm", "50 cm"]),
    sel("connector", "Connector", ["IDC", "FPC"]),
  ];
  SCHEMA["Flat Cables"] = [
    sel("category", "Category/Type", ["Ethernet", "Power", "USB"]),
    sel("length", "Length", ["1 m", "3 m", "5 m"]),
    sel("thickness", "Thickness", ["1.5 mm", "2 mm"]),
    sel("adhesive", "Adhesive Back", [...yesno]),
  ];

  // ===== Gaming & Consoles (20) =====
  SCHEMA["PlayStation Consoles"] = [
    sel("storage", "Storage", ["825 GB", "1 TB", "2 TB"]),
    sel("edition", "Edition", ["Standard", "Digital", "Slim"]),
    sel("bundle", "Bundle", ["None", "Game Bundle"]),
    sel("drive", "Optical Drive", [...yesno]),
  ];
  SCHEMA["Xbox Consoles"] = [
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
    sel("edition", "Edition", ["Standard", "Digital"]),
    sel("bundle", "Bundle", ["None", "Game Bundle"]),
    sel("drive", "Optical Drive", [...yesno]),
  ];
  SCHEMA["Nintendo Switch"] = [
    sel("model", "Model", ["Switch", "Switch OLED", "Switch Lite"]),
    sel("storage", "Storage", ["32 GB", "64 GB"]),
    sel("bundle", "Edition/Bundle", ["Standard", "Special"]),
    col("color", "Color"),
  ];
  SCHEMA["Gaming PCs"] = [
    txt("cpu", "CPU"),
    txt("gpu", "GPU"),
    sel("ram", "RAM", ["16 GB", "32 GB", "64 GB"]),
    sel("storage", "Storage", ["1 TB", "2 TB", "4 TB"]),
  ];
  SCHEMA["Gaming Controllers"] = [
    sel("layout", "Layout", ["Xbox", "PlayStation", "Nintendo"]),
    sel("connection", "Connection", ["Wired", "Bluetooth", "2.4 GHz"]),
    sel("wireless", "Wireless", [...yesno]),
    sel("programmable", "Programmable Buttons", [...yesno]),
  ];
  SCHEMA["Gaming Keyboards & Mice"] = SCHEMA["Keyboards & Mice"];
  SCHEMA["Gaming Chairs"] = [
    sel("frame", "Frame", ["Steel", "Wood", "Alloy"]),
    sel("upholstery", "Upholstery", ["PU Leather", "Fabric"]),
    sel("recline", "Recline Angle", ["120°", "150°", "170°"]),
    sel("weight", "Weight Capacity", ["120 kg", "150 kg", "180 kg"]),
  ];
  SCHEMA["Game Discs & Digital Codes"] = [
    sel("platform", "Platform", ["PlayStation", "Xbox", "Nintendo", "PC"]),
    sel("edition", "Edition", ["Standard", "Deluxe", "Ultimate"]),
    sel("region", "Region", ["Region-Free", "Region-Locked"]),
    sel("content", "Content Type", ["Disc", "Digital Code"]),
  ];
  SCHEMA["Streaming Gear"] = [
    sel("type", "Type", ["Capture Card", "Mic", "Cam", "Light"]),
    sel("interface", "Interface", ["USB", "PCIe"]),
    sel("resolution", "Max Resolution", ["1080p60", "4K30", "4K60"]),
    sel("bundle", "Bundle", [...yesno]),
  ];
  SCHEMA["VR Gaming Accessories"] = [
    sel("type", "Type", ["Strap", "Case", "Controller", "Lens Cover"]),
    sel("compat", "Platform", ["Meta", "PS VR", "PC VR"]),
    sel("material", "Material", ["Plastic", "Fabric", "Silicone"]),
    sel("pack", "Pack Count", ["1", "2", "4"]),
  ];
  SCHEMA["Arcade Machines"] = [
    sel("cabinet", "Cabinet", ["Upright", "Bartop", "Cocktail"]),
    sel("games", "Game Count", ["1", "10", "60", "100+"]),
    sel("display", "Display Size", ['17"', '19"', '24"']),
    sel("coin", "Coin Mech", [...yesno]),
  ];
  SCHEMA["Game Capture Cards"] = [
    sel("interface", "Interface", ["USB", "PCIe"]),
    sel("max", "Max Resolution", ["1080p60", "4K30", "4K60"]),
    sel("pass", "Passthrough", ["1080p60", "4K60", "4K120"]),
    sel("software", "Software Included", [...yesno]),
  ];
  SCHEMA["Racing Wheels"] = [
    sel("platform", "Platform", ["PC", "PlayStation", "Xbox", "Multi"]),
    sel("ffb", "Force Feedback", [...yesno]),
    sel("pedals", "Pedals Included", [...yesno]),
    sel("shifter", "Shifter Included", [...yesno]),
  ];
  SCHEMA["Flight Sim Controllers"] = [
    sel("type", "Type", ["HOTAS", "Yoke", "Stick"]),
    sel("axes", "Axes/Buttons", ["Basic", "Advanced"]),
    sel("platform", "Platform", ["PC", "PlayStation", "Xbox"]),
    sel("throttle", "Throttle Included", [...yesno]),
  ];
  SCHEMA["Gaming Headsets"] = [
    sel("type", "Type", ["Wired", "Wireless"]),
    sel("driver", "Driver Size", ["40 mm", "50 mm"]),
    sel("mic", "Microphone", [...yesno]),
    sel("surround", "Surround", ["Stereo", "Virtual 7.1", "Dolby Atmos"]),
  ];
  SCHEMA["Gaming Desks"] = [
    sel("size", "Size", ["120 cm", "140 cm", "160 cm"]),
    sel("shape", "Shape", ["Rect", "L-Shape", "Curved"]),
    sel("cable", "Cable Management", [...yesno]),
    sel("rgb", "RGB", [...yesno]),
  ];
  SCHEMA["Graphics Cards for Gaming"] = [
    sel("chipset", "Chipset", ["NVIDIA", "AMD"]),
    sel("vram", "VRAM", ["8 GB", "12 GB", "16 GB", "24 GB"]),
    sel("outputs", "Outputs", ["HDMI+DP", "3xDP+HDMI"]),
    sel("power", "Power Connectors", ["8-pin", "8+8-pin", "12VHPWR"]),
  ];
  SCHEMA["Cooling Fans for Gaming PCs"] = [
    sel("size", "Size", ["120 mm", "140 mm"]),
    sel("rpm", "RPM", ["800-1200", "1200-1800", "1800-2200"]),
    sel("bearing", "Bearing", ["Sleeve", "Hydraulic", "FDB"]),
    sel("rgb", "RGB", [...yesno]),
  ];
  SCHEMA["LED Gaming Lights"] = [
    sel("type", "Type", ["Strip", "Panel", "Bar"]),
    sel("length", "Length/Size", ["1 m", "2 m", "Panel"]),
    sel("control", "Control", ["App", "Remote", "Button"]),
    sel("addr", "Addressable", [...yesno]),
  ];
  SCHEMA["Gamepads & Joysticks"] = [
    sel("platform", "Platform", ["PC", "PlayStation", "Xbox", "Nintendo"]),
    sel("connection", "Connection", ["Wired", "Bluetooth", "2.4 GHz"]),
    sel("prog", "Programmable", [...yesno]),
    sel("haptic", "Haptics", [...yesno]),
  ];

  // Fallback
  SCHEMA["__default__"] = [
    col("color", "Color"),
    txt("dimension", "Size/Spec"),
    txt("material", "Material"),
    txt("weight", "Item Weight"),
  ];
  return SCHEMA;
};

export const SCHEMAS: Record<string, VariantDef[]> = buildVariantSchema();
