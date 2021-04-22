import { gql } from "@apollo/client";

const UPDATE_TRAINEE = gql`
    mutation($id: String!, $firstname: String, $lastname: String, $email: String, $image: String){
        updateTrainee(_id : $id, firstname: $firstname, lastname: $lastname, email: $email, image: $image){
            _id,
            firstname,
            lastname,
            email,
        }
    }
`

export { UPDATE_TRAINEE };