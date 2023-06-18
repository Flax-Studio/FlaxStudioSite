
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

export interface ProjectData{
    _id: string,
    name: string,
    iconUrl: string,
    description: string,

    platform: string,
    teamLead: string,
    startedAt: number,
    completedAt: number,
    status: number,
}

export interface DashboardData{
    members: Array<AccountBasicData>,
    projects: Array<ProjectData>,
    profile: AccountData
}

