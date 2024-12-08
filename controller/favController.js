import User from "../models/user.js";


export const addBookToFav = async(req, res) => {
    try {
        const {bookid, id} = req.headers;
        //console.log(bookid, id)
        const userData = await User.findById(id);
        const isBooKPresent = userData.favourites.includes(bookid);
        if(isBooKPresent){
            return res.status(200).json({message : "Book is already in favourites"});
        }
        await User.findByIdAndUpdate(id, {$push : {favourites : bookid}});

        return res.status(200).json({message : "Book added in favourites"});
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({message : "Internal server error"});
    }
}

export const removeBookFromFav = async(req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBooKPresent = userData.favourites.includes(bookid);
        if(isBooKPresent){
            await User.findByIdAndUpdate(id, {$pull:{favourites : bookid}});
        }
       
        return res.status(200).json({message : "Book remove from favourites"});
    } catch (error) {
        return res.status(500)
            .json({message : "Internal server error"});
    }
}

export const getAllFavBook = async(req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favBooks = await userData.favourites;
        return res.status(200).json({
            status : "Success",
            data : favBooks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({message : "An error occured"});
    }
}
// export const getAllFavBook = async (req, res) => {
//     try {
//         const { id } = req.headers; // Assuming user ID is in headers
//         if (!id) {
//             return res.status(400).json({ message: "User ID is required" });
//         }

//         // Find user and populate favourites field
//         const userData = await User.findById(id).populate("favourites");
//         if (!userData) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Access populated favourites
//         const favBooks = userData.favourites;

//         // Return response
//         return res.status(200).json({
//             status: "Success",
//             data: favBooks,
//         });
//     } catch (error) {
//         console.error("Error in getAllFavBook:", error);
//         return res.status(500).json({ message: "An error occurred" });
//     }
// };
