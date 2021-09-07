import {useState} from "react";

function InputBook(): JSX.Element {

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const onSubmitBook = async () => {
        //event.preventDefault();
        try {
            const body = {name, author, genre};
            console.log(body);

            const apiBaseURL = process.env.REACT_APP_API_BASE;
                
            const response = await fetch(apiBaseURL + "/books", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
            
        } catch (error) {
            console.log(error.message)
            
        }
    };
    
    return (
        <div className = "create">
            <h2>Add a New Book</h2>
            <form>
                <label>Book title:</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                
                <label>Book author:</label>
                <input 
                    type="text"
                    required
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />

                <label>Book genre:</label>
                <input 
                    type="text"
                    required
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                />

                <button
                    onClick={onSubmitBook}>
                    Add book
                </button>


            </form>
        </div>

    )
};


export default InputBook;