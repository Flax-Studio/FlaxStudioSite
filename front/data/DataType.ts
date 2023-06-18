
// ----------------------------- For apps and games -------------------------------
export interface AppsAndGamesData {
    heading: string, description: string, apps: Array<AppDetail>
}

export interface AppDetail {
    imageUrl: string, pageUrl: string, title: string, description: string
}


// ----------------------------- For profile -------------------------------
export interface ProfileData{
    heading: string, description: string, profiles: Array<ProfileDetail>
}

export interface ProfileDetail{
    imageUrl: string, pageUrl: string, name: string, about: string, role: string
}


export interface FeaturesData{
    heading: string, description: string
}

export interface ProductPageData{
    
}


export interface AccountData {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    mode: 'none' | 'google',
    profileImage: string,
    role: 'CEO' | 'CO' | 'Member',
    smallInfo: string,
    extraInfo: string,
    socialLinks: string,
    about: string,
    externalProjectsLinks: string,
    skills: string,
    languages: string,
    joinedAt: number,
    projects: string,
}



// ---------------- server ----------------

export interface AccountBasicData {
    _id: string
    firstName: string,
    lastName: string,
    profileImage: string,
    role: 'CEO' | 'CO' | 'Member',
    projects: string,
    joinedAt: number,
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


export interface DashboardData{
    members: Array<AccountBasicData>,
    products: Array<ProductBasicData>,
    profile: AccountData
}

