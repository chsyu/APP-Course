import axios from "axios";

export const getBooksAPI = async () => {
   return await axios.get('http://example-data.draftbit.com/books?_limit=20');
}