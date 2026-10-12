"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  CheckIcon,
  DownloadIcon,
  FolderGit2Icon,
  GraduationCapIcon,
  Loader2Icon,
  LogOutIcon,
  PlusIcon,
  SaveIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

type ProjectItem = {
  id: string
  title: string
  period: { start: string; end?: string }
  link: string
  skills: string[]
  description: string
  isExpanded?: boolean
}

type ExperiencePosition = {
  id: string
  title: string
  employmentPeriod: { start: string; end?: string }
  employmentType: string
  description: string
  skills: string[]
  isExpanded?: boolean
}

type ExperienceItem = {
  id: string
  companyName: string
  companyWebsite: string
  location: string
  locationType: string
  isCurrentEmployer: boolean
  positions: ExperiencePosition[]
}

type EducationItem = {
  id: string
  school: string
  degree: string
  fieldOfStudy: string
  period: { start: string; end?: string }
  description: string
  skills: string[]
}

type PortfolioData = {
  user: {
    displayName: string
    jobTitle: string
    bio: string
    about: string
    flipSentences: string[]
    address: string
  }
  projects: ProjectItem[]
  experiences: ExperienceItem[]
  education: EducationItem[]
  awards: Array<{
    id: string
    prize: string
    title: string
    date: string
    grade: string
    description: string
  }>
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "projects" | "experiences" | "education" | "profile"
  >("projects")
  const [message, setMessage] = useState<{
    text: string
    type: "success" | "error"
  } | null>(null)

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json() as Promise<{ data: PortfolioData }>
      })
      .then((json) => {
        setData(json.data)
        setLoading(false)
      })
      .catch(() => {
        router.push("/admin/login")
      })
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      })

      const resData = (await res.json()) as {
        error?: string
        message?: string
      }
      if (!res.ok) throw new Error(resData.error || "Failed to save")

      setMessage({
        text: resData.message || "Changes published successfully!",
        type: "success",
      })
    } catch (err: unknown) {
      setMessage({
        text: err instanceof Error ? err.message : "Error saving changes",
        type: "error",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadBackup = () => {
    if (!data) return
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pyr0ken-portfolio-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Projects helpers
  const moveProject = (index: number, direction: "up" | "down") => {
    if (!data) return
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= data.projects.length) return

    const newProjects = [...data.projects]
    const [moved] = newProjects.splice(index, 1)
    newProjects.splice(targetIndex, 0, moved)

    setData({ ...data, projects: newProjects })
  }

  const deleteProject = (id: string) => {
    if (!data) return
    if (!confirm("Are you sure you want to delete this project?")) return
    setData({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    })
  }

  const addProject = () => {
    if (!data) return
    const newProj: ProjectItem = {
      id: `project-${Date.now()}`,
      title: "New Project",
      period: { start: new Date().getFullYear().toString() },
      link: "https://github.com/pyr0ken",
      skills: ["Rust", "Python"],
      description: "- Engineered scalable microservice architecture.",
      isExpanded: false,
    }
    setData({
      ...data,
      projects: [newProj, ...data.projects],
    })
  }

  // Experience helpers
  const moveExperience = (index: number, direction: "up" | "down") => {
    if (!data) return
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= data.experiences.length) return

    const newExps = [...data.experiences]
    const [moved] = newExps.splice(index, 1)
    newExps.splice(targetIndex, 0, moved)

    setData({ ...data, experiences: newExps })
  }

  const deleteExperience = (id: string) => {
    if (!data) return
    if (!confirm("Delete this company experience?")) return
    setData({
      ...data,
      experiences: data.experiences.filter((e) => e.id !== id),
    })
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">
            Portfolio Manager
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Reorder items, update details, and publish updates live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-zinc-900/50 px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <DownloadIcon className="size-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-zinc-900/50 px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-red-400"
          >
            <LogOutIcon className="size-3.5" />
            <span>Logout</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2Icon className="size-3.5 animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <SaveIcon className="size-3.5" />
                <span>Publish & Deploy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg border p-3 font-mono text-xs ${
            message.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {message.type === "success" && (
            <CheckIcon className="size-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-line pb-px">
        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "projects"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FolderGit2Icon className="size-4" />
          <span>Projects ({data.projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experiences")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "experiences"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BriefcaseIcon className="size-4" />
          <span>Experience ({data.experiences.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "education"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <GraduationCapIcon className="size-4" />
          <span>Education & Honors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === "profile"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <UserIcon className="size-4" />
          <span>Profile & Bio</span>
        </button>
      </div>

      {/* Tab: PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Use ▲ / ▼ to reorder. The top project appears first on pyr0ken.ir.
            </p>
            <button
              type="button"
              onClick={addProject}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-zinc-900/60 px-3 py-1.5 font-mono text-xs transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <PlusIcon className="size-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="rounded-xl border border-line bg-card/40 p-4 transition-colors hover:border-line/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const next = [...data.projects]
                        next[idx].title = e.target.value
                        setData({ ...data, projects: next })
                      }}
                      className="rounded border border-line/60 bg-background/50 px-2.5 py-1 text-sm font-medium outline-none focus:border-foreground/40"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveProject(idx, "up")}
                      className="rounded p-1.5 text-muted-foreground hover:bg-zinc-800 hover:text-foreground disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUpIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === data.projects.length - 1}
                      onClick={() => moveProject(idx, "down")}
                      className="rounded p-1.5 text-muted-foreground hover:bg-zinc-800 hover:text-foreground disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDownIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProject(proj.id)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-red-950/40 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Link URL
                    </label>
                    <input
                      type="text"
                      value={proj.link}
                      onChange={(e) => {
                        const next = [...data.projects]
                        next[idx].link = e.target.value
                        setData({ ...data, projects: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 font-mono text-xs outline-none focus:border-foreground/40"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Period (e.g. 2025 or 2024 - 2025)
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Start"
                        value={proj.period.start}
                        onChange={(e) => {
                          const next = [...data.projects]
                          next[idx].period.start = e.target.value
                          setData({ ...data, projects: next })
                        }}
                        className="w-1/2 rounded border border-line/60 bg-background/50 px-2.5 py-1 font-mono text-xs outline-none focus:border-foreground/40"
                      />
                      <input
                        type="text"
                        placeholder="End (optional)"
                        value={proj.period.end || ""}
                        onChange={(e) => {
                          const next = [...data.projects]
                          next[idx].period.end = e.target.value || undefined
                          setData({ ...data, projects: next })
                        }}
                        className="w-1/2 rounded border border-line/60 bg-background/50 px-2.5 py-1 font-mono text-xs outline-none focus:border-foreground/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="font-mono text-[10px] text-muted-foreground uppercase">
                    Skills / Tech Chips (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={proj.skills.join(", ")}
                    onChange={(e) => {
                      const next = [...data.projects]
                      next[idx].skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                      setData({ ...data, projects: next })
                    }}
                    className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 font-mono text-xs outline-none focus:border-foreground/40"
                  />
                </div>

                <div className="mt-3">
                  <label className="font-mono text-[10px] text-muted-foreground uppercase">
                    Description & Bullet Points (Markdown supported)
                  </label>
                  <textarea
                    rows={3}
                    value={proj.description}
                    onChange={(e) => {
                      const next = [...data.projects]
                      next[idx].description = e.target.value
                      setData({ ...data, projects: next })
                    }}
                    className="mt-1 w-full rounded border border-line/60 bg-background/50 p-2.5 font-mono text-xs/relaxed outline-none focus:border-foreground/40"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: EXPERIENCES */}
      {activeTab === "experiences" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Manage work history and ordering.
          </p>

          <div className="space-y-3">
            {data.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="rounded-xl border border-line bg-card/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={exp.companyName}
                      onChange={(e) => {
                        const next = [...data.experiences]
                        next[idx].companyName = e.target.value
                        setData({ ...data, experiences: next })
                      }}
                      className="rounded border border-line/60 bg-background/50 px-2.5 py-1 text-sm font-medium outline-none focus:border-foreground/40"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveExperience(idx, "up")}
                      className="rounded p-1.5 text-muted-foreground hover:bg-zinc-800 hover:text-foreground disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUpIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === data.experiences.length - 1}
                      onClick={() => moveExperience(idx, "down")}
                      className="rounded p-1.5 text-muted-foreground hover:bg-zinc-800 hover:text-foreground disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDownIcon className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteExperience(exp.id)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-red-950/40 hover:text-red-400"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={exp.companyWebsite}
                      onChange={(e) => {
                        const next = [...data.experiences]
                        next[idx].companyWebsite = e.target.value
                        setData({ ...data, experiences: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 font-mono text-xs outline-none focus:border-foreground/40"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => {
                        const next = [...data.experiences]
                        next[idx].location = e.target.value
                        setData({ ...data, experiences: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none focus:border-foreground/40"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Model (Hybrid / Remote / On-site)
                    </label>
                    <input
                      type="text"
                      value={exp.locationType}
                      onChange={(e) => {
                        const next = [...data.experiences]
                        next[idx].locationType = e.target.value
                        setData({ ...data, experiences: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none focus:border-foreground/40"
                    />
                  </div>
                </div>

                {/* Primary Position */}
                {exp.positions.map((pos, pIdx) => (
                  <div
                    key={pos.id}
                    className="mt-3 border-t border-line/60 pt-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={pos.title}
                          onChange={(e) => {
                            const next = [...data.experiences]
                            next[idx].positions[pIdx].title = e.target.value
                            setData({ ...data, experiences: next })
                          }}
                          className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none focus:border-foreground/40"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase">
                          Type (Part-time / Freelance / Full-time)
                        </label>
                        <input
                          type="text"
                          value={pos.employmentType}
                          onChange={(e) => {
                            const next = [...data.experiences]
                            next[idx].positions[pIdx].employmentType =
                              e.target.value
                            setData({ ...data, experiences: next })
                          }}
                          className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none focus:border-foreground/40"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase">
                          Period (e.g. 09.2025 to 09.2026)
                        </label>
                        <div className="mt-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Start"
                            value={pos.employmentPeriod.start}
                            onChange={(e) => {
                              const next = [...data.experiences]
                              next[idx].positions[pIdx].employmentPeriod.start =
                                e.target.value
                              setData({ ...data, experiences: next })
                            }}
                            className="w-1/2 rounded border border-line/60 bg-background/50 px-2 py-1 font-mono text-xs outline-none"
                          />
                          <input
                            type="text"
                            placeholder="End (optional)"
                            value={pos.employmentPeriod.end || ""}
                            onChange={(e) => {
                              const next = [...data.experiences]
                              next[idx].positions[pIdx].employmentPeriod.end =
                                e.target.value || undefined
                              setData({ ...data, experiences: next })
                            }}
                            className="w-1/2 rounded border border-line/60 bg-background/50 px-2 py-1 font-mono text-xs outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="font-mono text-[10px] text-muted-foreground uppercase">
                        Engineering Achievements (Markdown bullets)
                      </label>
                      <textarea
                        rows={4}
                        value={pos.description}
                        onChange={(e) => {
                          const next = [...data.experiences]
                          next[idx].positions[pIdx].description = e.target.value
                          setData({ ...data, experiences: next })
                        }}
                        className="mt-1 w-full rounded border border-line/60 bg-background/50 p-2.5 font-mono text-xs/relaxed outline-none focus:border-foreground/40"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: EDUCATION & HONORS */}
      {activeTab === "education" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-muted-foreground uppercase">
              Education Entries
            </h3>
            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="rounded-xl border border-line bg-card/40 p-4"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Institution / University
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const next = [...data.education]
                        next[idx].school = e.target.value
                        setData({ ...data, education: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Degree / Major
                    </label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => {
                        const next = [...data.education]
                        next[idx].fieldOfStudy = e.target.value
                        setData({ ...data, education: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="font-mono text-[10px] text-muted-foreground uppercase">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={edu.description}
                    onChange={(e) => {
                      const next = [...data.education]
                      next[idx].description = e.target.value
                      setData({ ...data, education: next })
                    }}
                    className="mt-1 w-full rounded border border-line/60 bg-background/50 p-2 font-mono text-xs outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-line pt-4">
            <h3 className="font-mono text-xs text-muted-foreground uppercase">
              Honors & Accolades
            </h3>
            {data.awards.map((award, idx) => (
              <div
                key={award.id}
                className="rounded-xl border border-line bg-card/40 p-4"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Award Title
                    </label>
                    <input
                      type="text"
                      value={award.title}
                      onChange={(e) => {
                        const next = [...data.awards]
                        next[idx].title = e.target.value
                        setData({ ...data, awards: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Prize / Medal
                    </label>
                    <input
                      type="text"
                      value={award.prize}
                      onChange={(e) => {
                        const next = [...data.awards]
                        next[idx].prize = e.target.value
                        setData({ ...data, awards: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-muted-foreground uppercase">
                      Year
                    </label>
                    <input
                      type="text"
                      value={award.date}
                      onChange={(e) => {
                        const next = [...data.awards]
                        next[idx].date = e.target.value
                        setData({ ...data, awards: next })
                      }}
                      className="mt-1 w-full rounded border border-line/60 bg-background/50 px-2.5 py-1 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: PROFILE & BIO */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <div className="space-y-4 rounded-xl border border-line bg-card/40 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase">
                  Display Name
                </label>
                <input
                  type="text"
                  value={data.user.displayName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      user: { ...data.user, displayName: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded border border-line/60 bg-background/50 px-3 py-1.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase">
                  Primary Title
                </label>
                <input
                  type="text"
                  value={data.user.jobTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      user: { ...data.user, jobTitle: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded border border-line/60 bg-background/50 px-3 py-1.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted-foreground uppercase">
                Bio / Tagline
              </label>
              <textarea
                rows={2}
                value={data.user.bio}
                onChange={(e) =>
                  setData({
                    ...data,
                    user: { ...data.user, bio: e.target.value },
                  })
                }
                className="mt-1 w-full rounded border border-line/60 bg-background/50 p-2.5 text-xs outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted-foreground uppercase">
                Header Flip Sentences (comma-separated)
              </label>
              <input
                type="text"
                value={data.user.flipSentences.join(" | ")}
                onChange={(e) =>
                  setData({
                    ...data,
                    user: {
                      ...data.user,
                      flipSentences: e.target.value
                        .split("|")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    },
                  })
                }
                className="mt-1 w-full rounded border border-line/60 bg-background/50 px-3 py-1.5 font-mono text-xs outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted-foreground uppercase">
                About Section (Markdown)
              </label>
              <textarea
                rows={5}
                value={data.user.about}
                onChange={(e) =>
                  setData({
                    ...data,
                    user: { ...data.user, about: e.target.value },
                  })
                }
                className="mt-1 w-full rounded border border-line/60 bg-background/50 p-2.5 font-mono text-xs/relaxed outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
