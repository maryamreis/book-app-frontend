import { IBookList } from "../App";

export default function filterBooks(
    bookList: IBookList[],
    searchTerm: string
): IBookList[] {
    
    return(
        bookList.filter(
            (book) =>
              book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.author?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
};




