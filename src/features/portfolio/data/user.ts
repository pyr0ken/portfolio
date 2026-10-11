import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Mohammad Hossein",
  lastName: "Yaghobi",
  displayName: "Mohammad Hossein Yaghobi",
  username: "pyr0ken",
  gender: "male",
  pronouns: "he/him",
  bio: "Architecting high-concurrency RESTful microservices, zero-copy network gateways, automated Kubernetes/Docker pipelines, and offline cryptography.",
  flipSentences: [
    "Backend & DevOps Software Engineer.",
    "Systems & Infrastructure Architect.",
    "Silver Medalist — National Innovation Award.",
    "Kharazmi Computer Engineering.",
  ],
  address: "Tehran, Iran",
  phoneNumberB64: "Kzk4OTM2OTAzNzc3OA==", // E.164 format, base64 encoded
  emailB64: "bW1kaG9zZWluLnlhZ2hvdWJpQGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://pyr0ken.ir",
  jobTitle: "Backend & DevOps Software Engineer",
  jobs: [
    {
      title: "Backend & DevOps Software Engineer",
      company: "MehrsunAi",
      website: "https://mehrsunai.com",
      experienceId: "mehrsunai",
    },
    {
      title: "Backend Developer",
      company: "Chabahar Maritime University",
      website: "https://cmu.ac.ir",
      experienceId: "cmu",
    },
  ],
  about: `- Systems & DevOps Software Engineer specializing in high-concurrency microservices, automated Kubernetes/Docker pipelines, zero-copy network gateways, and offline cryptography.
- Undergraduate in Computer Engineering at Kharazmi University, Tehran, Iran.
- Silver Medalist in the National Innovation Award (Computer Science).
- Creator of [Oxiroute](https://github.com/pyr0ken/oxiroute) (High-performance Rust AI Gateway, <10MB RSS) and [Khales](https://github.com/pyr0ken/khales) (100% offline privacy PFM with SQLCipher AES-256).`,
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
    "Mohammad Hossein Yaghobi",
    "محمدحسین یعقوبی",
    "Backend Engineer",
    "DevOps",
    "Rust",
    "Kubernetes",
    "MehrsunAi",
  ],
  dateCreated: "2024-01-01",
}
