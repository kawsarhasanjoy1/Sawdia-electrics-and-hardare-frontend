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







// ============================================
// Variant schema mapped to your sub-categories
// ============================================

export const buildVariantSchema = (): Record<string, VariantDef[]> => {
  const S: Record<string, VariantDef[]> = {};

  // ---------- DESKTOP ----------
  const DEF_DESKTOP: VariantDef[] = [
    txt("cpu", "CPU"),
    txt("gpu", "GPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB", "64 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB", "4 TB"]),
  ];
  S["Star PC"] = DEF_DESKTOP;
  S["Gaming PC"] = [
    txt("cpu", "CPU"),
    txt("gpu", "GPU"),
    sel("ram", "RAM", ["16 GB", "32 GB", "64 GB"]),
    sel("storage", "Storage", ["1 TB", "2 TB", "4 TB"]),
    sel("cooling", "Cooling", ["Air", "240mm AIO", "360mm AIO"]),
  ];
  S["Brand PC"] = DEF_DESKTOP;
  S["All-in-One PC"] = [
    txt("cpu", "CPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
    sel("display", "Display Size", ['21.5"', '23.8"', '27"']),
  ];
  S["Portable Mini PC"] = [
    txt("cpu", "CPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
    sel("mount", "VESA Mount", [...yesno]),
  ];
  S["Apple iMac"] = [
    sel("chip", "Chip", ["M1", "M2", "M3"]),
    sel("ram", "RAM", ["8 GB", "16 GB", "24 GB"]),
    sel("storage", "Storage", ["256 GB", "512 GB", "1 TB"]),
    sel("display", "Display Size", ['24"', '27"']),
    col("color", "Color"),
  ];
  S["Apple Mac Mini"] = [
    sel("chip", "Chip", ["M2", "M2 Pro", "M3"]),
    sel("ram", "RAM", ["8 GB", "16 GB", "24 GB", "32 GB"]),
    sel("storage", "Storage", ["256 GB", "512 GB", "1 TB", "2 TB"]),
  ];
  S["Apple Mac Studio"] = [
    sel("chip", "Chip", ["M2 Max", "M2 Ultra", "M3 Max", "M3 Ultra"]),
    sel("ram", "RAM", ["32 GB", "64 GB", "128 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB", "4 TB", "8 TB"]),
  ];
  S["Apple Mac Pro"] = [
    sel("chip", "Chip", ["M2 Ultra", "M3 Ultra"]),
    sel("ram", "RAM", ["64 GB", "128 GB", "192 GB"]),
    sel("storage", "Storage", ["1 TB", "2 TB", "4 TB", "8 TB"]),
    sel("pci", "PCIe Slots Used", ["0", "1", "2", "3", "4+"]),
  ];

  // ---------- LAPTOP ----------
  S["Gaming Laptop"] = [
    txt("cpu", "CPU"),
    txt("gpu", "GPU"),
    sel("ram", "RAM", ["16 GB", "32 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
    sel("display", "Display", ['15.6"', '16"', '17.3"']),
    sel("refresh", "Refresh Rate", ["120 Hz", "144 Hz", "165 Hz", "240 Hz"]),
  ];
  S["Premium Ultrabook"] = [
    txt("cpu", "CPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB"]),
    sel("storage", "Storage", ["512 GB", "1 TB", "2 TB"]),
    sel("display", "Display", ['13.3"', '14"', '15"']),
    sel("weight", "Weight Class", ["<1 kg", "1–1.3 kg", "1.3–1.6 kg"]),
  ];
  S["Laptop Bag"] = [
    sel("size", "Size", ['13"', '14"', '15.6"', '16"', '17"']),
    sel("type", "Type", ["Backpack", "Sleeve", "Messenger"]),
    sel("material", "Material", ["Nylon", "Polyester", "Leather", "Neoprene"]),
    sel("water", "Water Resistant", [...yesno]),
    col("color", "Color"),
  ];
  S["Laptop Accessories"] = [
    sel("type", "Type", ["Dock", "Stand", "Cooling Pad", "Hub"]),
    sel("interface", "Interface", ["USB-C", "Thunderbolt 3", "Thunderbolt 4"]),
    sel("ports", "Total Ports", ["4", "6", "8", "10+"]),
  ];
  S["MacBook"] = [
    sel("chip", "Chip", ["M1", "M2", "M3"]),
    sel("ram", "RAM", ["8 GB", "16 GB", "24 GB"]),
    sel("storage", "Storage", ["256 GB", "512 GB", "1 TB", "2 TB"]),
    sel("display", "Display", ['13.6"', '14.2"', '16.2"']),
    col("color", "Color"),
  ];

  // ---------- MONITOR ----------
  const DEF_MONITOR: VariantDef[] = [
    sel("size", "Size", MONITOR_SIZES),
    sel("resolution", "Resolution", RES_ALL),
    sel("panel", "Panel Type", PANEL),
    sel("refresh", "Refresh Rate", REFRESH),
  ];
  S["LED Monitor"] = DEF_MONITOR;
  S["Curved Monitor"] = DEF_MONITOR;
  S["Gaming Monitor"] = [
    ...DEF_MONITOR,
    sel("sync", "Sync Tech", ["G-SYNC", "FreeSync", "Adaptive Sync"]),
  ];
  S["4K Monitor"] = DEF_MONITOR;
  S["Portable Monitor"] = [
    sel("size", "Size", ['13.3"', '14"', '15.6"', '16"']),
    sel("resolution", "Resolution", ["1080p", "1440p", "4K"]),
    sel("input", "Input", ["USB-C", "HDMI", "USB-C+HDMI"]),
    sel("touch", "Touch", [...yesno]),
  ];
  S["Touch Monitor"] = [
    sel("size", "Size", MONITOR_SIZES),
    sel("resolution", "Resolution", RES_ALL),
    sel("touch", "Touch", [...yesno]),
    sel("stand", "Stand", ["Tilt", "Height-Adjust", "Ergo"]),
  ];

  // ---------- PHONE ----------
  S["Smartphone"] = [
    col("color", "Color"),
    sel("ram", "RAM", RAM),
    sel("storage", "Storage", STORAGE),
    sel("battery", "Battery", BAT_MOBILE),
    sel("display", "Display", ['6.1"', '6.5"', '6.7"']),
    sel("sim", "Dual SIM", [...yesno]),
  ];
  S["Feature Phone"] = [
    col("color", "Color"),
    sel("dualSim", "Dual SIM", [...yesno]),
    sel("battery", "Battery", BAT_FEATURE),
    sel("torch", "Torch Light", [...yesno]),
  ];
  S["Mobile Accessories"] = [
    sel("type", "Type", [
      "Case/Cover",
      "Screen Protector",
      "Charger/Adapter",
      "Cable",
      "Power Bank",
      "Holder/Mount",
      "Earphones/Headphones",
      "Speaker",
      "Selfie Stick/Tripod",
      "Wireless Charger",
      "Stylus",
    ]),
    txt("compat", "Compatibility"),
    col("color", "Color"),
  ];

  // ---------- POWER ----------
  S["UPS"] = [
    sel("capacity", "Capacity (VA)", ["650", "1000", "1500", "2200", "3000"]),
    sel("outlets", "Outlets", ["2", "4", "6", "8"]),
    sel("avr", "AVR", [...yesno]),
    sel("type", "Type", ["Offline", "Line-Interactive", "Online"]),
  ];
  S["Mini UPS"] = [
    sel("capacity", "Capacity", ["5,000 mAh", "10,000 mAh", "15,000 mAh"]),
    sel("ports", "Ports", ["1", "2", "3"]),
    sel("poe", "PoE Support", [...yesno]),
  ];
  S["Battery"] = [
    sel("type", "Type", ["Lead-acid", "SMF", "Lithium"]),
    sel("volt", "Voltage", ["12V", "24V"]),
    sel("capacity", "Capacity (Ah)", ["7", "9", "12", "20", "100"]),
  ];
  S["Voltage Stabilizer"] = [
    sel("rating", "Rating (kVA)", ["0.5", "1", "2", "3", "5"]),
    sel("type", "Type", ["Relay", "Servo"]),
    sel("delay", "Time Delay", [...yesno]),
  ];
  S["Inverter"] = [
    sel("type", "Type", ["Pure Sine", "Modified Sine"]),
    sel("capacity", "Capacity (VA)", ["700", "1000", "1400", "2200"]),
    sel("battery", "Battery Type", ["Lead-acid", "Lithium"]),
  ];
  S["Solar Panel System"] = [
    sel("panel", "Panel Watt", ["200 W", "330 W", "450 W", "550 W"]),
    sel("inv", "Inverter", ["On-Grid", "Off-Grid", "Hybrid"]),
    sel("batt", "Battery Storage", [...yesno]),
  ];

  // ---------- TABLET ----------
  S["Android Tablet"] = [
    sel("display", "Display", ['8"', '10.4"', '11"', '12.4"']),
    sel("ram", "RAM", ["3 GB", "4 GB", "6 GB", "8 GB"]),
    sel("storage", "Storage", ["32 GB", "64 GB", "128 GB", "256 GB"]),
    sel("connectivity", "Connectivity", ["Wi-Fi", "Wi-Fi + Cellular"]),
    sel("pen", "Stylus Support", [...yesno]),
  ];
  S["Windows Tablet"] = [
    sel("display", "Display", ['10.5"', '12.4"', '13"']),
    txt("cpu", "CPU"),
    sel("ram", "RAM", ["8 GB", "16 GB", "32 GB"]),
    sel("storage", "Storage", ["128 GB", "256 GB", "512 GB", "1 TB"]),
    sel("kb", "Keyboard Cover", [...yesno]),
  ];
  S["Drawing Tablet"] = [
    sel("active", "Active Area", ["S", "M", "L"]),
    sel("pressure", "Pressure Levels", ["2048", "4096", "8192"]),
    sel("tilt", "Tilt Support", [...yesno]),
    sel("wireless", "Wireless", [...yesno]),
  ];
  S["Tablet Accessories"] = [
    sel("type", "Type", [
      "Case/Cover",
      "Screen Protector",
      "Stylus",
      "Keyboard Cover",
      "Stand/Mount",
      "Cable/Adapter",
      "Power Bank",
      "Bag/Sleeve",
    ]),
    txt("compat", "Compatibility"),
    col("color", "Color"),
  ];

  // ---------- CAMERA ----------
  S["DSLR Camera"] = [
    sel("mount", "Lens Mount", ["Canon EF", "Nikon F", "Pentax K"]),
    sel("sensor", "Sensor Size", ["Full-Frame", "APS-C"]),
    sel("video", "Video", ["1080p", "4K"]),
    sel("ibis", "IBIS", [...yesno]),
  ];
  S["Mirrorless Camera"] = [
    sel("mount", "Lens Mount", ["Canon RF", "Nikon Z", "Sony E", "Fuji X", "L-Mount", "MFT"]),
    sel("sensor", "Sensor Size", ["Full-Frame", "APS-C", "Micro 4/3"]),
    sel("video", "Video", ["4K30", "4K60", "6K", "8K"]),
    sel("ibis", "IBIS", [...yesno]),
  ];
  S["Action Camera"] = [
    sel("video", "Video", ["1080p", "2.7K", "4K", "5.3K"]),
    sel("stabil", "Stabilization", ["Electronic", "Advanced"]),
    sel("water", "Waterproof", [...yesno]),
  ];
  S["Security Camera"] = [
    sel("res", "Resolution", ["1080p", "2K", "4K"]),
    sel("connect", "Connectivity", ["Wi-Fi", "PoE", "4G"]),
    sel("night", "Night Vision", [...yesno]),
    sel("ip", "IP Rating", ["IP65", "IP66", "IP67"]),
  ];
  S["Camera Lens"] = [
    sel("mount", "Mount", ["Canon RF", "Canon EF", "Nikon Z", "Nikon F", "Sony E", "Fuji X", "L-Mount", "MFT"]),
    sel("type", "Type", ["Prime", "Zoom"]),
    txt("focal", "Focal Length"),
    txt("aperture", "Max Aperture"),
    sel("os", "Optical Stabilization", [...yesno]),
  ];
  S["Tripod & Gimbal"] = [
    sel("type", "Type", ["Tripod", "Monopod", "Gimbal"]),
    sel("load", "Max Load", ["1 kg", "3 kg", "5 kg", "10 kg"]),
    sel("material", "Material", ["Aluminum", "Carbon Fiber"]),
    sel("height", "Max Height", ["120 cm", "150 cm", "170 cm"]),
  ];

  // ---------- GAMING ----------
  S["VR Headset"] = [
    sel("platform", "Platform", ["PC", "PlayStation", "Standalone"]),
    sel("resEye", "Resolution/Eye", ["1832×1920", "2160×2160"]),
    sel("tracking", "Tracking", ["Inside-out", "External"]),
    sel("refresh", "Refresh Rate", ["90 Hz", "120 Hz"]),
  ];
  S["Gaming Keyboard"] = [
    sel("type", "Type", ["Membrane", "Mechanical"]),
    sel("switch", "Switch", ["Red", "Brown", "Blue"]),
    sel("rgb", "RGB", [...yesno]),
    sel("wireless", "Wireless", [...yesno]),
  ];
  S["Gaming Mouse"] = [
    sel("dpi", "Max DPI", ["3200", "6400", "16000", "26000"]),
    sel("buttons", "Buttons", ["6", "8", "11+"]),
    sel("wireless", "Wireless", [...yesno]),
    sel("rgb", "RGB", [...yesno]),
  ];
  S["Gaming Chair"] = [
    sel("upholstery", "Upholstery", ["PU Leather", "Fabric"]),
    sel("recline", "Recline", ["120°", "150°", "170°"]),
    sel("capacity", "Weight Capacity", ["120 kg", "150 kg", "180 kg"]),
    sel("footrest", "Footrest", [...yesno]),
  ];
  S["Gaming Headset"] = [
    sel("type", "Type", ["Wired", "Wireless"]),
    sel("driver", "Driver Size", ["40 mm", "50 mm"]),
    sel("surround", "Surround", ["Stereo", "Virtual 7.1", "Dolby Atmos"]),
    sel("mic", "Microphone", [...yesno]),
  ];

  // ---------- ACCESSORIES (your 9 sub-cats) ----------
  S["Desktop Accessories"] = [
    sel("type", "Type", ["Keyboard", "Mouse", "Mousepad", "Hub", "Stand"]),
    sel("wireless", "Wireless", [...yesno]),
    col("color", "Color"),
  ];
  S["Laptot Accessories"] = [
    sel("type", "Type", ["Dock", "Stand", "Cooling Pad", "Hub"]),
    sel("interface", "Interface", ["USB-C", "Thunderbolt 3", "Thunderbolt 4"]),
    sel("ports", "Total Ports", ["4", "6", "8", "10+"]),
  ];
  S["Monitor Accessories"] = [
    sel("type", "Type", ["HDMI Cable", "DP Cable", "VESA Mount", "Arm"]),
    sel("length", "Cable Length", ["1 m", "2 m", "3 m", "5 m"]),
    sel("vesa", "VESA", ["75×75", "100×100", "200×200", "400×400"]),
  ];
  S["Phone Accessories"] = [
    sel("type", "Type", [
      "Case/Cover",
      "Screen Protector",
      "Charger/Adapter",
      "Cable",
      "Power Bank",
      "Holder/Mount",
      "Earphones/Headphones",
      "Speaker",
      "Wireless Charger",
      "Stylus",
    ]),
    txt("compat", "Compatibility"),
    col("color", "Color"),
  ];
  S["Power Accessories"] = [
    sel("type", "Type", ["Extension", "Power Cord", "Surge Protector"]),
    sel("length", "Length", ["1.5 m", "3 m", "5 m"]),
    sel("rating", "Rating", ["6 A", "10 A", "16 A"]),
    sel("surge", "Surge Protection", [...yesno]),
  ];
  S["Tablet Accessories"] = [
    sel("type", "Type", [
      "Case/Cover",
      "Screen Protector",
      "Stylus",
      "Keyboard Cover",
      "Stand/Mount",
      "Cable/Adapter",
      "Power Bank",
      "Bag/Sleeve",
    ]),
    txt("compat", "Compatibility"),
    col("color", "Color"),
  ];
  S["Camera Accessories"] = [
    sel("type", "Type", ["Tripod", "Gimbal", "Bag", "Battery", "Charger", "Light"]),
    sel("mount", "Mount", ["1/4\"", "3/8\""]),
    sel("load", "Max Load", ["1 kg", "3 kg", "5 kg", "10 kg"]),
  ];
  S["Gaming Accessories"] = [
    sel("type", "Type", ["Controller", "Headset", "RGB Light", "Capture Card"]),
    sel("connection", "Connection", ["Wired", "Bluetooth", "2.4 GHz"]),
    sel("rgb", "RGB", [...yesno]),
  ];
  S["Tv Accessories"] = [
    sel("type", "Type", ["Wall Mount", "HDMI Cable", "Remote", "Streaming Device"]),
    sel("vesa", "VESA", ["75×75", "100×100", "200×200", "400×400"]),
    sel("length", "Cable Length", ["1 m", "2 m", "3 m", "5 m"]),
  ];

  // ---------- TV ----------
  const DEF_TV: VariantDef[] = [
    sel("size", "Size", TV_SIZES),
    sel("os", "OS", ["Android TV", "Google TV", "Tizen", "webOS", "Roku"]),
    sel("resolution", "Resolution", ["1080p", "4K"]),
    sel("voice", "Voice Control", [...yesno]),
  ];
  S["Smart TV"] = DEF_TV;
  S["LED TV"] = [
    sel("size", "Size", TV_SIZES),
    sel("panel", "Panel", ["LED", "QLED"]),
    sel("resolution", "Resolution", ["1080p", "4K"]),
    sel("refresh", "Refresh Rate", ["60 Hz", "120 Hz"]),
  ];
  S["4K UHD TV"] = [
    sel("size", "Size", TV_SIZES),
    sel("panel", "Panel", ["LED", "QLED", "Mini-LED"]),
    sel("hdr", "HDR", ["HDR10", "HDR10+", "Dolby Vision"]),
    sel("refresh", "Refresh Rate", ["60 Hz", "120 Hz"]),
  ];
  S["OLED TV"] = [
    sel("size", "Size", TV_SIZES),
    sel("hdr", "HDR", ["HDR10", "Dolby Vision"]),
    sel("refresh", "Refresh Rate", ["60 Hz", "120 Hz", "144 Hz"]),
  ];
  S["QLED TV"] = [
    sel("size", "Size", TV_SIZES),
    sel("hdr", "HDR", ["HDR10", "HDR10+", "Dolby Vision"]),
    sel("refresh", "Refresh Rate", ["60 Hz", "120 Hz"]),
  ];
  S["TV Mount & Stand"] = [
    sel("type", "Type", ["Fixed", "Tilt", "Full-Motion", "Floor Stand"]),
    sel("vesa", "VESA", ["75×75", "100×100", "200×200", "400×400"]),
    sel("capacity", "Weight Capacity", ["25 kg", "50 kg", "75 kg"]),
  ];

  // ---------- DEFAULT ----------
  S["__default__"] = [
    col("color", "Color"),
    txt("dimension", "Size/Spec"),
    txt("material", "Material"),
    txt("weight", "Item Weight"),
  ];

  return S;
};

// Export the final schema map
export const TSCHEMA: Record<string, VariantDef[]> = buildVariantSchema();
