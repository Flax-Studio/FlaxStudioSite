
export interface ErrorData {
    message: string;
    statusCode: number;
}

// ----------------------------- For apps and games -------------------------------
export interface AppsAndGamesData {
    heading: string, description: string, apps: Array<AppDetail>
}

export interface AppDetail {
    imageUrl: string, pageUrl: string, title: string, description: string
}


// ----------------------------- For profile -------------------------------
export interface ProfileData {
    heading: string, description: string, profiles: Array<ProfileDetail>
}

export interface ProfileDetail {
    imageUrl: string, pageUrl: string, name: string, about: string, role: string
}


export interface FeaturesData {
    heading: string, description: string
}

export interface ProductPageData {

}


export interface AccountData {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    mode: 'none' | 'google',
    profileImage: string,
    role: 'CEO' | 'CO' | 'MEMBER',
    expertIn : string,
    smallInfo: string,
    dob: number,
    location: string,
    experience: number,
    socialLinks: string,
    about: string,
    externalProjectsLinks: string,
    skills: string,
    languages: string,
    joinedAt: number,
    projects: string,
}

export interface AccountPageData {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string,
    role: 'CEO' | 'CO' | 'MEMBER',
    expertIn : string,
    smallInfo: string,
    dob: number,
    location: string,
    experience: number,
    socialLinks: string,
    about: string,
    externalProjectsLinks: string,
    skills: string,
    languages: string,
    joinedAt: number
}


export interface AccountBasicData {
    _id: string
    firstName: string,
    lastName: string,
    profileImage: string,
    role: 'CEO' | 'CO' | 'MEMBER',
    expertIn: string,
    projects: string,
    joinedAt: number,
}

export interface AccountSmallData {
    _id: string
    firstName: string,
    lastName: string,
    profileImage: string,
    expertIn: string
}

export interface ProfilePageData{
    profile: AccountPageData,
    members: Array<AccountSmallData>
}





export interface ProductData {
    _id: string,
    name: string,
    dashIconUrl: string,
    dashDescription: string,
    dashPlatform: string,
    dashTeamLead: string,
    dashStartedAt: number,
    dashCompletedAt: number,
    dashStatus: string,

    landingDescription: string,
    landingImageUrl: string,
    playStoreUrl: string,
    productSeoTitle: string,
    productSeoDesc: string,
    productAboutDesc: string,
    productAboutEndDesc: string,
    productFeatures: string,

    privacySeoTitle: string,
    privacySeoDescription: string,
    privacyAboutDesc: string
}

export interface ProductPageData {
    _id: string,
    name: string,
    landingDescription: string,
    landingImageUrl: string,
    playStoreUrl: string,
    productSeoDesc: string,
    productAboutDesc: string,
    productAboutEndDesc: string,
    productFeatures: string,
}


export interface ProductPrivacyPageData {
    _id: string,
    name: string,
    landingDescription: string,
    playStoreUrl: string,
    privacySeoDescription: string,
    privacyAboutDesc: string
}

export interface ProductBasicData {
    _id: string,
    name: string,
    dashIconUrl: string,
    dashDescription: string,
    dashPlatform: string,
    dashTeamLead: string,
    dashStartedAt: number,
    dashCompletedAt: number,
    dashStatus: string
}


export interface DashboardData {
    members: Array<AccountBasicData>,
    products: Array<ProductBasicData>,
    profile: AccountData
}

