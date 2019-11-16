import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications, MdDone } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
  Divider,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const res = await api.get('/notifications');

      const data = res.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: ptBR,
          }
        ),
      }));
      setNotifications(data);
    }

    loadNotifications();
  }, []);

  const hasUnread = useMemo(
    () =>
      Boolean(notifications.find(notification => notification.read === false)),
    [notifications]
  );

  const handleMarkAsRead = async id => {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20}></MdNotifications>
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <React.Fragment key={notification._id}>
              <Notification key={notification._id} unread={!notification.read}>
                <p>
                  {notification.content}
                  <time>{notification.timeDistance}</time>
                </p>
                {!notification.read && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    <MdDone size={20} color="#ff892e"></MdDone>
                  </button>
                )}
              </Notification>
              <Divider></Divider>
            </React.Fragment>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
