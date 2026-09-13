interface Props {
  title: string
  children: React.ReactNode
}

// Was a click-to-expand accordion; simplified to a static section heading so
// every homepage section is visible without interaction.
export default function CollapsibleSection({ title, children }: Props) {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-200 py-5">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
