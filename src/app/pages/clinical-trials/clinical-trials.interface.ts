export interface ClinicalTrial {
  studies: StudyItem[] | FormattedStudyItem[];
  nextPageToken: string;
}

export interface FormattedStudyItem {
  protocolSection?: ProtocolSection;
  derivedSection?: DerivedSection;
  hasResults?: boolean;
  id?:string;
  favorite?: boolean; 
  briefTitle?: string;
}

export interface StudyItem {
  protocolSection?: ProtocolSection;
  derivedSection?: DerivedSection;
  hasResults?: boolean;
}

interface ProtocolSection {
  identificationModule?: IdentificationModule;
  statusModule?: StatusModule;
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

interface DerivedSection {
  miscInfoModule?: MiscInfoModule;
}

interface MiscInfoModule {
  versionHolder?: string;
}
