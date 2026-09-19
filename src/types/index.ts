export type StatusLabel = 'WORKING PROTOTYPE' | 'EXPERIMENTAL' | 'RESEARCH DIRECTION';

export type CapabilityState = 'AVAILABLE' | 'DEGRADED' | 'UNAVAILABLE' | 'UNKNOWN';

export type HumanAgencyState = 'RESPONSIVE' | 'UNCONFIRMED' | 'NON-RESPONSIVE' | 'UNKNOWN';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface EmergencyState {
  id: string;
  risk: RiskLevel;
  agency: HumanAgencyState;
  location: {
    status: CapabilityState;
    confidence: 'HIGH' | 'MODERATE' | 'LOW' | 'NONE';
    value?: { lat: number; lng: number };
    lastReliable?: { lat: number; lng: number; uncertainty: number };
  };
  communication: {
    cellular: CapabilityState;
    relay: CapabilityState;
    internet: CapabilityState;
  };
  resources: {
    battery: number;
    sensing: CapabilityState;
  };
  failures: string[];
  capabilities: Record<string, CapabilityState>;
  actions: ActionRecord[];
  deliveryStatus: 'PENDING' | 'DELIVERED' | 'FAILED' | 'PARTIAL';
  responseStatus: 'PENDING' | 'ACKNOWLEDGED' | 'EN_ROUTE' | 'ARRIVED' | 'HANDOFF';
  recoveryStatus: 'ACTIVE' | 'SYNCHRONIZING' | 'COMPLETE' | 'TERMINAL';
  timestamp: string;
  stateAge: string;
  currentAction?: string;
}

export interface ActionRecord {
  id: string;
  type: 'ALERT' | 'CALL' | 'LOCATE' | 'RELAY' | 'PERSIST' | 'RETRY' | 'REDUCE' | 'RECOVER';
  timestamp: string;
  outcome: 'SUCCESS' | 'FAILED' | 'PARTIAL' | 'PENDING';
  details: string;
  rationale: string;
}

export interface CapabilityNode {
  id: string;
  label: string;
  category: 'human' | 'evidence' | 'sensing' | 'location' | 'communication' | 'resources' | 'responder';
  state: CapabilityState;
  confidence?: number;
  freshness?: number;
  resourceCost?: number;
  failureHistory?: number;
  lastSuccessfulUse?: string;
  description: string;
}

export interface DecisionReplayStep {
  step: number;
  timestamp: string;
  event: string;
  observed: string[];
  known: string[];
  unknown: string[];
  availableCapabilities: string[];
  candidateActions: CandidateAction[];
  selectedAction: string;
  why: string;
}

export interface CandidateAction {
  id: string;
  label: string;
  description: string;
  viability: number;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  objective: string;
  researchQuestion: string;
  setup: string;
  devices: string[];
  androidVersion: string;
  softwareVersion: string;
  environmentalConditions: string;
  numberOfTrials: number;
  baseline: string;
  guardianConfiguration: string;
  video?: string;
  screenshots: string[];
  rawData?: string;
  processedData?: string;
  results: string;
  charts: string[];
  observations: string;
  limitations: string;
  conclusion: string;
  date: string;
  version: string;
  status: StatusLabel;
  category: 'Emergency' | 'Communication' | 'Location' | 'Battery' | 'Relay' | 'Healthcare' | 'Disaster' | 'Architecture';
}

export interface Result {
  id: string;
  metric: string;
  definition: string;
  dataset: string;
  testConditions: string;
  measuredValue: string;
  comparison: string;
  chart?: string;
  confidenceInfo?: string;
  rawDataDownload?: string;
  methodology: string;
  limitations: string;
  date: string;
  status: StatusLabel;
}

export interface Demo {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  demoVideo?: string;
  screenshots: string[];
  scenario: string;
  expectedBehavior: string;
  actualBehavior: string;
  status: StatusLabel;
  date: string;
  version: string;
  limitations: string;
  relatedExperiment?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  date: string;
  category: 'Prototype Demo' | 'Experiment Recording' | 'Failure Simulation' | 'Architecture Explanation' | 'Presentation Demo' | 'Technical Walkthrough';
  relatedFeature?: string;
  relatedExperiment?: string;
}

export interface Feature {
  id: string;
  name: string;
  purpose: string;
  status: StatusLabel;
  explanation: string;
  screenshots: string[];
  video?: string;
  technicalDetails: string;
  limitations: string;
  relatedArchitectureBlock: string;
}

export interface TeamMember {
  id: string;
  name: string;
  contribution: string;
  role: string;
  photo?: string;
  shortBio: string;
  technicalModules: string[];
  achievements: string[];
}

export interface ResearchReference {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: number;
  doi?: string;
  link?: string;
  relevance: string;
  relatedGuardianConcept: string;
}

export interface DevelopmentUpdate {
  id: string;
  date: string;
  milestone: string;
  description: string;
  screenshots: string[];
  video?: string;
  relatedExperiment?: string;
  status: StatusLabel;
  category: 'Architecture' | 'Prototype' | 'Communication' | 'Location' | 'Healthcare' | 'Experiments' | 'Validation';
}

export interface EmergencyScenario {
  id: string;
  name: string;
  trigger: string;
  initialState: Partial<EmergencyState>;
  failures: string[];
  adaptation: string;
  outcome: string;
  limitations: string;
}

export interface TechnicalModule {
  id: string;
  name: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  implementationStatus: StatusLabel;
  architectureRelationship: string;
}

export interface TechnologyStack {
  technology: string;
  purpose: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SiteContent {
  demos: Demo[];
  experiments: Experiment[];
  results: Result[];
  videos: Video[];
  features: Feature[];
  team: TeamMember[];
  references: ResearchReference[];
  updates: DevelopmentUpdate[];
  scenarios: EmergencyScenario[];
  modules: TechnicalModule[];
}