import { ClinicalTrial, FormattedStudyItem } from "../pages/clinical-trials/clinical-trials.interface";

export const getDataFromAPIResponse: ClinicalTrial = {
    studies: [
        {
            protocolSection: {
                identificationModule: {
                    nctId: 'ID12',
                    briefTitle: 'Test 12'
                },
                statusModule: {
                    overallStatus: 'Completed'
                }
            }
        }
    ],
    nextPageToken: 'nextToken12'
};


export const favoriteTrial = {
    id: '123',
    briefTitle: 'Test Fav Trial',
    status: 'Recruiting'
};

 export const listOfFavorites: FormattedStudyItem[] = [
    { id: 'ID01', favorite: true, briefTitle: 'Trial A', status: 'Completed' },
    { id: 'ID02', favorite: false, briefTitle: 'Trial B', status: 'Recruiting' }
  ];


export const mockClinicalTrialsList = (numberOfItems: number) => {
    const mockIds = Array.from({ length: numberOfItems }, (_, i) => `ID-${i}`);
    return mockIds.map((id, index) => ({ id, briefTitle: `Title ${index}`, status: 'Recruiting' }))
}

export const mockStudy = (id: string) => ({
    id: id,
    briefTitle: `Trial ${id}`,
    status: 'Recruiting',
    favorite: true
});
