import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'

export default function Profile(){
    const history = useHistory();
    if(!Cookies.get('token')){
        history.push("/");
    }

    return(
        <div>
            <Query
                query={gql` 
                {
                    getMe{
                        token
                    }
                }
                `}
            >
                    {({loading, error, data}) =>{
                        if(loading) return <p>loading...</p>

                        if(error){
                            console.log("error:", error)
                            return <p>Error...</p>
                        }
                        return <p>{data.getMe.token}</p>
                    }

                    }
            </Query>
        </div>
    )
}


