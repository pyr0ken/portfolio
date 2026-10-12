import content from "@/data/portfolio-content.json"

import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: content.user.firstName || "Mohammad Hossein",
  lastName: content.user.lastName || "Yaghoubi",
  displayName: content.user.displayName || "Mohammad Hossein Yaghoubi",
  username: content.user.username || "pyr0ken",
  gender: "male",
  pronouns: "he/him",
  bio: content.user.bio,
  flipSentences: content.user.flipSentences,
  address: content.user.address,
  phoneNumberB64: "Kzk4OTM2OTAzNzc3OA==", // E.164 format, base64 encoded
  emailB64: "bW1kaG9zZWluLnlhZ2hvdWJpQGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://pyr0ken.ir",
  jobTitle: content.user.jobTitle,
  jobs: content.experiences.map((exp) => ({
    title: exp.positions[0]?.title || "Engineer",
    company: exp.companyName,
    website: exp.companyWebsite,
    experienceId: exp.id,
  })),
  about: content.user.about,
  avatar: "https://avatars.githubusercontent.com/u/126270229?v=4",
  avatarSketch: "https://avatars.githubusercontent.com/u/126270229?v=4",
  avatarVariants: {
    lightOff: "https://avatars.githubusercontent.com/u/126270229?v=4",
    lightOn: "https://avatars.githubusercontent.com/u/126270229?v=4",
    darkOff: "https://avatars.githubusercontent.com/u/126270229?v=4",
    darkOn: "https://avatars.githubusercontent.com/u/126270229?v=4",
  },
  ogImage: "https://avatars.githubusercontent.com/u/126270229?v=4",
  namePronunciationUrl: "",
  timeZone: "Asia/Tehran",
  keywords: [
    "pyr0ken",
    "Mohammad Hossein Yaghoubi",
    "محمدحسین یعقوبی",
    "Backend Engineer",
    "DevOps",
    "Rust",
    "Kubernetes",
  ],
  dateCreated: "2024-01-01",
}
