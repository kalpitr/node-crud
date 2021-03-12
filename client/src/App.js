import product from '../src/components/Product/product.js'
import category from '../src/components/Category/category.js'
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
       <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
         
        </ul>
    <Route exact path="/" component={product} />
    <Route exact path="/category" component={category} />

    </Router>
    </div>
  );
}

export default App;
