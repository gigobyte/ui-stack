export interface Library {
    readonly title: string
    readonly slug: string
    readonly website: string
    readonly version?: string
}

export type Check = () => Library | undefined