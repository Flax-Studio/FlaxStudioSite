import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const accountSchema = new Schema({

    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    mode: { type: String, required: true, enum: ['none', 'google'] },
    profileImage: { type: String, required: false },
    role: { type: String, required: true, enum: ['CEO', 'CO', 'Member'] },
    smallInfo: { type: String, required: false },
    extraInfo: { type: String, required: false },
    socialLinks: { type: String, required: false },
    about: { type: String, required: false },
    externalProjectsLinks: { type: String, required: false },
    skills: { type: String, required: false },
    languages: { type: String, required: false },
    joinedAt: { type: Number, required: true },
    projects: { type: String, required: false },

});

export const Account = mongoose.model("Account", accountSchema)


const projectSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    iconUrl: { type: String, required: false },
    description: { type: String, required: true },

    platform: { type: String, required: true },
    teamLead: { type: String, require: true },
    startedAt: { type: Number, require: true },
    completedAt: { type: Number, require: false },
    status: { type: Number, require: true },

})

export const Project = mongoose.model("Project", projectSchema)









const projectContentSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    landingDescription: { type: String, required: false },
    landingImageUrl: { type: String, required: false },
    playStoreUrl: { type: String, required: false },

    seoTitle: { type: String, require: false },
    seoDescription: { type: String, require: false },

    aboutDescription: { type: String, require: false },
    aboutEndDescription: { type: String, require: false },

    features: { type: String, require: false },
})

export const ProjectContent = mongoose.model("ProjectContent", projectContentSchema)


const projectPrivacySchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    landingDescription: { type: String, required: false },
    playStoreUrl: { type: String, required: false },

    seoTitle: { type: String, require: false },
    seoDescription: { type: String, require: false },

    aboutDescription: { type: String, require: false },
})

export const ProjectPrivacy = mongoose.model("ProjectPrivacy", projectPrivacySchema)


