import { IBookList } from "../Types";

function ShowBook(props: IBookList): JSX.Element {
    return(
        <div className = "showBook">
            <h2>
                {props.name}
            </h2>
            <h4>
                {props.author}
            </h4>
            <h5>
                {props.genre}
            </h5>
        </div>
    )
};

export default ShowBook;



