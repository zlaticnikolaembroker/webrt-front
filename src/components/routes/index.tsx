import React from 'react';
import { mount, redirect, route } from 'navi';

const routes = mount({
  '/': redirect('/home'),
  '/home': route({ view: <h1>Home</h1> }),
  '/join-meeting': route({ view: <h1>Join meeting</h1> }),
  '/create-meeting': route({ view: <h1>Create meeting</h1> }),
});

export default routes;