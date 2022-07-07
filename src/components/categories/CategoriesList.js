import Category from "./Category";
import classes from './Category.module.css';

function CategoriesList({ categories, current, changeCurrent, optionsVisible }) {

    return (
        <div className={classes.list}>
            {categories.map((category, index) =>
                <Category
                    index={index}
                    changeCurrent={changeCurrent}
                    key={category.name}
                    current={current}
                    category={category}
                    optionsVisible={optionsVisible} />)}
        </div>
    )
}

export default CategoriesList;