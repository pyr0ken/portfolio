import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "kharazmi",
    school: "Kharazmi University",
    degree: "Bachelor of Science (B.Sc.)",
    fieldOfStudy: "Computer Engineering",
    period: {
      start: "2022",
      end: "2026",
    },
    description: `- Undergraduate student in Computer Engineering at Kharazmi University, Tehran, Iran.
- In-depth coursework in Distributed Systems, Operating Systems, Computer Networks, and Database Systems.
- Silver Medalist at the National Innovation Award (Computer Science) 2025.`,
    skills: [
      "Operating Systems",
      "Computer Networks",
      "Distributed Systems",
      "Algorithms",
      "Data Structures",
      "Database Systems",
      "Software Engineering",
    ],
    isExpanded: true,
  },
  {
    id: "cmu-teaching",
    school: "Chabahar University of Maritime and Marine Sciences",
    degree: "Teaching Experience",
    fieldOfStudy: "Python Programming Instructor",
    period: {
      start: "08.2024",
      end: "08.2024",
    },
    description: `- Conducted specialized Python programming training sessions for engineering students.
- Covered algorithmic thinking, data structures, and foundational software engineering methodologies.`,
    skills: [
      "Python",
      "Algorithms",
      "Data Structures",
      "Teaching & Mentorship",
    ],
  },
]
