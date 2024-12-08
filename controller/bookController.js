import User from '../models/user.js';
import Book from '../models/book.js';


export const addBook = async(req,res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);

        if(user.role !== "admin"){
            return res.status(400)
                    .json({message : "You are dont have access to perform admin work"});
        }
        const newBook = new Book({
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            price : req.body.price,
            desc : req.body.desc,
            language : req.body.language,
        })
        await newBook.save();
        res.status(200).json({message : "Book added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500)

        .json({message : "Internal server error"});
    }
}

export const updateBook = async(req,res) => {
    try {
        const {bookId} = req.headers;
        await Book.findByIdAndUpdate(bookId, {
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            price : req.body.price,
            desc : req.body.desc,
            language : req.body.language,
        });

        return res.status(200).json({
            message : "Book updated successfully"
        })
    } catch (error) {
        res.status(500)
            .json({message : "Internal server error"});
    }
}

export const deleteBook = async(req,res) => {
    try {
        const { bookid } = req.headers;
        // console.log(req.headers);
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({
            message : "Book deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message : "Internal server error"});
    }
}

export const getAllBooks = async(req,res) => {
    try {
        const books = await Book.find();
        return res.json({
            status:"Success",
            data : books,
        });
    } catch (error) {
        return res.status(500)
            .json({message : "Internal server error"});
    }
}

export const getRecentBook = async(req,res) => {
    try {
        const books = await Book.find().sort({createdAt : -1}).limit(4);
        return res.json({
            status:"Success",
            data : books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({message : "Internal server error"});
    }
}

export const getBookById = async(req,res) => {
   try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
        status : "Success",
        data : book,
    });
   } catch (error) {
    console.log(error)
    return res.status(500)
        .json({message : "Internal server error"});
   }
}