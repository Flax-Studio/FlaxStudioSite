
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
