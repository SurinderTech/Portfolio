export { }

declare global {
    interface Window {
        botpressWebChat?: {
            init: (config: any) => void
            sendEvent?: (event: any) => void
            sendPayload?: (payload: any) => void
            onEvent?: (callback: (event: any) => void) => void
            [key: string]: any
        }
    }
}