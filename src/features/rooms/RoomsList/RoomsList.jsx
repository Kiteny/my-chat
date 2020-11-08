import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../../ui/Loader/Loader';

import { roomsActions, roomsSelectors } from '../_roomsSlice_';
import { userActions } from '../../user';

import './RoomList.scss';

const { fetchRooms } = roomsActions;
const { logout } = userActions;

const { selectRoomsEntities, selectRoomsStatus } = roomsSelectors;

const RoomsList = () => {
  const rooms = useSelector(selectRoomsEntities);
  const roomsStatus = useSelector(selectRoomsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderedRooms = Object.keys(rooms).map((key) => (
    <li key={key} className="room-list__list-item">
      <Link to={`/rooms/${key}`}>
        {rooms[key].name}
      </Link>
    </li>
  ));

  return (
    <div className="room-list app-border">
      <div className="room-list__top-bar">
        <button className="room-list__logout" type="button" onClick={handleLogout}>
          <i className="fa fa-sign-out" aria-hidden="true" />
        </button>
      </div>
      <h2 className="room-list__title">Комнаты</h2>
      <ul className="room-list__list">
        {roomsStatus === 'pending' && <div className="room-list__loader"><Loader /></div>}
        {renderedRooms}
      </ul>
    </div>
  );
};

export default RoomsList;
