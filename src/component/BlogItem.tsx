interface BlogItemProps {
    imgSrc?: string
    title?: string
    description?: string
}

const BlogItem: React.FC<BlogItemProps> = ({ imgSrc, title, description }) => {

    return (
        <div>
            <div className='rounded-md px-2 py-1 border border-amber-400 mr-4'>
                <img src={imgSrc} alt="" className="w-[25vmin] h-[20vmin] object-cover mx-auto"/>
                <h3 className="text-2xl">blog {title}</h3>
                <p className="text-xs">{description}</p>
            </div>
        </div>
    )
}

export default BlogItem
