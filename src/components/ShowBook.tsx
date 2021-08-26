import { IBookList } from "../Types";

function ShowBook(props: IBookList): JSX.Element {
    return(
        <div>
            <h1>
                {props.name}
            </h1>
            <h3>
                {props.author}
            </h3>
            <h5>
                {props.genre}
            </h5>
        </div>
    )
};

export default ShowBook;



