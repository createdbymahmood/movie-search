import type {Metadata} from 'next'

interface ConstructMetadataParams {
    title?: string
    description?: string
    image?: string
    icons?: string
}

const defaultMetadata: Required<ConstructMetadataParams> = {
    title: 'Movie Search',
    description:
        'The TMDB API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.',
    image: 'https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
    icons: '/next.svg',
}

export const constructMetadata = ({
    title,
    description,
    image,
    icons,
}: ConstructMetadataParams = defaultMetadata): Metadata => {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{url: image!}],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image!],
            creator: '@madebymahmood',
        },
        icons,
    }
}
