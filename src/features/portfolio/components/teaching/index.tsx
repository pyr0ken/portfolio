import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { TEACHING } from "@/features/portfolio/data/teaching"

import { TeachingItem } from "./teaching-item"

const ID = "teaching"

export function Teaching() {
  if (!TEACHING.length) return null

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Teaching & Mentorship</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      {TEACHING.map((item) => (
        <div
          key={item.id}
          id={`teaching-${item.id}`}
          className="screen-line-bottom scroll-mt-14 p-4"
        >
          <TeachingItem key={item.id} item={item} />
        </div>
      ))}
    </Panel>
  )
}
