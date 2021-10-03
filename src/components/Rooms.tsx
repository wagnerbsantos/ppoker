import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

const ROOM_LIST_QUERY = gql`
  query RoomList($filter: String) {
    roomList(filter: $filter) {
      id
      name
      password
      topics {
        id
        name
      }
    }
  }
`;
export const Rooms = () => {
  const data = useQuery(ROOM_LIST_QUERY);
  console.log(data);
  const roomList = data.data?.roomList;
  console.log(roomList);
  return (
    <>
      <h4>Lista de salas</h4>
      <b>id, nome, senha</b>
      {roomList &&
        roomList.map((room: any, index: number) => {
          return (
            <div>
              {room.id}, {room.name}, {room.password}
            </div>
          );
        })}
    </>
  );
};
