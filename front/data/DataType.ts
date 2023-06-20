
export interface ErrorData {
    message: string;
    statusCode: number;
}

// ----------------------------- For apps and games -------------------------------
export interface AppsAndGamesData {
    heading: string, description: string, apps: Array<ProductBasicData>
}


// ----------------------------- For profile -------------------------------
export interface ProfileData {
    heading: string, description: string, profiles: Array<AccountBasicData>
}



export interface FeaturesData {
    heading: string, description: string
}

export interface SocialLink {
    name: string,
    url: string
}

export interface ProjectLink {
    name: string,
    url: string
}


export interface ProfilePageData {
    profile: AccountPublicData,
    members: Array<AccountSmallData>
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
    expertIn: string,
    smallInfo: string,
    dob: number,
    location: string,
    experience: number,
    socialLinks: Array<SocialLink>,
    about: string,
    externalProjectsLinks: Array<ProjectLink>,
    skills: string,
    languages: string,
    joinedAt: number,
    projects: string,
    seoDescription: string
}

export interface AccountPublicData {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    profileImage: string,
    role: 'CEO' | 'CO' | 'MEMBER',
    expertIn: string,
    smallInfo: string,
    dob: number,
    location: string,
    experience: number,
    socialLinks: Array<SocialLink>,
    about: string,
    externalProjectsLinks: Array<ProjectLink>,
    skills: string,
    languages: string,
    joinedAt: number,
    seoDescription: string
}



export interface AccountDashboardData {
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


export interface HomePageData {
    members: Array<AccountBasicData>,
    products: Array<ProductBasicData>

}

export interface AccountBasicData {
    _id: string
    firstName: string,
    lastName: string,
    profileImage: string,
    role: 'CEO' | 'CO' | 'MEMBER',
    expertIn: string,
    smallInfo: string
}

export interface ProductBasicData {
    _id: string,
    name: string,
    dashIconUrl: string,
    dashDescription: string,
    dashStatus: string
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

export interface DashboardData {
    members: Array<AccountDashboardData>,
    products: Array<ProductDashboardData>,
    profile: AccountData
}


export interface ProductDashboardData {
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

