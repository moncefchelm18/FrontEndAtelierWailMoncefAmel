import './CSS/page.css'
import {Link, Outlet} from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import Content from "../../components/Content";
const Researcher = (props) => {

    return(
        <div className="app-container">
            <VerticalMenu displayResearcherMenu={true} />
            <div className="main-container">
                <Header/>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
export default Researcher;