export interface MailData {
    from: string,
    to: string,
    subject: string,
    html: string
}

export interface SocialLink{
    name: string,
    url: string
}

export interface ProjectLink{
    name: string,
    url: string
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

export interface AccountSmallData {
    _id: string
    firstName: string,
    lastName: string,
    profileImage: string,
    expertIn: string
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


export interface ProfilePageData{
    profile: AccountPublicData,
    members: Array<AccountSmallData>
}

export interface PendingAccountData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    otp: string,
    token: string
}

export interface PendingResetPassword {
    accountId: string,
    email: string,
    token: string,
    expiry: number
}


export interface DashboardData {
    members: Array<AccountBasicData>,
    products: Array<ProductBasicData>,
    profile: AccountData
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
    productSeoDesc: string,
    productAboutDesc: string,
    productAboutEndDesc: string,
    productFeatures: string,

    privacySeoDescription: string,
    privacyAboutDesc: string
}



