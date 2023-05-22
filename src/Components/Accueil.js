import React, {useContext, useEffect, useState} from "react";
import properties from "../properties";
import LoginContext from "../LoginContext";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import CsrfTokenContext from "../CsrfTokenContext";

export default function Accueil(){
    const loggedUser = useContext(LoginContext);
    const csrfToken = useContext(CsrfTokenContext);

    const [chatroomsOwned, setChatroomsOwned] = useState([]);
    const [chatroomsJoined, setChatroomsJoined] = useState([]);

    useEffect(() => {
        const getChatroomsOwned = async () => {
            try{
                const response = await fetch(properties.getChatroomOwnedApi,{
                    "credentials": "include",
                    "headers": {
                        "X-XSRF-TOKEN": csrfToken
                    }
                });
                const chatroomsOwned = await response.json();
                if(response.status === 401){
                    window.location.href = properties.LoginApi;
                }
                setChatroomsOwned(chatroomsOwned);
            }
            catch(error){
                console.log(error);
            }
        }
        const getChatroomsJoined = async () => {
            try{
                const response = await fetch(properties.getChatroomJoinedApi,{
                    "credentials": "include",
                    "headers": {
                        "X-XSRF-TOKEN": csrfToken
                    }
                });
                const chatroomsJoined = await response.json();
                if(response.status === 401){
                    window.location.href = properties.LoginApi;
                }
                setChatroomsJoined(chatroomsJoined);
            }
            catch(error){
                console.log(error);
            }
        }
        getChatroomsOwned();
        getChatroomsJoined();
    }, [csrfToken])


    return(
        <main>
            <h1>Welcome {loggedUser.firstName} !</h1>
            <section>
                <h2>Voici votre Chatrooms :</h2>
                <div>
                    Vous pouvez voir vos Chatrooms dans <Link to="/listeChatroom_Owned">Chatrooms Owned</Link> et faire les operations.
                </div>
                {chatroomsOwned.length > 0 ? (
                    <Table bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Chatroom Id</th>
                            <th>Titre</th>
                            <th>Description du Chatroom</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chatroomsOwned.map(
                            chatroom => (
                                <tr key={chatroom.id}>
                                    <td>{chatroom.id}</td>
                                    <td>{chatroom.titre}</td>
                                    <td>{chatroom.description}</td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </Table>
                    )
                    :(<div>Vous n'avez pas de chatrooms !</div>)
                }
            </section>
            <section>
                <h2>Voici les Chatrooms que vous avez rejoint :</h2>
                <div>
                    Vous pouvez voir les Chatrooms que vous avez rejoint dans <Link to="/listeChatroom_Joined">Chatrooms Joined</Link> et faire les operations.
                </div>
                {chatroomsJoined.length > 0 ? (
                <Table bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Chatroom Id</th>
                        <th>Titre</th>
                        <th>Description du Chatroom</th>
                    </tr>
                    </thead>
                    <tbody>
                    {chatroomsJoined.map(
                        chatroom => (
                            <tr key={chatroom.id}>
                                <td>{chatroom.id}</td>
                                <td>{chatroom.titre}</td>
                                <td>{chatroom.description}</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
                    )
                    :(<div>Vous n'avez rejoint aucun chatrooms !</div>)
                }
            </section>
        </main>
    );

}