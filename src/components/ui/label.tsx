import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-[0.82rem] font-medium text-foreground/85", className)}
      {...props}
    />
  )
}

export { Label }
