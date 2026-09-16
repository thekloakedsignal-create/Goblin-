export type ArtifactType = "lore" | "art" | "document" | "relic";

export interface Artifact {
  id: string;
  title: string;
  type: ArtifactType;
  description: string;
  content: string; // Markdown text or detailed description/lore
  imageUrl?: string; // base64 or URL
  tags: string[];
  createdAt: string;
  sizeKb?: number;
}

export interface ContentText {
  type: "text";
  text: string;
}

export interface ContentImageUrl {
  type: "image_url";
  image_url: {
    url: string;
  };
}

export type MessageContent = string | (ContentText | ContentImageUrl)[];

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: MessageContent;
  textContent: string;
  reasoning?: string;
  finalAnswer?: string;
  imageUrl?: string;
  retrievedArtifacts?: {
    id: string;
    title: string;
    type: ArtifactType;
  }[];
}

export type GoblinAgentRole = 
  | "scout" 
  | "scrapper" 
  | "alchemist" 
  | "hacker" 
  | "enforcer" 
  | "treasurer" 
  | "gadgeteer";

export type GoblinAgentStatus = 
  | "PATROLLING" 
  | "SALVAGING" 
  | "HACKING" 
  | "BREWING" 
  | "HOARDING" 
  | "RECON" 
  | "STANDBY";

export interface GoblinAgentLog {
  id: string;
  timestamp: string;
  message: string;
  type?: "info" | "success" | "warn" | "loot";
}

export interface GoblinAgent {
  id: string;
  name: string;
  callsign: string;
  role: GoblinAgentRole;
  status: GoblinAgentStatus;
  sectorId: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  targetSectorId?: string;
  energy: number; // 0 - 100
  coins: number;
  avatarEmoji: string;
  tagline: string;
  currentTask: string;
  taskProgress: number; // 0 - 100
  logs: GoblinAgentLog[];
  stats: {
    stealth: number;
    scrapPower: number;
    shinySense: number;
    glitchMastery: number;
  };
  inventory: string[];
}

export type SectorType = 
  | "core" 
  | "scrap" 
  | "treasury" 
  | "bio" 
  | "aqueduct" 
  | "perimeter" 
  | "lab" 
  | "market";

export interface SectorNode {
  id: string;
  name: string;
  code: string;
  depthMeters: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  type: SectorType;
  threatLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  signalStrength: number; // percentage 0 - 100
  resources: { name: string; amount: number; unit: string }[];
  description: string;
  lore: string;
  connections: string[]; // ids of connected sectors
}

export type MapOverlayMode = "tactical" | "thermal" | "signals";
