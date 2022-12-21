import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const Show = (props) => {
    //local state
    const [person, setPerson] = useState(null)
    const [editForm, setEditForm] = useState("")

    //access information about the current url path for browser:
    const { id } = useParams()

    const navigate = useNavigate() //useNavigate is a hook. navigate is a function
    //define some local variables:
    const URL = `http://localhost:4000/people/${id}`

    const getPerson = async () => {
        try {
            const response = await fetch(URL) //by defailt, a fetch makes a GET request
            const result = await response.json()
            console.log(result)
            setPerson(result)
            
        } catch (err) {
            console.log(err)
        }
    }
    console.log(`Current person: ${JSON.stringify(person)}`)

    //make a fetch:
    useEffect(() => {
        getPerson()
    }, [])

    const removePerson = async (e) => {
        try {
            //configure our delete request
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedPerson = await response.json()
            console.log(deletedPerson)
            //make a fetch for a delete endpoint
            //await response / parse response
            //navigate() is going to change the current page the browser is at; we're doing client side redirect
            navigate("/") //this works like a redirect, sending the user back to home
        }catch(err){
            console.log(err)
            //stretch goal: populate error message on page when delete fails
                //populate some state for 3 seconds, then redirect to a 404 page
        }
    }

    const updatePerson = async (e) => {
        e.preventDefault()
        try {
            await fetch(URL, {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(editForm)
            })
            getPerson()
        }catch(err){
            console.log(err)
        }
    }
    const handleChange = event => {
        setEditForm({...editForm, [event.target.name]: event.target.value})
    }

    const loaded = () => {
        return (
        <>
        <section>
            <h2>Edit this Person</h2>
            <form onSubmit={updatePerson}>
                <input 
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    value={editForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input type="submit" value="Update Person" />
            </form>
        </section>

            <div className="person-card">
                <h1>{person.name}</h1>
                <div>
                    <p>Delete Person</p>
                <button onClick={removePerson}> X </button>
                </div>
                <img src={person.image} />
                <h3>{person.title || "No title given"} </h3>
            </div>
            <Link to="/">Back to Home</Link>
        </>
        )
    }

    const loading = () => {
        return <h1>
            Loading...
            <span>
                {" "}
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                />
            </span>
        </h1>
    }

    return (
        <section className="ShowContainer">
            {person ? loaded() : loading()}
        </section>
    )
}
export default Show