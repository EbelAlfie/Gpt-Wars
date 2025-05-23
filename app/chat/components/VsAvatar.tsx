export const VsAvatar = ({src, className}: {src: string, className?: string}) => {
    return <>
        <img 
            className={`size-11/12 flex-grow ${className}`}
            src={src}
        />
    </>
}