import { AppDetail, AppsAndGamesData, ProfileData, ProfileDetail } from "../data/DataType"
import drawOn from "../public/app_images/draw-on.png"
import wordSearch from "../public/app_images/word-search.png"
import noImage from "../public/extra/no_image.png"
import sayam from "../public/profiles/sayam_image.jpg"
import anubhav from "../public/profiles/anubhav_image.png"
import nitesh from "../public/profiles/nitesh_image.png"
import aaditya from "../public/profiles/aaditya_image.png"


//------------------------------------------- Released Apps -------------------------------------
const allApps = Array<AppDetail>()
allApps.push({ imageUrl: drawOn, pageUrl: "../draw-on", title: "Draw On", description: "An easy to use drawing application. Which allows you to color the canvas with your inner inspiration." })
allApps.push({ imageUrl: wordSearch, pageUrl: "../word-search", title: "Word Search", description: "Most loving and entertaining Game, which is designed to help you in improving your focusing as well as learning skills." })
// add more apps here...

export const releasedAppsData: AppsAndGamesData = { heading: "Our Apps & Games", description: "See our apps and games which is available on Play store", apps: allApps }



// ----------------------------------------- Upcoming Apps -------------------------------------
const upcomingApps = Array<AppDetail>()
upcomingApps.push({ imageUrl: noImage, pageUrl: "task-planner", title: "Task Planner", description: "A Simple Task Planner app for easily manage your work or your day." })
upcomingApps.push({ imageUrl: noImage, pageUrl: "music-on", title: "Music On", description: "A Simple music app for managing and playing your audio files." })
// add more apps here...

export const upcomingAppsData: AppsAndGamesData = { heading: "Upcoming Apps & Games", description: "Our upcoming Apps & Games will be coming soon", apps: upcomingApps }


// dimention

//----------------------------------------- All Users Profile -----------------------------------
export const userProfiles = Array<ProfileDetail>()
userProfiles.push({imageUrl: sayam, pageUrl:"profile-sayam", name:"Sayam Sr", about:"Tech Enthusiast , loves to lead . Passionate to make things more easy with tech. In progress to establish a self made brand.", role: "Android developer"})
userProfiles.push({imageUrl: nitesh, pageUrl:"profile-nitesh", name:"Nitesh Kr ", about:"I strive to create dynamic and innovative applications and games that engage users and meet their needs.", role: "Android, Web & Game developer"})
userProfiles.push({imageUrl: anubhav, pageUrl:"profile-anubhav", name:"Anubhav Jr", about:"A self-taught Android developer with a passion for building mobile applications. Aspiring to become an Engineer.", role: "Android developer"})
// add more profile here...
userProfiles.push({imageUrl: aaditya, pageUrl:"profile-aaditya", name:"Aaditya Dr", about:"Hello myself Aaditya and I am a front-end  web developer and UI/UX designer...", role: "UI/UX Web developer"})


export const profileData: ProfileData = {heading:"Developers", description:"Hats off for our developers who work together to bring the most incredible and entertaining Apps & Games to your phone.", profiles: userProfiles}

