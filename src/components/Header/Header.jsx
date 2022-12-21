import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        <header style={{ height: "300px", overflow: 'hidden' }}>
            <nav className="nav">
                <Link to='/'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
                </Link>
            </nav>
            <img style={{ width: "100%" }} src="https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?b=1&k=20&m=1146473249&s=612x612&w=0&h=-q1guVCuei7X3BFKwWC2bLUOX8BeIaC04pG5s_xfn_c=" />
        </header>
    )
}
export default Header