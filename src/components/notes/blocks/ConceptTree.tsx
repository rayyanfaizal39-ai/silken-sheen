import type { ConceptTreeBlock, ConceptTreeNode } from "@/content/form2/science/interactive-types";

/**
 * A shallow classification, drawn so the nesting is visible rather than merely
 * asserted in prose.
 *
 * Branches with sub-types show them indented under their own connector; the
 * chapter's flat card grid can then stop pretending that a sub-type and a
 * sibling branch are the same kind of thing.
 */
function Leaf({ node }: { node: ConceptTreeNode }) {
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-[0.7rem] before:h-px before:w-2.5 before:bg-border">
      <p className="text-[12.5px] font-semibold text-foreground">
        {node.icon && <span className="mr-1">{node.icon}</span>}
        {node.label}
      </p>
      {node.note && (
        <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{node.note}</p>
      )}
    </li>
  );
}

function Branch({ node }: { node: ConceptTreeNode }) {
  const hasChildren = !!node.children?.length;
  return (
    <li className="min-w-0">
      <div
        className={`rounded-xl border p-3 ${
          hasChildren ? "border-primary/40 bg-primary/5" : "border-border bg-card/55"
        }`}
      >
        <p className="text-[13px] font-bold text-foreground">
          {node.icon && <span className="mr-1">{node.icon}</span>}
          {node.label}
        </p>
        {node.note && (
          <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{node.note}</p>
        )}
        {hasChildren && (
          <ul className="mt-2.5 flex flex-col gap-2 border-l border-border pl-2">
            {node.children!.map((child) => (
              <Leaf key={child.id} node={child} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function ConceptTree({ block }: { block: ConceptTreeBlock }) {
  return (
    <div className="min-w-0">
      <div className="rounded-xl border border-primary/45 bg-gradient-to-br from-primary/12 to-accent/5 px-3.5 py-2.5">
        <p className="text-[13px] font-bold text-primary">
          {block.root.icon && <span className="mr-1">{block.root.icon}</span>}
          {block.root.label}
        </p>
        {block.root.note && (
          <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{block.root.note}</p>
        )}
      </div>
      {/* The stem down to the branch row, so the row reads as "these come from that". */}
      <div className="ml-4 h-3 w-px bg-border" aria-hidden="true" />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(block.root.children ?? []).map((branch) => (
          <Branch key={branch.id} node={branch} />
        ))}
      </ul>
    </div>
  );
}
