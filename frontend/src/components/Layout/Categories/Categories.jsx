import "./Categories.css"
import CategoryItem from "./CategoryItem"
function Categories(){
    return (
        <section className="categories">
        <div className="container">
          <div className="section-title">
            <h2>All Categories</h2>
            <p>Summer Collection New Morden Design</p>
          </div>
          <ul className="category-list">
            <CategoryItem src="img/categories/categories1.png" title="Smart Phone"/>
            <CategoryItem src="img/categories/categories2.png" title="Smart Watch"/>
            <CategoryItem src="img/categories/categories3.png" title="Smart Watch"/>
            <CategoryItem src="img/categories/categories4.png" title="Smart Watch"/>
            <CategoryItem src="img/categories/categories5.png" title="Smart Watch"/>
            <CategoryItem src="img/categories/categories6.png" title="Smart Watch"/>
          </ul>
        </div>
      </section>
    )
}

export default Categories