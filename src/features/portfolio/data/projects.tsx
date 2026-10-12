import {
  BoxIcon,
  CalendarCheckIcon,
  CpuIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
} from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "oxiroute",
    title: "Oxiroute",
    period: {
      start: "2025",
    },
    link: "https://github.com/pyr0ken/oxiroute",
    skills: [
      "Rust",
      "Axum",
      "SSE Streaming",
      "Ratatui TUI",
      "SOCKS5 Proxy",
      "Resilience",
      "High Performance",
    ],
    description: `High-performance, ultra-lightweight AI gateway & LLM router built in pure Rust.
- Ultra-low memory footprint (<10MB RSS) with zero-cost abstractions
- Real-time Server-Sent Events (SSE) streaming engine powered by Axum
- Interactive terminal UI (Ratatui) with live throughput metrics and traffic logs
- 3-tier fallback resilience, retry strategies, and intelligent token compaction`,
    icon: <CpuIcon className="size-4" />,
    isExpanded: true,
  },
  {
    id: "interactive-3d-lab",
    title: "Interactive 3D Laboratory",
    period: {
      start: "2024",
      end: "2025",
    },
    link: "https://pyr0ken.ir/#projects",
    skills: [
      "Three.js",
      "React Three Fiber",
      "Computer Vision",
      "LLMs",
      "FastAPI",
      "Python",
      "3D Graphics",
    ],
    description: `Interactive web-based 3D environment for asset visualization, segmentation, and AI integration.
- Upload, render, and edit 3D models with WebGL and React Three Fiber
- Deep learning-driven 3D model segmentation and visual inspection
- Integrated AI capabilities leveraging Computer Vision pipelines and Large Language Models
- Real-time virtual collaborative presentation and review sessions`,
    icon: <BoxIcon className="size-4" />,
    isExpanded: true,
  },
  {
    id: "online-reservation-system",
    title: "Online Reservation & CRM Platform",
    period: {
      start: "2023",
      end: "2024",
    },
    link: "https://pyr0ken.ir/#projects",
    skills: [
      "Django REST Framework",
      "PostgreSQL",
      "Transactions",
      "Redis",
      "Payment Webhooks",
      "Docker",
    ],
    description: `High-concurrency booking and customer relationship management platform.
- Implemented strict PostgreSQL transaction isolation to eliminate double-booking hazards
- Automated subscription scheduling, calendar synchronization, and member ticketing
- Integrated multi-currency payment gateways with webhook reconciliation
- Administrative analytics dashboard with real-time occupancy metrics and audit trails`,
    icon: <CalendarCheckIcon className="size-4" />,
  },
  {
    id: "khales",
    title: "Khales PFM",
    period: {
      start: "2024",
    },
    link: "https://github.com/pyr0ken/khales",
    skills: [
      "Kotlin",
      "Jetpack Compose M3",
      "Room",
      "SQLCipher",
      "AES-256",
      "Android",
      "Privacy First",
    ],
    description: `100% offline, privacy-focused personal finance manager for Android.
- Zero network permissions; all data stays strictly on the physical device
- Encrypted local database utilizing SQLCipher with AES-256 encryption
- Regex-driven Iranian banking SMS transaction parser for automatic expense logging
- Modern UI crafted with Jetpack Compose Material 3 and dynamic financial telemetry`,
    icon: <ShieldCheckIcon className="size-4" />,
  },
  {
    id: "e-commerce-platform",
    title: "E-Commerce Microservices",
    period: {
      start: "2023",
    },
    link: "https://pyr0ken.ir/#projects",
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "RabbitMQ",
      "Docker",
    ],
    description: `Scalable online retail engine featuring distributed order orchestration.
- Real-time inventory synchronization and atomic shopping cart state management
- Multi-facet search, categorization, and filtering optimized with Redis caching
- Asynchronous checkout processing with Celery task queues and RabbitMQ brokers
- Dynamic rule-based promotion, coupon, and tiered discount pricing engines`,
    icon: <ShoppingCartIcon className="size-4" />,
  },
  {
    id: "vahedyar",
    title: "Vahedyar — Course Planner",
    period: {
      start: "2024",
    },
    link: "https://vahedyar.vercel.app",
    skills: [
      "Python",
      "FastAPI",
      "SQLite FTS5",
      "Typer CLI",
      "Vercel",
      "Automation",
    ],
    description: `Zero-backend academic course planning and university portal automation suite.
- Instant full-text search across thousands of courses using SQLite FTS5
- High-efficiency Python scraper and Typer CLI client for portal automation
- Interactive schedule visualizer deployed on Vercel with zero latency`,
    icon: <GraduationCapIcon className="size-4" />,
  },
]
