function Button({name,className,style,handelClick,type="button"}) {
    return ( <>
        <button type={type} onClick={handelClick} className={`btn ${className}`} style={{color:"var(--text-secondary-color)" , backgroundColor:"var(--secondary-color)", padding:"16px 48px",...style}}>{name}</button>
    </> );
}

export default Button;