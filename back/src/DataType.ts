export interface MailData {
    from: string,
    to: string,
    subject: string,
    html: string
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
    startedAt: string,
    completedAt: number,
    status: number,
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


export interface DashboardData{
    members: Array<AccountBasicData>,
    projects: Array<ProjectData>,
    profile: AccountData
}



