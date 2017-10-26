export interface Library {
    readonly title: string
    readonly slug: string
    readonly version?: string
    readonly website?: string
}

export type Check = () => Library | null