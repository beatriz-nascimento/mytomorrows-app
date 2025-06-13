export interface ClinicalTrial {
  studies: StudyItem[] | FormattedStudyItem[];
  nextPageToken: string;
}

export interface StudyItem {
  protocolSection?: ProtocolSection;
  derivedSection?: DerivedSection;
  hasResults?: boolean;
}

export interface FormattedStudyItem {
  protocolSection?: ProtocolSection;
  derivedSection?: DerivedSection;
  hasResults?: boolean;
  id?:string;
  favorite?: boolean; 
  briefTitle?: string;
  status?: string;
}


interface ProtocolSection {
  identificationModule?: IdentificationModule;
  statusModule?: StatusModule;
  sponsorCollaboratorsModule?: SponsorCollaboratorsModule;
  oversightModule?: OversightModule;
  descriptionModule?: DescriptionModule;
  conditionsModule?: ConditionsModule;
  designModule?: DesignModule;
  armsInterventionsModule?: ArmsInterventionsModule;
  outcomesModule?: OutcomesModule;
  eligibilityModule?: EligibilityModule;
  contactsLocationsModule?: ContactsLocationsModule;
  referencesModule?: ReferencesModule;
  ipdSharingStatementModule?: IpSharingStatementModule;
}

interface IdentificationModule {
  nctId?: string;
  orgStudyIdInfo?: OrgStudyIdInfo;
  organization?: Organization;
  briefTitle?: string;
  officialTitle?: string;
}

interface OrgStudyIdInfo {
  id?: string;
}

interface Organization {
  fullName?: string;
  class?: string;
}

interface StatusModule {
  statusVerifiedDate?: string;
  overallStatus?: string;
  expandedAccessInfo?: ExpandedAccessInfo;
  startDateStruct?: DateStruct;
  primaryCompletionDateStruct?: DateStruct;
  completionDateStruct?: DateStruct;
  studyFirstSubmitDate?: string;
  studyFirstSubmitQcDate?: string;
  studyFirstPostDateStruct?: DateStruct;
  lastUpdateSubmitDate?: string;
  lastUpdatePostDateStruct?: DateStruct;
}

interface ExpandedAccessInfo {
  hasExpandedAccess?: boolean;
}

interface DateStruct {
  date?: string;
  type?: string;
}

interface SponsorCollaboratorsModule {
  responsibleParty?: ResponsibleParty;
  leadSponsor?: Organization;
  collaborators?: Collaborator[];
}

interface ResponsibleParty {
  type?: string;
}

interface Collaborator {
  name?: string;
  class?: string;
}

interface OversightModule {
  oversightHasDmc?: boolean;
  isFdaRegulatedDrug?: boolean;
  isFdaRegulatedDevice?: boolean;
}

interface DescriptionModule {
  briefSummary?: string;
  detailedDescription?: string;
}

interface ConditionsModule {
  conditions?: string[];
  keywords?: string[];
}

interface DesignModule {
  studyType?: string;
  phases?: string[];
  designInfo?: DesignInfo;
  enrollmentInfo?: EnrollmentInfo;
}

interface DesignInfo {
  allocation?: string;
  interventionModel?: string;
  interventionModelDescription?: string;
  primaryPurpose?: string;
  maskingInfo?: MaskingInfo;
}

interface MaskingInfo {
  masking?: string;
}

interface EnrollmentInfo {
  count?: number;
  type?: string;
}

interface ArmsInterventionsModule {
  armGroups?: ArmGroup[];
  interventions?: Intervention[];
}

interface ArmGroup {
  label?: string;
  type?: string;
  description?: string;
  interventionNames?: string[];
}

interface Intervention {
  type?: string;
  name?: string;
  description?: string;
  armGroupLabels?: string[];
  otherNames?: string[];
}

interface OutcomesModule {
  primaryOutcomes?: Outcome[];
  secondaryOutcomes?: Outcome[];
}

interface Outcome {
  measure?: string;
  description?: string;
  timeFrame?: string;
}

interface EligibilityModule {
  eligibilityCriteria?: string;
  healthyVolunteers?: boolean;
  sex?: string;
  minimumAge?: string;
  maximumAge?: string;
  stdAges?: string[];
}

interface ContactsLocationsModule {
  overallOfficials?: Official[];
  locations?: Location[];
}

interface Official {
  name?: string;
  affiliation?: string;
  role?: string;
}

interface Location {
  facility?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  geoPoint?: GeoPoint;
}

interface GeoPoint {
  lat?: number;
  lon?: number;
}

interface ReferencesModule {
  references?: Reference[];
}

interface Reference {
  pmid?: string;
  type?: string;
  citation?: string;
}

interface IpSharingStatementModule {
  ipdSharing?: string;
}

interface DerivedSection {
  miscInfoModule?: MiscInfoModule;
  conditionBrowseModule?: ConditionBrowseModule;
}

interface MiscInfoModule {
  versionHolder?: string;
}

interface ConditionBrowseModule {
  meshes?: Mesh[];
  browseLeaves?: BrowseLeave[];
  browseBranches?: BrowseBranch[];
}

interface Mesh {
  id?: string;
  term?: string;
}

interface BrowseLeave {
  id?: string;
  name?: string;
  asFound?: string;
  relevance?: string;
}

interface BrowseBranch {
  abbrev?: string;
  name?: string;
}