
const PetSitter = require('./models/petSitter');
const Review = require('./models/Review');
const User = require('./models/User');
const City = require('./models/City');

async function seedDatabase() {
    try {
        const users = [
            {
                "name": "Daniela",
                "lastname": "Preciado",
                "cellphone": 6441551616,
                "email": "dani@gmail.com",
                "password": "123456"
            },
            {
                "name": "Pancho",
                "lastname": "Cota",
                "cellphone": 6441124124,
                "email": "pancho@gmail.com",
                "password": "123456"
            },

        ];

        const petSitters = [
            {
                "name": "Karina",
                "lastname": "Gomez",
                "cellphone": 51841981,
                "email": "karina@gmail.com",
                "photoURL": "https://www.rover.com/cf-image-cdn/remote/images/people/gmWrG67A/yvxicbvmuc/original?width=150&height=150&quality=70&fit=cover",
                "age": 30

            },
            {
                "name": "Miranda",
                "lastname": "Kerr",
                "cellphone": 518198181,
                "email": "miranda@gmail.com",
                "photoURL": "https://img1.wsimg.com/isteam/ip/cb19dd35-86c8-43c8-b81a-0dbc3e39415a/balto.JPG/:/cr=t:4.12%25,l:13.24%25,w:73.53%25,h:73.53%25",
                "age": 35

            },
            {
                "name": "Karla",
                "lastname": "Gonzalez",
                "cellphone": 51841982,
                "email": "karla@gmail.com",
                "photoURL": "https://www.rover.com/cf-image-cdn/remote/images/people/QkPWBjPA/vsmfdritzm/original?width=300&height=300&quality=70&fit=cover",
                "age": 30
            },
            {
                "name": "Pepe",
                "lastname": "Gonzalez",
                "cellphone": 51841982,
                "email": "pepe@gmail.com",
                "photoURL": "https://res.cloudinary.com/trustedhousesitters/image/upload/t_square_bigger,f_auto/v1/remote_media/media/photo/d7/48861a46cb4d65b8a8b5107ae2021a.jpg",
                "age": 30
            },

        ];

        const reviews = [
            {
                "rating": 5,
                "comments": "Excelente cuidadora, mis perros la adoran."
            },
            {
                "rating": 4,
                "comments": "Muy profesional y atenta, definitivamente la recomiendo.",
            },
            {
                "rating": 3,
                "comments": "Buen servicio en general, pero a veces tarda en responder.",
            },
            {
                "rating": 5,
                "comments": "Increíble atención a mis gatos, los cuidó como si fueran suyos.",
            },
            {
                "rating": 2,
                "comments": "No quedé satisfecho con el servicio, hubo problemas de comunicación.",
            },
            {
                "rating": 4,
                "comments": "Cuidó de mis mascotas durante mi ausencia, todo salió bien.",
            },
            {
                "rating": 5,
                "comments": "Muy cariñosa con mis perros, los dejé en buenas manos.",
            },
            {
                "rating": 3,
                "comments": "El servicio fue aceptable, pero esperaba más atención detallada.",
            },
            {
                "rating": 5,
                "comments": "Sin duda la mejor cuidadora que he encontrado, repetiré.",
            },
            {
                "rating": 4,
                "comments": "Buen trato hacia mis mascotas, la recomendaría a otros dueños.",
            },

        ];


        const usersCount = await User.countDocuments();
        const petSittersCount = await PetSitter.countDocuments();
        const reviewsCount = await Review.countDocuments();

        if (usersCount === 0 && petSittersCount === 0 && reviewsCount === 0) {
            const cities = await City.find();
            const petsittersWithCityIds = petSitters.map((petSitter, index) => ({
                ...petSitter,
                cityId: cities[index % cities.length]._id,
            }));

            const createdUsers = await User.insertMany(users);
            const createdPetSitters = await PetSitter.insertMany(petsittersWithCityIds);

            const reviewsWithIds = reviews.map((review, index) => ({
                ...review,
                petSitterId: createdPetSitters[index % createdPetSitters.length]._id,
            }));

            const createdReviews = await Review.insertMany(reviewsWithIds);
        }

    } catch (error) {
        console.error('Error de seeding:', error);
    }
}

module.exports = seedDatabase;