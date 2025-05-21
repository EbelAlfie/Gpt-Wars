export const SearchBar = (
    { className, query, onTextChanged }: { className?: string, query: string, onTextChanged: (t: string) => void }
) => {
    return <>
        <input 
            className={`m-5 p-2 rounded-l ${className}`}
            value={query}
            onChange={(element) => onTextChanged(element.target.value)}
            placeholder="Search"
        />
    </>
}