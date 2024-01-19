import "./CategoryItem.css"
const CategoryItem = (prob)=>{
    return (
        <li className="category-item">
              <a href="#">
                <img src={prob.src} alt="" className="category-image"/>
                <span className="category-title">{prob.title}</span>
              </a>
        </li>
    )
}

export default CategoryItem