import { CopyrightIcon, Stamp01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { format } from "date-fns"
import { ArrowUpRightIcon, CircleCheckBigIcon, MedalIcon } from "lucide-react"

import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/ui/separator"
import { Tag } from "@/components/ui/tag"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/collapsible-animated"
import {
  AccentureIcon,
  AnimationsDevIcon,
  CourseraIcon,
  GoogleIcon,
  MetaIcon,
  MicrosoftIcon,
  VercelIcon,
} from "@/components/icons"
import { Markdown } from "@/components/markdown"
import type {
  AwardRecognition,
  CredentialRecognition,
  RecognitionEntry,
  RecognitionKind,
} from "@/features/portfolio/types/recognition"

const KIND_LABELS: Record<RecognitionKind, string> = {
  award: "Award",
  certificate: "Certificate",
  trademark: "Trademark",
  copyright: "Copyright",
}

// Closed map keyed by `issuerIconName`, so the bundle only keeps icons that can
// appear; unknown names fall back to a generic check badge.
const ISSUER_ICONS: Record<string, React.ReactNode> = {
  accenture: <AccentureIcon />,
  animationsdev: <AnimationsDevIcon />,
  copyright: <HugeiconsIcon icon={CopyrightIcon} />,
  coursera: <CourseraIcon />,
  google: <GoogleIcon />,
  meta: <MetaIcon />,
  microsoft: <MicrosoftIcon />,
  trademark: <HugeiconsIcon icon={Stamp01Icon} />,
  vercel: <VercelIcon />,
}

export function RecognitionItem({ entry }: { entry: RecognitionEntry }) {
  return entry.kind === "award" ? (
    <AwardRow entry={entry} />
  ) : (
    <CredentialRow entry={entry} />
  )
}

function AwardRow({ entry }: { entry: AwardRecognition }) {
  const { award, date } = entry
  const canExpand = !!award.description

  return (
    <Collapsible defaultOpen={award.isExpanded ?? true}>
      {/* If referenceLink is present, title links to it; chevron toggles collapsible */}
      <div className="relative flex items-center hover:bg-accent-muted">
        <IconTile className="mx-4">
          {award.icon ?? (
            <MedalIcon className="size-5 text-slate-300 dark:text-slate-200" />
          )}
        </IconTile>

        <div className="flex flex-1 items-center gap-2 border-l border-dashed border-line p-4">
          <div className="flex-1">
            <h3 className="mb-1 leading-snug font-medium text-balance">
              {award.referenceLink ? (
                <a
                  href={award.referenceLink}
                  target="_blank"
                  rel="noopener"
                  className="relative z-10 inline-flex items-center gap-1.5 transition-colors hover:text-foreground hover:underline"
                >
                  <span>{award.title}</span>
                  <ArrowUpRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
                </a>
              ) : canExpand ? (
                <CollapsibleTrigger className="text-left">
                  <span className="absolute inset-0" aria-hidden />
                  {award.title}
                </CollapsibleTrigger>
              ) : (
                award.title
              )}
            </h3>

            <dl className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <KindTerm kind="award" />

              <div className="flex items-center gap-1">
                <dt className="sr-only">Prize</dt>
                <MedalIcon
                  className="size-3.5 shrink-0 text-slate-400 dark:text-slate-300"
                  aria-hidden
                />
                <dd>{award.prize}</dd>
              </div>

              <MetaSeparator />

              <DateTerm label="Awarded in" date={date} />

              <MetaSeparator />

              <div>
                <dt className="sr-only">Received in Grade</dt>
                <dd>{award.grade}</dd>
              </div>
            </dl>
          </div>

          {award.referenceLink && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md border border-line bg-zinc-900/40 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
                    href={award.referenceLink}
                    target="_blank"
                    rel="noopener"
                    aria-label="Open award project page"
                  >
                    <ArrowUpRightIcon />
                  </a>
                }
              />
              <TooltipContent>
                <p>Open award project page</p>
              </TooltipContent>
            </Tooltip>
          )}

          {canExpand && (
            <CollapsibleTrigger
              className="relative z-10 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-zinc-800 hover:text-foreground [&_svg]:size-4"
              aria-label="Toggle details"
            >
              <CollapsibleChevronsUpDownIcon duration={0.15} />
            </CollapsibleTrigger>
          )}
        </div>
      </div>

      {canExpand && (
        <CollapsibleContent className="overflow-hidden">
          <div className="typeset typeset-description border-t border-line p-4">
            <Markdown>{award.description}</Markdown>
            {award.referenceLink && (
              <div className="mt-3">
                <a
                  href={award.referenceLink}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  <span>View official project page on kia-kahroba.ir</span>
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            )}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}

function CredentialRow({ entry }: { entry: CredentialRecognition }) {
  const { kind, credential, date } = entry

  return (
    <div className="relative flex items-center pr-4 hover:bg-accent-muted">
      <IconTile className="mx-4">
        {(credential.issuerIconName
          ? ISSUER_ICONS[credential.issuerIconName]
          : null) ?? <CircleCheckBigIcon />}
      </IconTile>

      <div className="flex-1 space-y-1 border-l border-dashed border-line p-4">
        <h3 className="leading-snug font-medium text-balance">
          <a href={credential.credentialURL} target="_blank" rel="noopener">
            <span className="absolute inset-0" aria-hidden />
            {credential.title}
          </a>
        </h3>

        <dl className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <KindTerm kind={kind} />

          <div>
            <dt className="sr-only">Issued by</dt>
            <dd>
              <span aria-hidden>@</span>
              <span className="ml-0.5">{credential.issuer}</span>
            </dd>
          </div>

          <MetaSeparator />

          <DateTerm label="Issued on" date={date} />
        </dl>
      </div>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </div>
  )
}

// On its own line on mobile, so the meta after it wraps less and separators
// don't dangle at line edges.
function KindTerm({ kind }: { kind: RecognitionKind }) {
  return (
    <div className="max-sm:mb-1 max-sm:basis-full">
      <dt className="sr-only">Type</dt>
      <dd>
        <Tag className="flex h-5 w-fit">{KIND_LABELS[kind]}</Tag>
      </dd>
    </div>
  )
}

// Month precision for every kind: awards carry no day, and one format keeps
// the merged, date-sorted list scannable.
function DateTerm({ label, date }: { label: string; date: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <time dateTime={date}>{format(new Date(date), "MM.yyyy")}</time>
      </dd>
    </div>
  )
}

function MetaSeparator() {
  return (
    <Separator
      className="data-vertical:h-4 data-vertical:self-center"
      orientation="vertical"
      aria-hidden
    />
  )
}
