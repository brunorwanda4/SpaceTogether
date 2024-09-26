interface User {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    gender: string | null;
    image: Image[];
    birth_date: Date | null;
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    snapchat: string | null;
    whatsapp: string | null;
    username: string | null;
    phone_number: string;
    created_at: string;  // Converted to ISO 8601 string
    updated_at: string;  // Converted to ISO 8601 string
}

interface ObjectId {
    $oid: string;
}

interface Image {
    src: string;
    created_at: string;  // Converted to ISO 8601 string
}

// Function to convert MongoDB-like timestamp to ISO 8601 format
function convertTimestampToISO(timestamp: { $date: { $numberLong: string } }): string {
    const date = new Date(parseInt(timestamp.$date.$numberLong));
    return date.toISOString();
}

// Example usage to convert the user's created_at and updated_at
function convertUserTimestamps(user: any): User {
    return {
        ...user,
        created_at: convertTimestampToISO(user.created_at),
        updated_at: convertTimestampToISO(user.updated_at),
        image: user.image.map((img: any) => ({
            ...img,
            created_at: convertTimestampToISO(img.created_at)
        }))
    };
}

// Example JSON user data
const userJson = {
    _id: { $oid: "66e3c8780a23473294497f64" },
    name: "Fabrice Papi",
    email: "fabricepapi98@gmail.com",
    password: "123456",
    gender: null,
    image: [
        {
            src: "1244567876325",
            created_at: {
                $date: {
                    $numberLong: "1726204851007"
                }
            }
        }
    ],
    birth_date: null,
    facebook: "Bruno Rwanda",
    twitter: null,
    instagram: null,
    linkedin: null,
    snapchat: null,
    whatsapp: null,
    username: null,
    phone_number: "0876555777",
    created_at: {
        $date: {
            $numberLong: "1726204024558"
        }
    },
    updated_at: {
        $date: {
            $numberLong: "1726387666949"
        }
    }
};

// Convert the timestamps in the user object
const updatedUser = convertUserTimestamps(userJson);
// console.log(updatedUser);


interface Image {
    src: string;
    created_at: string;
}

interface User {
    image: Image[] | string;  // The `image` can be either an array of `Image` or a string.
}

// Function to check if `image` is an array or a string
function isImageArray(image: Image[] | string): boolean {
    return Array.isArray(image);  // Returns true if `image` is an array, false if it's a string
}

// Example usage
const userWithArray: User = {
    image: [
        { src: "image1.jpg", created_at: "2024-09-13T05:07:04.558+00:00" },
        { src: "image2.jpg", created_at: "2024-09-14T05:07:04.558+00:00" }
    ]
};

const userWithString: User = {
    image: "default_image.jpg"
};

// Check if image is an array or string
console.log(isImageArray(userWithArray.image));  // Output: true
console.log(isImageArray(userWithString.image));  // Output: false

// Handle different types of `image`
function handleImage(image: Image[] | string): void {
    if (Array.isArray(image)) {
        console.log("Image is an array, last image src:", image[image.length - 1]?.src);
    } else if (typeof image === "string") {
        console.log("Image is a string:", image);
    }
}

// Example usage of handleImage
handleImage(userWithArray.image);  // Output: Image is an array, last image src: image2.jpg
handleImage(userWithString.image); // Output: Image is a string: default_image.jpg


interface ProfileImages {
    src: string;
    created_at: string;
}

// Example userResult type with `image` being either an array of ProfileImages or a string
interface UserResult {
    user?: {
        image?: ProfileImages[] | string;
    };
}

const profile_image = (userResult: UserResult) => {
    const image = userResult?.user?.image;

    if (Array.isArray(image)) {
        // If image is an array
        console.log("Image is an array, last image src:", image[image.length - 1]?.src);
    } else if (typeof image === "string") {
        // If image is a string
        console.log("Image is a string:", image);
    } else {
        // If image is neither an array nor a string (possibly undefined or null)
        console.log("Image is not available.");
    }
};

// Example usage:

// Case where image is an array
// const userWithArray: UserResult = {
//     user: {
//         image: [
//             { src: "image1.jpg", created_at: "2024-09-13T05:07:04.558+00:00" },
//             { src: "image2.jpg", created_at: "2024-09-14T05:07:04.558+00:00" }
//         ]
//     }
// };

// Case where image is a string
// const userWithString: UserResult = {
//     user: {
//         image: "default_image.jpg"
//     }
// };

// Case where image is missing
const userWithNoImage: UserResult = {
    user: {}
};

// profile_image(userWithArray);  // Output: "Image is an array, last image src: image2.jpg"
// profile_image(userWithString); // Output: "Image is a string: default_image.jpg"
profile_image(userWithNoImage); // Output: "Image is not available."

