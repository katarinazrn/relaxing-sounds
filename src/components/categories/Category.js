import { useEffect, useRef } from 'react';
import classes from './Category.module.css';

function Category({ category, current, changeCurrent, optionsVisible, index }) {

    const categoryRef = useRef();

    useEffect(() => {
        if (index && categoryRef.current) {
            categoryRef.current.style.animationDelay = `${index / 10}s`;
        }
    }, [index])

    return (
        <div ref={categoryRef}
            onClick={() => changeCurrent(category)}
            className={`${classes.category} ${current.name == category.name ? classes.current : ''} ${optionsVisible ? classes.visible : classes.hidden}`}>
            <span className={classes.name}>{category.name}</span>
            <span className={`${classes.icon} material-icons`}>{category.icon}</span>
        </div>
    )
}

export default Category;