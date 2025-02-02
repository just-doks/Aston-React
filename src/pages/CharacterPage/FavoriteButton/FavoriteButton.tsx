import './FavoriteButton.css';

export function FavoriteButton({className, checked, onChange}: {
    className?: string
    checked: boolean, onChange: () => void
}) {
    return (
        <label className={'favorite-btn-label' + (className ? ` ${className}` : '')}>
            <input
                type="checkbox"
                autoComplete='off'
                checked={checked}
                onChange={onChange}
            />
            <span>{ checked ? 'Favorite' : 'Add to Favorites' }</span>
        </label>
    )
}