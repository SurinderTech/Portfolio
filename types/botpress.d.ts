export { }

declare global {
    interface Window {
        botpressWebChat?: {
            init: (config: Record<string, unknown>) => void
            [key: string]: any
        }
    }
}