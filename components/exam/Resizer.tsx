import { FiTerminal } from 'react-icons/fi'

interface ResizerProps {
  onResizeStart: () => void
}

export function Resizer({ onResizeStart }: ResizerProps) {
  return (
    <div
      className="w-2 bg-neutral-800 cursor-col-resize flex items-center justify-center"
      onMouseDown={onResizeStart}
    >
      <FiTerminal className="text-neutral-500" />
    </div>
  )
}